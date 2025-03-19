import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contractor, Equipment} from "../../../../../shared/interfaces";
import {EquipmentService} from "../../../../../shared/services/fetch/equipment.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit{
  @Input() contractor: Contractor
  @Output() close: EventEmitter<any> = new EventEmitter<any>()

  constructor(private equipmentService:EquipmentService) {
  }

  byUnitDESC: boolean = false
  byVinDESC: boolean = false
  byMakeDESC: boolean = false
  byYearDESC: boolean = false
  byStatusDESC: boolean = false
  byValueDESC: boolean = false
  form: FormGroup
  filter: FormGroup
  equipment: Equipment[] = []
  filteredEquipment: Equipment[] = []

  ngOnInit() {

    this.form = new FormGroup({
      equipmentType: new FormControl(null, Validators.required),
      ownershipType: new FormControl(null, Validators.required),
      unitNumber: new FormControl(null),
      vin: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      make: new FormControl(null, Validators.required),
      value: new FormControl(null)
    })

    this.filter = new FormGroup({
      status: new FormControl('all')
    })

    this.filter.valueChanges.subscribe(result => {
      if(result.status === 'all') {
        this.filteredEquipment = this.equipment
      } else {
        this.filteredEquipment = this.equipment.filter(item => item.status === result.status)
      }
    })


    this.equipmentService.getContractorEquipment(this.contractor.ssn_ein).subscribe({
      next: result => {
        this.filteredEquipment = this.equipment = result
      },
      error: error => {
        console.log(error)
      }
    })
  }

  sortByStatus () {
    this.byStatusDESC = !this.byStatusDESC
    if(this.byStatusDESC) {
      this.filteredEquipment = this.equipment.sort((a, b) => a.status.localeCompare(b.status))
    }

    if(!this.byStatusDESC) {
      this.filteredEquipment = this.equipment.sort((a, b) => b.status.localeCompare(a.status))
    }
  }

  sortByValue () {
    this.byValueDESC = !this.byValueDESC
    if(this.byValueDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => a.value - b.value)
    }

    if(!this.byValueDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => b.value - a.value)
    }
  }

  sortByYear () {
    this.byYearDESC = !this.byYearDESC
    if(this.byYearDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => a.year - b.year)
    }

    if(!this.byYearDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => b.year - a.year)
    }
  }

  sortByMake () {
    this.byMakeDESC = !this.byMakeDESC
    if(this.byMakeDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => a.make.localeCompare(b.make))
    }

    if(!this.byMakeDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => b.make.localeCompare(a.make))
    }
  }

  sortByUnit () {
    this.byUnitDESC = !this.byUnitDESC
    if(this.byUnitDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => a.unitNumber.localeCompare(b.unitNumber))
    }

    if(!this.byUnitDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => b.unitNumber.localeCompare(a.unitNumber))
    }
  }

  sortByVin () {
    this.byVinDESC = !this.byVinDESC
    if(this.byVinDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => a.vin.localeCompare(b.vin))
    }

    if(!this.byVinDESC) {
      this.filteredEquipment = this.filteredEquipment.sort((a, b) => b.vin.localeCompare(a.vin))
    }
  }

  addEquipment() {
    if(this.form.valid) {
      const data = {...this.form.value, ssn_ein: this.contractor.ssn_ein}
      this.equipmentService.createEquipment(data).subscribe({
        next: result => {
          this.equipment.push(result)
          this.form.reset()
        },
        error: error => {
          console.log(error)
        }
      })
    }
  }

  createForm(index: number) {
    console.log('form created', index)
  }

  formDestroy(index: number) {
    console.log('form destroyed', index)
  }

}
