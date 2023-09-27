import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ModalLevelComponent} from "../../../carrier/components/modals/level/modal-level.component";
import {ModalDirective} from "../../directives/modal.directive";
import {LevelsService} from "../../services/fetch/levels.service";
import {delay} from "rxjs";
import {LoaderService} from "../../services/loader.service";
import {Carrier} from "../../interfaces";
import {EditCarrierComponent} from "../../../carrier/components/modals/edit-carrier/edit-carrier.component";
import {environment} from "../../../../environments/environment";
import {PhotoUploaderComponent} from "../photo-uploader/photo-uploader.component";
import {CarrierSidebarService} from "../../../carrier/services/carrier-sidebar.service";


@Component({
  selector: 'carrier-sidebar',
  templateUrl: './carrier-sidebar.component.html',
  styleUrls: ['./carrier-sidebar.component.css']
})
export class CarrierSidebarComponent {
  @ViewChild(ModalDirective, {static: false}) modalDirective: ModalDirective
  @Input() carrier:Carrier

  imageKey: string

  constructor(
    private levelsService: LevelsService,
    private loaderService:LoaderService,
    private renderer: Renderer2,
    public carrierSidebarService:CarrierSidebarService
  ) { }


  showLevel() {
    this.loaderService.showResolveLoader()
    this.modalDirective.viewContainerRef.clear()
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'active-modal')

    this.levelsService.getLevel(this.carrier.level!).subscribe(level => {
      const component = this.modalDirective.viewContainerRef.createComponent(ModalLevelComponent)
      component.instance.data = level
      component.instance.close.subscribe(()=> {
        this.modalDirective.viewContainerRef.clear()
        this.renderer.removeClass(body, 'active-modal')
      })
      this.loaderService.hideResolveLoader()
    })
  }

  showPhotoUploader() {
    this.modalDirective.viewContainerRef.clear()
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'active-modal')

    const component = this.modalDirective.viewContainerRef.createComponent(PhotoUploaderComponent)
    component.instance.data = this.carrier
    component.instance.entityType = 'carriers'
    component.instance.imageKeyEmitter.subscribe(imageKey => {
      this.imageKey = imageKey
    })
    component.instance.userEmitter.subscribe(data => {
      this.carrier = data
    })

    component.instance.close.subscribe(()=> {
      this.modalDirective.viewContainerRef.clear()
      this.renderer.removeClass(body, 'active-modal')
    })
  }

  protected readonly environment = environment;
}
