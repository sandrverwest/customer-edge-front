import {Component, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {Coverage} from "../../../../../shared/interfaces";
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
  @Input() coverage: Coverage
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
    component.instance.coverage = this.coverage
    component.instance.coverageEmitter.subscribe(coverage => {
      this.coverage = coverage
    })
    component.instance.close.subscribe(()=> {
      this.modalDirective.viewContainerRef.clear()
      this.renderer.removeClass(body, 'active-modal')
    })
  }

  deleteCoverage() {
    let isConfirmed = window.confirm('Are you sure you would like to delete ' + this.coverage.coverageName + ' coverage?')

    if(isConfirmed) {
      this.coveragesService.deleteSingleCoverage(this.coverage._id).subscribe({
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
}
