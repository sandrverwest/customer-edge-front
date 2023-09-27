import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {ChangesDataService} from 'src/app/shared/services/changesdata.service';


@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() i: number
  @Input() keyName!: string
  @Input() cellData: string | number | boolean | null | undefined

  isEditMode = false
  isUpdating = false
  constructor(public dataService: ChangesDataService) {}

  ngOnInit(): void {
  }

  onBlur($event:any) {

    console.log(typeof Number($event.target.value), Number($event.target.value))
    console.log(isNaN($event.target.value))


    if(this.cellData === $event.target.value) {
      this.isEditMode = false
      return
    }

    if(this.cellData === null && $event.target.value === '') {
      this.isEditMode = false
      return
    }

    this.dataService.updateAddValue(this.i, this.keyName, $event.target.value)
    this.isEditMode = false
  }

  editMode() {
    this.isEditMode = true;
  }
}
