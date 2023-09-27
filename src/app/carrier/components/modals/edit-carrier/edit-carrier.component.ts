import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Address, Carrier, InsuranceRates, levelGuideline, User} from "../../../../shared/interfaces";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {LevelsService} from "../../../../shared/services/fetch/levels.service";
import {environment} from "../../../../../environments/environment";
import {FileUploaderService} from "../../../../shared/services/fetch/file-uploader.service";
import {SaverService} from "../../../../shared/services/saver.service";
import {SuccessErrorsService} from "../../../../shared/services/success-errors.service";
import {CarriersService} from "../../../../shared/services/fetch/carriers.service";

@Component({
  selector: 'app-edit-carrier',
  templateUrl: './edit-carrier.component.html',
  styleUrls: ['./edit-carrier.component.scss']
})
export class EditCarrierComponent implements OnInit{
  @Output() close = new EventEmitter<void>()
  @Output() imageKeyEmitter:EventEmitter<string> = new EventEmitter<string>
  @Output() carrierEmitter:EventEmitter<Carrier> = new EventEmitter<Carrier>
  data: Carrier

  form: FormGroup
  divisionsArray: FormControl[] = []
  operationsArray: FormControl[] = []
  levels: levelGuideline[]

  isLoading: boolean = false
  isSuccess: boolean = false
  isError: boolean = false
  constructor(
    private saverService: SaverService,
    private levelsService: LevelsService,
    private fileUploaderService: FileUploaderService,
    public successErrorsService:SuccessErrorsService,
    private errorsService: SuccessErrorsService,
    private carrierService: CarriersService,
  ) {}
  ngOnInit() {
    this.levelsService.getAllLevels().subscribe({
      next: result => {
        this.levels = result
      },
      error: error => {
        console.log(error)
      }
    })

    if(this.data.divisions?.length) {
        this.divisionsArray = this.data.divisions.map(division => {
            return new FormControl(division)
        })
    }

    if(this.data.operations?.length) {
        this.operationsArray = this.data.operations.map(operation => {
            return new FormControl(operation)
        })
    }


    this.form = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      usdot: new FormControl(this.data.usdot, Validators.required),
      mc: new FormControl(this.data.mc, Validators.required),
      level: new FormControl(this.data.level),
      phone: new FormControl(this.data.phone),
      fax: new FormControl(this.data.fax),
      address: new FormGroup({
        addressLine: new FormControl(this.data.address?.addressLine),
        city: new FormControl(this.data.address?.city),
        state: new FormControl(this.data.address?.state),
        zip: new FormControl(this.data.address?.zip),
      }),
      insuranceRates: new FormGroup({
        basePackage: new FormControl(this.data.insuranceRates?.basePackage),
        pdRate: new FormControl(this.data.insuranceRates?.pdRate),
        teamDriverPremium: new FormControl(this.data.insuranceRates?.teamDriverPremium)
      }),
      divisions: new FormArray(this.divisionsArray),
      operations: new FormArray(this.operationsArray)
    })
  }


  saveCarrier() {
    if (this.form.valid) {
      this.successErrorsService.processing(true)
      this.carrierService.updateCarrier(this.data._id!, this.form.value).subscribe({
        next: (result) => {
          this.data = result
          this.carrierEmitter.emit(result)
          this.successErrorsService.processing(false)
          this.errorsService.setSuccess()

        },
        error: (error) => {
          this.successErrorsService.processing(false)
          this.successErrorsService.setError('Save Carrier', error)
        }
      })
    }
  }

  anotherDivision() {
    const division = new FormControl()
    this.divisions.push(division)
  }
  removeDivision(index:number) {
    this.divisions.removeAt(index)
  }
  get divisions():FormArray {
      return this.form.get('divisions') as FormArray;
  }

  anotherOperation() {
    const operation = new FormControl()
    this.operations.push(operation)
  }
  removeOperation(index:number) {
    this.operations.removeAt(index)
  }
  get operations():FormArray {
      return this.form.get('operations') as FormArray;
  }

  protected readonly environment = environment;
}
