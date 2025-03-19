import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../../../shared/services/loader.service";
import {Contractor} from "../../../../../shared/interfaces";
import {ModalDirective} from "../../../../../shared/directives/modal.directive";
import {EquipmentComponent} from "../../modals/equipment/equipment.component";

@Component({
  selector: 'app-hiring',
  templateUrl: './hiring-contractor.component.html',
  styleUrls: ['./hiring-contractor.component.scss']
})
export class HiringContractorComponent implements OnInit{
  @ViewChild(ModalDirective, {static: false}) modalDirective: ModalDirective

  contractors: Contractor[] = []

  constructor(
    private route: ActivatedRoute,
    private loaderService:LoaderService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      ({contractors}) => {
        this.contractors = contractors
        this.loaderService.hideResolveLoader()
      })
  }


  openEquipmentList(contractor:Contractor) {
    this.modalDirective.viewContainerRef.clear()
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'active-modal')

    const component = this.modalDirective.viewContainerRef.createComponent(EquipmentComponent)

    component.instance.contractor = contractor
    component.instance.close.subscribe(()=> {
      this.modalDirective.viewContainerRef.clear()
      this.renderer.removeClass(body, 'active-modal')
    })
  }
}
