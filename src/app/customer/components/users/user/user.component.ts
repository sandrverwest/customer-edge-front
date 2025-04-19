import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {User} from "../../../../shared/interfaces";
import {FileUploaderService} from "../../../../shared/services/fetch/file-uploader.service";
import {environment} from "../../../../../environments/environment";
import {SaverService} from "../../../../shared/services/saver.service";
import {SuccessErrorsService} from "../../../../shared/services/success-errors.service";
import {LoaderService} from "../../../../shared/services/loader.service";
import {ModalDirective} from "../../../../shared/directives/modal.directive";
import {PhotoUploaderComponent} from "../../../../shared/components/photo-uploader/photo-uploader.component";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../users.component.scss']
})
export class UserComponent{
  @ViewChild(ModalDirective, {static: false}) modalDirective: ModalDirective
  @Input() user:User
  @Input() index: number
  @Input() last: boolean
  @Output() userDeletionEmitter:EventEmitter<number> = new EventEmitter<number>()
  imageKey:string = ''

  isEditMode:boolean = false
  isSecuringMode:boolean = false

  selectedFile: File | null = null

  constructor(
    private fileUploaderService: FileUploaderService,
    private saverService: SaverService,
    private errorsService: SuccessErrorsService,
    private renderer: Renderer2
    ) {
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateEmitter(data:User) {
    this.user = data
  }

  deletionEmitter(index:number) {
    this.userDeletionEmitter.emit(index)
  }

  showPhotoUploader() {
    this.modalDirective.viewContainerRef.clear()
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'active-modal')

    const component = this.modalDirective.viewContainerRef.createComponent(PhotoUploaderComponent)
    component.instance.data = this.user
    component.instance.entityType = 'users'
    component.instance.imageKeyEmitter.subscribe(imageKey => {
      this.imageKey = imageKey
    })
    component.instance.userEmitter.subscribe(user => {
      this.user = user
    })

    component.instance.close.subscribe(()=> {
      this.modalDirective.viewContainerRef.clear()
      this.renderer.removeClass(body, 'active-modal')
    })
  }

  protected readonly environment = environment;
}
