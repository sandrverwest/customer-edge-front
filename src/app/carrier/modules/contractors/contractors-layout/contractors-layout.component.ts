import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Contractor} from "../../../../shared/interfaces";
import {ModalDirective} from "../../../../shared/directives/modal.directive";
import {NewContractorComponent} from "../modals/new-contractor/new-contractor.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {ContractorsService} from "../../../../shared/services/fetch/contractors.service";
import {SuccessErrorsService} from "../../../../shared/services/success-errors.service";
import {LoaderService} from "../../../../shared/services/loader.service";

@Component({
  selector: 'app-equipment',
  templateUrl: './contractors-layout.component.html',
  styleUrls: ['./contractors-layout.component.scss']
})
export class ContractorsLayoutComponent implements OnInit, OnDestroy{
  @ViewChild(ModalDirective, {static: false}) modalDirective: ModalDirective

  cid: string
  paramsSubscription$: Subscription | undefined

  contractors: Contractor[] = []
  //   [
  //   {
  //     cid: '123',
  //     businessName: 'Lol Paige LLC',
  //     firstName: 'Michael',
  //     lastName: 'Paige',
  //     ssn_ein: '84-4394200',
  //     phone: '(282)-123-4567',
  //     email: 'paige.lol@gmail.com',
  //     address: '8 Westwood Dr',
  //     city: 'York',
  //     state: 'SC',
  //     zip: '29745'
  //   },
  //   {
  //     cid: '13245',
  //     firstName: 'Antonio',
  //     lastName: 'Brown',
  //     ssn_ein: '987-65-4321',
  //     phone: '(374)-753-9514',
  //     email: 'anton1984@yahoo.com',
  //     address: '539 S Middlefork Rd',
  //     city: 'Garden Valley',
  //     state: 'ID',
  //     zip: '83622'
  //   },
  //   {
  //     cid: '852645',
  //     businessName: 'West Norris LLC',
  //     firstName: 'David',
  //     lastName: 'Norris',
  //     ssn_ein: '84-4394200',
  //     phone: '(735)-456-7531',
  //     email: 'davidn4ris@gmail.com',
  //     address: '224 W College St',
  //     city: 'Branson',
  //     state: 'MO',
  //     zip: '65616'
  //   }
  // ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private contractorsService:ContractorsService,
    private successErrorsService:SuccessErrorsService
  ) {
  }

  ngOnInit() {
    this.paramsSubscription$ = this.route.parent?.parent?.params.subscribe(params => {
      this.cid = params.id
    })
  }

  ngOnDestroy() {
    this.paramsSubscription$?.unsubscribe()
  }

  addContractor() {
    this.modalDirective.viewContainerRef.clear()
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'active-modal')

    const component = this.modalDirective.viewContainerRef.createComponent(NewContractorComponent)

    component.instance.cid = this.cid
    component.instance.successCreatingContractor.subscribe(result => {
      this.contractors.push(result)
    })
    component.instance.close.subscribe(()=> {
      this.modalDirective.viewContainerRef.clear()
      this.renderer.removeClass(body, 'active-modal')
    })
  }

}
