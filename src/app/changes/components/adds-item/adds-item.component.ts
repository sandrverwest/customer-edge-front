import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Adds} from "../../../shared/interfaces";
import {ChangesDataService} from "../../../shared/services/changesdata.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'adds-item',
  templateUrl: './adds-item.component.html',
  styleUrls: ['../changes-list/changes-list.component.css']
})
export class AddsItemComponent implements OnInit {
@Input() add: Adds
@Input() i: number
  changesItem: FormGroup

  constructor(private dataService: ChangesDataService, private elementRef: ElementRef, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {
    this.changesItem = new FormGroup({
      owner: new FormControl(this.add.name),
      unit: new FormControl(this.add.unit),
      vin: new FormControl(this.add.vin),
      year: new FormControl(this.add.year),
      make: new FormControl(this.add.make),
      value: new FormControl(this.currencyPipe.transform(this.add.value?.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.0-0'), {updateOn:"blur"}),

      addressLine1: new FormControl(this.add.addressLine1),
      addressLine2: new FormControl(this.add.addressLine2),
      lossPayee: new FormControl(this.add.lossPayee),
      notes: new FormControl(this.add.notes),
    })

    this.changesItem.valueChanges.subscribe(changesItem => {

      // if(changesItem.value) {
      //   this.changesItem.patchValue({
      //     value: this.currencyPipe.transform(changesItem.value?.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.0-0')
      //   }, {emitEvent: false})
      // }
      console.log(changesItem.value)
    })
  }

  copyTable(id:string) {
    console.log('copy')
    const source = document.getElementById(id);

    source!.addEventListener("copy", (event) => {
      console.log(event.target)
      const selection = document.getSelection();
      event.clipboardData!.setData("text/plain", selection!.toString().toUpperCase());
      event.preventDefault();
    });
  }
}
