import {Component, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {Coverage, Coverages} from "../../../../../shared/interfaces";
import {InsuranceAddEditComponent} from "../../../modals/insurance-add-edit/insurance-add-edit.component";
import {ModalDirective} from "../../../../../shared/directives/modal.directive";
import {CoveragesService} from "../../../../services/coverages.service";
import {SuccessErrorsService} from "../../../../../shared/services/success-errors.service";

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['../insurance.component.scss']
})
export class CoverageComponent {
  @ViewChild(ModalDirective, {static: false}) modalDirective: ModalDirective
  @Input() index: number
  @Input() coverages: Coverages
  @Input() isCollapsed:boolean
  @Output() coverageDeleteEmitter:EventEmitter<number> = new EventEmitter<number>

  constructor(
    private coveragesService: CoveragesService,
    public successErrorsService:SuccessErrorsService,
      private renderer: Renderer2
  ) {
  }

  editCoverage() {
    this.modalDirective.viewContainerRef.clear()
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'active-modal')

    const component = this.modalDirective.viewContainerRef.createComponent(InsuranceAddEditComponent)
    component.instance.coverages = this.coverages
    component.instance.coverageEmitter.subscribe(coverages => {
      this.coverages = coverages
    })
    component.instance.close.subscribe(()=> {
      this.modalDirective.viewContainerRef.clear()
      this.renderer.removeClass(body, 'active-modal')
    })
  }

  deleteCoverage() {
    let coveragesNames = this.coverages.coverageLines.map(cl => cl.coverageLineName).join('/');
    let isConfirmed = window.confirm('Are you sure you would like to delete ' + coveragesNames + ' coverage?')

    if(isConfirmed) {
      this.coveragesService.deleteSingleCoverage(this.coverages._id).subscribe({
        next: (result) => {
          this.coverageDeleteEmitter.emit(this.index)
          this.successErrorsService.processing(false)
          this.successErrorsService.setSuccess()
        },
        error: (error) => {
          this.successErrorsService.processing(false)
          this.successErrorsService.setError('Delete Coverage', error)
        }
      })
    }
  }

  getFormattedExpirationDates(coverageLines: Coverage[]): string {
    if (!coverageLines || coverageLines.length === 0) return '';

    // Extract and format the dates
    const formattedDates = coverageLines.map(cl =>
      new Date(cl.coverageLineExpirationDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    );

    // Check if all dates are the same
    const allSame = formattedDates.every(date => date === formattedDates[0]);

    return allSame ? formattedDates[0] : formattedDates.join(' ⋅ ');
  }
}
