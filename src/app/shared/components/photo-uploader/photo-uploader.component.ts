import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

import {environment} from "../../../../environments/environment";
import {SaverService} from "../../services/saver.service";
import {FileUploaderService} from "../../services/fetch/file-uploader.service";
import {SuccessErrorsService} from "../../services/success-errors.service";


@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent implements OnInit{
  @Output() close = new EventEmitter<void>()
  @Output() imageKeyEmitter:EventEmitter<string> = new EventEmitter<string>
  @Output() userEmitter:EventEmitter<any> = new EventEmitter<any>
  data:any
  entityType:string
  imageKey:string = Math.random().toString()

  isDragOver: boolean = false
  constructor(
    private saverService: SaverService,
    private fileUploaderService: FileUploaderService,
    private successErrorsService: SuccessErrorsService
  ) {
  }

  ngOnInit() {
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false

    const file: File | null | undefined = event.dataTransfer?.files[0]
    if (file) {
      this.processFiles(file)
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length === 1) {
      const file: File | null | undefined = inputElement.files[0]
      this.processFiles(file)
    }
  }

  private processFiles(file: File): void {
    this.fileUploaderService.entityImageUpload(this.data._id, file, this.entityType).subscribe({
      next: (result) => {
        this.data = result
        this.imageKey = Math.random().toString()
        this.imageKeyEmitter.emit(this.imageKey)
        this.userEmitter.emit(result)
        this.saverService.hide()
        this.successErrorsService.removeError()
        this.successErrorsService.setSuccess()
      },
      error: (error) => {
        this.successErrorsService.setError('Photo Upload', error)
        this.saverService.hide()
      }
    })
  }

  deletePhoto() {
    this.fileUploaderService.entityImageDelete(this.data._id, {photo: null}, this.entityType).subscribe({
      next: result => {
      this.data = result
      this.imageKey = Math.random().toString()
      this.imageKeyEmitter.emit(this.imageKey)
      this.userEmitter.emit(result)
      this.saverService.hide()
      this.successErrorsService.removeError()
      this.successErrorsService.setSuccess()
    },
      error: error => {
        this.successErrorsService.setError('Photo Upload', error)
        this.saverService.hide()
      }
    })
  }

  protected readonly environment = environment;
}
