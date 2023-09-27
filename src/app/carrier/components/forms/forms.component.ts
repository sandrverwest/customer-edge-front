import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Event} from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import {UserService} from "../../../authorization/services/user.service";
import {HttpClient} from "@angular/common/http";
import {Forms} from "../../../shared/interfaces";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import { PDFDocument } from 'pdf-lib'
import {InsuranceRatesService} from "../../services/insurance-rates.service";
import {CurrencyToNumberPipe} from "../../../shared/pipes/curency-to-number.pipe";
import {CarriersService} from "../../../shared/services/fetch/carriers.service";


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  carrierID: string
  form: FormGroup
  storageForm: Forms

  constructor(
    private currencyPipe: CurrencyPipe,
    private currencyToNumberPipe: CurrencyToNumberPipe,
    private carriersService:CarriersService,
    private insuranceRatesService:InsuranceRatesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.carrierID = params.id
    })

    if(localStorage.getItem('forms')) {
      this.storageForm = JSON.parse(localStorage.getItem('forms')!)
    } else {
      this.storageForm = {
        ownerName: null,

        additionalDriver: null,

        truck: {
          unit: null,
          vin: null,
          year: null,
          make: null,
          value: null,
          remove_pd: null,
          remove_ntl: null,
          remove_cl: null,
        },

        trailer: {
          unit: null,
          vin: null,
          year: null,
          make: null,
          value: null,
          remove_pd: null,
          remove_cl: null,
        }
      }
    }

    this.form = new FormGroup({
      ownerName: new FormControl(this.storageForm.ownerName),
      additionalDriver: new FormControl(this.storageForm.additionalDriver),

      truck: new FormGroup({
        unit: new FormControl(this.storageForm.truck.unit),
        vin: new FormControl(this.storageForm.truck.vin),
        year: new FormControl(this.storageForm.truck.year),
        make: new FormControl(this.storageForm.truck.make),

        value: new FormControl(this.storageForm.truck.value),

        remove_pd: new FormControl(this.storageForm.truck.remove_pd),
        remove_ntl: new FormControl(this.storageForm.truck.remove_ntl),
        remove_cl: new FormControl(this.storageForm.truck.remove_cl),
      }),

      trailer: new FormGroup({
        unit: new FormControl(this.storageForm.trailer.unit),
        vin: new FormControl(this.storageForm.trailer.vin),
        year: new FormControl(this.storageForm.trailer.year),
        make: new FormControl(this.storageForm.trailer.make),

        value: new FormControl(this.storageForm.trailer.value),

        remove_pd: new FormControl(this.storageForm.trailer.remove_pd),
        remove_cl: new FormControl(this.storageForm.trailer.remove_cl),
      })

    })

    this.form.valueChanges.subscribe( form => {
      localStorage.setItem('forms', JSON.stringify(this.form.value))
    })
  }

  clearField(vehicleType:string, fieldNames?:string[]){
    if(fieldNames) {
      fieldNames.forEach(field => {
        this.form.get(vehicleType+'.'+field)?.reset()
      })
    } else {
      this.form.get(vehicleType)?.reset()
    }
  }

  valueToCurrency(unitType:string) {
    this.form.get(unitType+'.value')?.patchValue(this.currencyPipe.transform(this.form.get(unitType+'.value')!.value, 'USD', 'symbol', '1.2-2'))
  }

  valueToNumber(unitType:string) {
    this.form.get(unitType+'.value')?.patchValue(this.currencyToNumberPipe.transform(this.form.get(unitType+'.value')!.value))
  }

  async generateForm(formName:string) {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currentDate = `${month}-${day}-${year}`

    //// getting form
    const formUrl = `${environment.API_URL}/docs/${formName}.pdf`
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(formPdfBytes)
    const form = pdfDoc.getForm()

    /// Accessing fields and filling the form
    const fields = form.getFields()
    fields.forEach(field => {
      const type = field.constructor.name
      const name = field.getName()

      if(type === 'PDFTextField') {
        if(name === 'truck.value' || name === 'trailer.value') {
          form.getTextField(name).setText(this.form.get(name)?.value ? this.form.get(name)!.value : '$0.00')
        } else {
          if(this.form.get(name)) {
            form.getTextField(name).setText(this.form.get(name)?.value ? this.form.get(name)!.value : '-')
          }
        }
      }
      if(type === 'PDFDropdown') {
        if(name === 'additionalDriver') {
          form.getDropdown(name).select(this.form.get(name)!.value)
        }
        if(name === 'truck.needs_pd') {
          form.getDropdown(name).select(this.form.get('truck.value')?.value ? 'Yes' : 'No')
        }
        if(name === 'trailer.needs_pd') {
          form.getDropdown(name).select(this.form.get('trailer.value')?.value ? 'Yes' : 'No')
        }

        // form.getDropdown(name).select(this.form.get(name)?.value ? 'Yes' : 'No')
      }
      // console.log(`${type}: ${name}`)
    })

    if(formName === 'activation' || formName === 'removal') {
      if(this.carriersService.getCarrierFormsData().photo) {

        // const pngUrl = 'http://localhost:3000/api/images/logo.png'
        const pngUrl = `${environment.API_URL}/carriers/image/${this.carrierID}`
        //http://localhost:3000/api/carriers/image/640a18666c9eb26242b60ecb
        const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
console.log('pngUrl', pngUrl, this.carrierID)
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const { width, height } = pngImage.size()

        const scaleValue = 50/height
        const pngDims = pngImage.scale(scaleValue)
        const page = pdfDoc.getPage(0)

        page.drawImage(pngImage, {
          x: 75,
          y: page.getHeight() - 100,
          width: pngDims.width,
          height: pngDims.height,
        })
      } else {
        form.getTextField('logo').setText(this.carriersService.getCarrierFormsData().name)
      }

      if(this.carriersService.getCarrierFormsData().name) {
        form.getTextField('companyName').setText(this.carriersService.getCarrierFormsData().name)
      }
      if(this.carriersService.getCarrierFormsData().address) {
        form.getTextField('addressLine1').setText(this.carriersService.getCarrierFormsData().address?.addressLine)
        form.getTextField('addressLine2').setText(`${this.carriersService.getCarrierFormsData().address?.city}, ${this.carriersService.getCarrierFormsData().address?.state} ${this.carriersService.getCarrierFormsData().address?.zip}`)
      }
    }

    //// Calculation Insurance Premiums for Appendix or Activation and Filling them
    if(formName === 'appendix' || formName === 'activation') {
      const additionalDriver = (this.form.get('additionalDriver')!.value === 'Yes')
      const insurancePremiums = this.insuranceRatesService.getPremiums(
        this.currencyToNumberPipe.transform(this.form.get('truck.value')!.value)!,
        this.currencyToNumberPipe.transform(this.form.get('trailer.value')!.value)!,
        additionalDriver
      )

      // Setting Premiums Fields
      form.getTextField('basePackage').setText(this.currencyPipe.transform(insurancePremiums.basePackage, 'USD', 'symbol', '1.2-2')!)
      form.getTextField('truckPremium').setText(this.currencyPipe.transform(insurancePremiums.truckPremium, 'USD', 'symbol', '1.2-2')!)
      form.getTextField('trailerPremium').setText(this.currencyPipe.transform(insurancePremiums.trailerPremium, 'USD', 'symbol', '1.2-2')!)
      form.getTextField('teamDriverPremium').setText(this.currencyPipe.transform(insurancePremiums.teamDriverPremium, 'USD', 'symbol', '1.2-2')!)
      form.getTextField('weeklyTotal').setText(this.currencyPipe.transform(insurancePremiums.weeklyTotal, 'USD', 'symbol', '1.2-2')!)
    }

    // Filling dropdowns
    if(!this.form.get('truck.unit')!.value && !this.form.get('truck.vin')!.value && !this.form.get('truck.year')!.value && !this.form.get('truck.make')!.value) {
      if(formName === 'appendix' || formName === 'activation') {
        form.getDropdown('truck.needs_pd').select('-')
        form.getTextField('truck.value').setText('-')
      }
      if(formName === 'removal') {
        form.getDropdown('truck.remove_pd').select('-')
        form.getDropdown('truck.remove_ntl').select('-')
        form.getDropdown('truck.remove_cl').select('-')
      }
    }
    if(!this.form.get('trailer.unit')!.value && !this.form.get('trailer.vin')!.value && !this.form.get('trailer.year')!.value && !this.form.get('trailer.make')!.value) {
      if(formName === 'appendix' || formName === 'activation') {
        form.getDropdown('trailer.needs_pd').select('-')
        form.getTextField('trailer.value').setText('-')
      }
      if(formName === 'removal') {
        form.getDropdown('trailer.remove_pd').select('-')
        form.getDropdown('trailer.remove_cl').select('-')
      }
    }

    form.flatten();
    const pdfBytes = await pdfDoc.save()

    try {
      const url = window.URL.createObjectURL(new Blob([pdfBytes], {type: "application/pdf"}))
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', `${formName}_${this.form.value.ownerName}_${currentDate}`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (e) {
      console.error('BlobToSaveAs error', e)
    }
  }

}

