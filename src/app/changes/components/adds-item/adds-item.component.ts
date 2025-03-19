import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Adds, Carrier} from "../../../shared/interfaces";
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
  @Input() first: boolean
  @Input() carriersNameList: Carrier[]
  filteredCarrierNames: Carrier[]
  changesItem: FormGroup

  @ViewChild('leasedToFilter') leasedToFilter: ElementRef
  isDropdownVisible = false;
  companyList = ["Carolina Logistic Inc", "ABC Logistics", "XYZ Freight", "Global Transport"];

  showDropdown(event: Event) {
    event.stopPropagation();
    this.filteredCarrierNames = this.carriersNameList
    this.isDropdownVisible = true;
  }

  selectCompany(companyName: string ) {
    this.changesItem.get('leasedTo')?.setValue(companyName); // Update FormControl value
    this.isDropdownVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.leasedToFilter?.nativeElement.contains(event.target)) {
      this.isDropdownVisible = true;
    } else {
      this.isDropdownVisible = false
    }


    // this.isDropdownVisible = false;
    // console.log('clicked outside')
  }

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
      leasedTo: new FormControl(this.add.leasedTo),
      addressLine: new FormControl(this.add.addressLine),
      lossPayee: new FormControl(this.add.lossPayee),
      notes: new FormControl(this.add.notes),
      requestedBy: new FormControl(this.add.requestedBy)
    })

    this.changesItem.valueChanges.subscribe(changesItem => {

      // if(changesItem.value) {
      //   this.changesItem.patchValue({
      //     value: this.currencyPipe.transform(changesItem.value?.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.0-0')
      //   }, {emitEvent: false})
      // }
      console.log(changesItem.leasedTo)
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

  byValue($event:any) {
    const value = $event.target.value
    this.filteredCarrierNames = this.carriersNameList.filter((name) => name.name!.toLowerCase().indexOf(value.toLowerCase()) !== -1)
  }
}
