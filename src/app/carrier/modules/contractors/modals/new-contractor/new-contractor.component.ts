import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contractor} from "../../../../../shared/interfaces";
import {NumberToSsnPipe} from "../../../../../shared/pipes/number-to-ssn.pipe";
import {NumberToEinPipe} from "../../../../../shared/pipes/number-to-ein.pipe";
import {ActivatedRoute} from "@angular/router";
import {ContractorsService} from "../../../../../shared/services/fetch/contractors.service";
import {SuccessErrorsService} from "../../../../../shared/services/success-errors.service";
import {UsaPhonePipe} from "../../../../../shared/pipes/usa-phone.pipe";

@Component({
  selector: 'app-new-contractor',
  templateUrl: './new-contractor.component.html',
  styleUrls: ['./new-contractor.component.scss']
})
export class NewContractorComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>()
  @Output() successCreatingContractor: EventEmitter<Contractor> = new EventEmitter<Contractor>()

  cid: string
  contractor: Contractor
  form: FormGroup

  isIndividualForm: boolean = false
  isBusinessForm: boolean = false

  constructor(
    private contractorsService:ContractorsService,
    private numberToSsnPipe: NumberToSsnPipe,
    private numberToEinPipe:NumberToEinPipe,
    private usaPhonePipe:UsaPhonePipe,
    private successErrorsService:SuccessErrorsService,
  ) {
  }

  showIndividualForm() {
    this.isBusinessForm = false
    this.isIndividualForm = true

    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      ssn_ein: new FormControl(null, [Validators.required, Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)]),
      phone: new FormControl(null, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)),
      email: new FormControl(null, Validators.email),
      address: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null, [Validators.minLength(2), Validators.maxLength(2)]),
      zip: new FormControl(null, [Validators.minLength(5), Validators.maxLength(5)])
    })
  }

  showBusinessForm() {
    this.isIndividualForm = false
    this.isBusinessForm = true

    this.form = new FormGroup({
      businessName: new FormControl(null, Validators.required),
      ssn_ein: new FormControl(null, [Validators.required, Validators.pattern(/^\d{2}-\d{7}$/)]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)),
      email: new FormControl(null, Validators.email),
      address: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null, [Validators.minLength(2), Validators.maxLength(2)]),
      zip: new FormControl(null, [Validators.minLength(5), Validators.maxLength(5)])
    })
  }

  valueToSSN () {
    this.form.get('ssn_ein')?.patchValue(this.numberToSsnPipe.transform(this.form.get('ssn_ein')!.value))
  }

  valueToEIN() {
    this.form.get('ssn_ein')?.patchValue(this.numberToEinPipe.transform(this.form.get('ssn_ein')!.value))
  }

  valueToPhone() {
    this.form.get('phone')?.patchValue(this.usaPhonePipe.transform(this.form.get('phone')!.value))
  }

  trimValue(formControlName: string) {
    if(this.form.get(formControlName)?.value) {
      this.form.get(formControlName)?.patchValue(this.form.get(formControlName)?.value.toString().trim())
    }
  }


  addContractor() {
    if(this.form.valid) {
      this.successErrorsService.processing(true)
      this.contractorsService.createContractor({cid:this.cid,...this.form.value}).subscribe({
        next: (result) => {
          this.successCreatingContractor.emit(result)
          this.form.reset()
          this.successErrorsService.processing(false)
          this.successErrorsService.setSuccess()
        },
        error: (error) => {
          this.successErrorsService.processing(false)
          this.successErrorsService.setError('Create Contractor', error)
        }
      })
    }
  }
}
