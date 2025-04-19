import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {levelGuideline} from "../../../../../shared/interfaces";
import {LevelsService} from "../../../../../shared/services/fetch/levels.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LoaderService} from "../../../../../shared/services/loader.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['../levels.component.scss']
})
export class LevelComponent implements OnInit{
  levelForm: FormGroup
  level: levelGuideline

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private levelsService: LevelsService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      ({level}) => {
        this.level = level
        this.levelForm = new FormGroup({
          level: new FormControl(level.level, Validators.required),
          driverEligibility: new FormArray([]),
          unacceptableDrivingRecords: new FormArray([]),
          requiredQuote: new FormControl(level.requiredQuote, Validators.required),
          documentsForQuote: new FormArray([]),
          clearance: new FormControl(level.clearance, Validators.required)
        })
        this.loadDriverEligibility(level)
        this.loadDrivingRecords(level)
        this.loadDocuments(level)
        this.loaderService.hideResolveLoader()
      })
  }

  updateLevel() {
    this.levelsService.updateLevel(this.level._id, this.levelForm.value).subscribe({
      next: result => {
        console.log('result', result)
      },
      error: error => {
        console.log('error',error)
      }
    })
  }

  deleteLevel() {
    const confirmed = confirm(`Are you sure you want to delete Level ${this.level.level}?`)
    if(confirmed) {
      this.levelsService.deleteLevel(this.level._id).subscribe({
        next: result => {
          this.router.navigate(['/', 'admin', 'insurance', 'levels'])
          console.log(result)
        },
        error: error=> {
          console.log(error)
        }
      })
    }
  }

  ////////// Documents for Insurance Quote
  removeDocument(index: number) {
    this.documents.removeAt(index)
  }
  anotherDocument() {
    const control = new FormControl(null, Validators.required)
    this.documents.push(control)
  }
  private loadDocuments(level:levelGuideline) {
    level.documentsForQuote.forEach( drivingRecords => {
      const control = new FormControl(drivingRecords, Validators.required)
      this.documents.push(control)
    })
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
  private loadDrivingRecords(level:levelGuideline) {
    level.unacceptableDrivingRecords.forEach( drivingRecords => {
      const control = new FormControl(drivingRecords, Validators.required)
      this.drivingRecords.push(control)
    })
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
  private loadDriverEligibility(level:levelGuideline) {
    level.driverEligibility.forEach( driverEligibility => {
    const control = new FormControl(driverEligibility, Validators.required)
      this.driverEligibility.push(control)
    })
  }
  get driverEligibility():FormArray {
    return this.levelForm.get('driverEligibility') as FormArray;
  }
}
