import {Component, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {CarriersService} from "../../../../shared/services/fetch/carriers.service";
import {ActivatedRoute, Params} from "@angular/router";
import {PhotoUploaderComponent} from "../../../../shared/components/photo-uploader/photo-uploader.component";
import {ModalDirective} from "../../../../shared/directives/modal.directive";
import {InsuranceAddEditComponent} from "../../modals/insurance-add-edit/insurance-add-edit.component";
import {Coverages, Producer} from "../../../../shared/interfaces";
import {CoveragesService} from "../../../services/coverages.service";
import {catchError, forkJoin, map, Observable, of, Subscription} from "rxjs";
import {ProducersService} from "../../../../shared/services/fetch/producers.service";

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit, OnDestroy{
  @ViewChild(ModalDirective, {static: false}) modalDirective: ModalDirective
  coverages:Coverages[] = []

  isCollapsed:boolean

  paramSubscription:Subscription | undefined

  constructor(
    private route: ActivatedRoute,
    public coveragesService: CoveragesService,
    private producersService:ProducersService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('isCollapsed')) {
      this.isCollapsed = (localStorage.getItem('isCollapsed') === 'true')
    } else {
      this.isCollapsed = false
    }

    this.paramSubscription = this.route.parent?.params.subscribe((carrierID:Params) => {
      this.fetchData(carrierID.id)
    })
  }

  ngOnDestroy() {
    this.paramSubscription?.unsubscribe()
  }

  addCoverages() {
    this.modalDirective.viewContainerRef.clear()
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'active-modal')

    const component = this.modalDirective.viewContainerRef.createComponent(InsuranceAddEditComponent)
    component.instance.newCoverageSuccessEmitter.subscribe(carrierID => {
      this.fetchData(carrierID)
    })
    component.instance.coverageEmitter.subscribe(data => {

    })

    component.instance.close.subscribe(()=> {
      this.modalDirective.viewContainerRef.clear()
      this.renderer.removeClass(body, 'active-modal')
    })
  }

  expandCoverages() {
    this.isCollapsed = !this.isCollapsed

    if(this.isCollapsed) {
      localStorage.setItem('isCollapsed', 'true')
    }

    if(!this.isCollapsed) {
        localStorage.setItem('isCollapsed', 'false')
    }
  }

  private fetchData(carrierID:string) {
    const requests: Observable<any>[] = [
      this.producersService.getProducers(),
      this.coveragesService.getCarrierCoverages(carrierID),
    ]

    forkJoin(requests).pipe(
      map(([producers, coverages]) => {
        const mergedArrays = coverages.map((coverage:Coverages ) => {
          return {...producers.find((producer:Producer) => {
              return coverage.producerID === producer._id
            }), ...coverage}
        })
        return mergedArrays
      })
    ).subscribe({
      next: (result) => {
        this.coverages = result
      },
      error: error => {
        console.log('error', error)
      }
    })
  }

  deleteCoverage(index:number) {
    this.coverages.splice(index, 1)
  }
}
