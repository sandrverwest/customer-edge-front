import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2, Type, ViewChild} from '@angular/core';
import {ActivatedRoute, IsActiveMatchOptions, Params, Router} from '@angular/router';
import { delay } from 'rxjs';
import {LoaderService} from "../../shared/services/loader.service";
import {Carrier} from "../../shared/interfaces";
import {InsuranceRatesService} from "../services/insurance-rates.service";
import {CarriersService} from "../../shared/services/fetch/carriers.service";
import {ModalDirective} from "../../shared/directives/modal.directive";
import {EditCarrierComponent} from "../components/modals/edit-carrier/edit-carrier.component";
import {CarrierSidebarService} from "../services/carrier-sidebar.service";

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier-layout.component.html',
  styleUrls: ['./carrier-layout.component.css']
})
export class CarrierLayoutComponent implements OnInit, OnDestroy {
  @ViewChild(ModalDirective, {static: false}) modalDirective: ModalDirective
  carrier:Carrier

  isMaximized: boolean

  constructor(
    private route: ActivatedRoute,
    public loaderService:LoaderService,
    private carriersService: CarriersService,
    private insuranceRatesService: InsuranceRatesService,
    private renderer: Renderer2,
    private carrierSidebarService: CarrierSidebarService
  ) {
  }

  ngOnInit(): void {
    this.isMaximized = (localStorage.getItem('maximizeCarrierSidebar') === 'true')

    this.route.data.subscribe(
      ({carrier}) => {
        this.carrier = carrier
        setTimeout(()=> {this.carrierSidebarService.passCarrierData(this.carrier)}, 0)
        if(carrier.insuranceRates) {this.insuranceRatesService.setRates(carrier.insuranceRates)}
        this.carriersService.setCarrierFormsData(carrier.name, carrier.photo, carrier.address)
        this.loaderService.hideResolveLoader()
      })
  }

  ngOnDestroy() {
    this.carrierSidebarService.removeCarrierData()
  }

  editCarrier() {
    this.loaderService.showResolveLoader()
    this.modalDirective.viewContainerRef.clear()
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'active-modal')

    const component = this.modalDirective.viewContainerRef.createComponent(EditCarrierComponent)
    component.instance.data = this.carrier
    component.instance.close.subscribe(()=> {
      this.modalDirective.viewContainerRef.clear()
      this.renderer.removeClass(body, 'active-modal')
    })
    component.instance.carrierEmitter.subscribe(result => {
      this.carrier = result
    })
    this.loaderService.hideResolveLoader()
  }

  minimizeCarrierSidebar() {
    this.isMaximized = !this.isMaximized

    this.carrierSidebarService.maximizeCarrierSidebar(this.isMaximized)
  }

}
