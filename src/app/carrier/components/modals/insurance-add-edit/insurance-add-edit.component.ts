import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Carrier, Coverage, Producer} from "../../../../shared/interfaces";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {SaverService} from "../../../../shared/services/saver.service";
import {LevelsService} from "../../../../shared/services/fetch/levels.service";
import {FileUploaderService} from "../../../../shared/services/fetch/file-uploader.service";
import {SuccessErrorsService} from "../../../../shared/services/success-errors.service";
import {CarriersService} from "../../../../shared/services/fetch/carriers.service";
import {ActivatedRoute, Params, Route} from "@angular/router";
import {CoveragesService} from "../../../services/coverages.service";
import {ProducersService} from "../../../../shared/services/fetch/producers.service";
import {BehaviorSubject, forkJoin, Observable, Subject} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-insurance-add-edit',
  templateUrl: './insurance-add-edit.component.html',
  styleUrls: ['./insurance-add-edit.component.scss']
})
export class InsuranceAddEditComponent implements OnInit{
  @Output() close = new EventEmitter<void>()
  @Output() coverageEmitter:EventEmitter<Coverage> = new EventEmitter<Coverage>
  @Output() newCoverageSuccessEmitter:EventEmitter<string> = new EventEmitter<string>
  carrierID: string
  coverage: Coverage
  producers: Producer[] = []


  form: FormGroup

  private _producer$: Subject<Producer | null> = new Subject<Producer | null>()
  producer$: Observable<Producer | null> = this._producer$.asObservable()
  constructor(
    private coveragesService: CoveragesService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public successErrorsService:SuccessErrorsService,
    private carrierService: CarriersService,
    private producersService:ProducersService
  ) {}

  ngOnInit() {
    this.producersService.getProducers().subscribe({
      next: (result) => {
        this.producers = result
        if(this.coverage?.producerID) {
          this.onInitProducer(this.coverage.producerID)
        }
      },
      error: (error) => {
        this.successErrorsService.setError('Load Producers', error)
      }
    })

    this.route.parent?.params.subscribe((params:Params) => {
      this.carrierID = params.id
    })

    this.form = new FormGroup({
      coverageName: new FormControl(this.coverage?.coverageName ? this.coverage.coverageName : null, Validators.required),
      producerID: new FormControl(this.coverage?.producerID ? this.coverage.producerID : null, Validators.required),
      carrierID: new FormControl(this.carrierID, Validators.required),
      notes: new FormControl(this.coverage?.notes ? this.coverage.notes : null),
      expiration: new FormControl(this.coverage?.expiration ? this.datePipe.transform(this.coverage.expiration, 'MM/dd/yyyy') : null, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/)])
    })
  }

  addCoverage() {
    if (this.form.valid) {
      this.successErrorsService.processing(true)
      this.coveragesService.addCoverage(this.form.value).subscribe({
        next: (result) => {
          this.form.reset()
          this.newCoverageSuccessEmitter.emit(this.carrierID)
          this.successErrorsService.processing(false)
          this.successErrorsService.setSuccess()
        },
        error: (error) => {
          this.successErrorsService.processing(false)
          this.successErrorsService.setError('Add Coverage', error)
        }
      })
    }
  }

  saveCoverage() {
    if (this.form.valid) {
      this.successErrorsService.processing(true)
      this.coveragesService.updateSingleCoverage(this.coverage._id, this.form.value).subscribe({
        next: (result) => {
          const coverage = {...result, ...this.producers.find((element:Producer) => element._id === result.producerID)}
          this.coverageEmitter.emit(coverage)
          this.successErrorsService.processing(false)
          this.successErrorsService.setSuccess()
        },
        error: (error) => {
          this.successErrorsService.processing(false)
          this.successErrorsService.setError('Save Coverage', error)
        }
      })
    }
  }


  loadProducer(event:Event) {
    const producerID:string = ((event.target as HTMLInputElement).value)
    if(producerID) {
      const producer = this.producers.find(element => element._id === producerID)
      this._producer$.next(producer ? producer : null)
    } else {
      this._producer$.next(null)
    }
  }

  onInitProducer(producerID:string) {
    if(producerID) {
      const producer = this.producers.find(element => element._id === producerID)
      this._producer$.next(producer ? producer : null)
    } else {
      this._producer$.next(null)
    }
  }

}
