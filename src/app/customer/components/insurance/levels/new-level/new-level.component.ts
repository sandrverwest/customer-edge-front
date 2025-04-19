import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {levelGuideline} from "../../../../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";
import {LevelsService} from "../../../../../shared/services/fetch/levels.service";
import {LoaderService} from "../../../../../shared/services/loader.service";

@Component({
  selector: 'app-new-level',
  templateUrl: './new-level.component.html',
  styleUrls: ['../levels.component.scss']
})
export class NewLevelComponent implements OnInit{
  levelForm: FormGroup
  level: levelGuideline

  @Output() newLevelEmitter: EventEmitter<levelGuideline> = new EventEmitter<levelGuideline>()

  constructor(
    private route: ActivatedRoute,
    private levelsService: LevelsService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.levelForm = new FormGroup({
      level: new FormControl(null, Validators.required),
      driverEligibility: new FormArray([]),
      unacceptableDrivingRecords: new FormArray([]),
      requiredQuote: new FormControl(null, Validators.required),
      documentsForQuote: new FormArray([]),
      clearance: new FormControl(null, Validators.required)
    })
  }



  newLevel() {
    this.levelsService.newLevel(this.levelForm.value).subscribe({
      next: result => {
        this.newLevelEmitter.emit(result)
        this.levelForm.reset()
        console.log('result', result)
      },
      error: error => {
        console.log('error',error)
      }
    })
  }

  ////////// Documents for Insurance Quote
  removeDocument(index: number) {
    this.documents.removeAt(index)
  }
  anotherDocument() {
    const control = new FormControl(null, Validators.required)
    this.documents.push(control)
  }
  get documents():FormArray {
    return this.levelForm.get('documentsForQuote') as FormArray;
  }

  ////////// Unacceptable Driving Records
  removeDrivingRecord(index: number) {
    this.drivingRecords.removeAt(index)
  }
  anotherDrivingRecord() {
    const control = new FormControl(null, Validators.required)
    this.drivingRecords.push(control)
  }
  get drivingRecords():FormArray {
    return this.levelForm.get('unacceptableDrivingRecords') as FormArray;
  }

  ////////// Driver Eligibility
  removeEligibility(index: number) {
    this.driverEligibility.removeAt(index)
  }
  anotherDriverEligibility() {
    const control = new FormControl(null, Validators.required)
    this.driverEligibility.push(control)
  }
  get driverEligibility():FormArray {
    return this.levelForm.get('driverEligibility') as FormArray;
  }
}
