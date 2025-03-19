import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Carrier, Coverages, Producer} from "../../../../shared/interfaces";
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
  @Output() coverageEmitter:EventEmitter<Coverages> = new EventEmitter<Coverages>
  @Output() newCoverageSuccessEmitter:EventEmitter<string> = new EventEmitter<string>
  carrierID: string
  coverages: Coverages
  producers: Producer[] = []


  coveragesForm: FormGroup
  coverageOptions = [
    'General Liability/Auto Liability/Cargo',
    'General Liability/Auto Liability',
    'General Liability',
    'General Liability/Cargo',
    'Auto Liability/Cargo',
    'Auto Liability',
    'Cargo'
  ]

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
        if(this.coverages?.producerID) {
          this.onInitProducer(this.coverages.producerID)
        }
      },
      error: (error) => {
        this.successErrorsService.setError('Load Producers', error)
      }
    })

    this.route.parent?.params.subscribe((params:Params) => {
      this.carrierID = params.id
    })

    this.coveragesForm = new FormGroup({
      producerID: new FormControl(this.coverages?.producerID ? this.coverages.producerID : null, Validators.required),
      carrierID: new FormControl(this.carrierID, Validators.required),
      // coverageName: new FormControl(this.coverages?.coverageName ? this.coverages.coverageName : null, Validators.required),
      // insuranceCarrierName: new FormControl(this.coverages?.insuranceCarrierName ? this.coverages.insuranceCarrierName : null, Validators.required),
      // expiration: new FormControl(this.coverages?.expiration ? this.datePipe.transform(this.coverages.expiration, 'MM/dd/yyyy') : null, [Validators.required, Validators.pattern(/^((0?[1-9]|1[0-2])[\/.](0?[1-9]|[12]\d|3[01])[\/.](\d{2}|\d{4}))$/)]),
      coverageLines: new FormArray([]),
      notes: new FormControl(this.coverages?.notes ? this.coverages.notes : null),
      isPrimary: new FormControl(this.coverages?.isPrimary ? this.coverages.isPrimary : false),
      primaryPolicyType: new FormControl(this.coverages?.primaryPolicyType ? this.coverages.primaryPolicyType : null)
    })

    this.loadCoverageLines()

    this.coveragesForm.get('isPrimary')?.valueChanges.subscribe(isPrimary  => {
      const primaryPolicyTypeControl = this.coveragesForm.get('primaryPolicyType');

      if (isPrimary) {
        primaryPolicyTypeControl?.setValidators(Validators.required);
      } else {
        primaryPolicyTypeControl?.clearValidators();
        primaryPolicyTypeControl?.setValue(null); // Optionally reset value when unchecked
      }

      primaryPolicyTypeControl?.updateValueAndValidity();
    });
  }

  addCoverage() {
    if (this.coveragesForm.valid) {
      console.log(this.coveragesForm.value)
      this.successErrorsService.processing(true)
      this.coveragesService.addCoverage(this.coveragesForm.value).subscribe({
        next: (result) => {
          this.coveragesForm.reset()
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
    if (this.coveragesForm.valid) {
      this.successErrorsService.processing(true)
      this.coveragesService.updateSingleCoverage(this.coverages._id, this.coveragesForm.value).subscribe({
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


  get coverageLines():FormArray {
    return this.coveragesForm.get('coverageLines') as FormArray;
  }

  private loadCoverageLines() {
    if(this.coverages) {
      this.coverages.coverageLines.forEach( element => {
        const coverageLine = new FormGroup({
          coverageLineName: new FormControl(element.coverageLineName, Validators.required),
          coverageLineCarrier: new FormControl(element.coverageLineCarrier, [Validators.required]),
          coverageLinePolicyNumber: new FormControl(element.coverageLinePolicyNumber),
          coverageLineExpirationDate: new FormControl(element.coverageLineExpirationDate ? this.datePipe.transform(element.coverageLineExpirationDate, 'MM/dd/yyyy') : null, [Validators.required, Validators.pattern(/^((0?[1-9]|1[0-2])[\/.](0?[1-9]|[12]\d|3[01])[\/.](\d{2}|\d{4}))$/)]),
        });
        this.coverageLines.push(coverageLine)
      })
    }
  }
  anotherCoverageLine() {
    const coverage = new FormGroup({
      coverageLineName: new FormControl(null, Validators.required),
      coverageLineCarrier: new FormControl(null, [Validators.required]),
      coverageLinePolicyNumber: new FormControl(null),
      coverageLineExpirationDate: new FormControl(null, [Validators.required, Validators.pattern(/^((0?[1-9]|1[0-2])[\/.](0?[1-9]|[12]\d|3[01])[\/.](\d{2}|\d{4}))$/)])
    })
    this.coverageLines.push(coverage)
  }

  removeCoverageLine(agentIndex:number) {
    this.coverageLines.removeAt(agentIndex)
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
