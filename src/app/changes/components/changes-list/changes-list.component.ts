import { Component, OnInit } from '@angular/core';
import { CarriersService } from 'src/app/shared/services/fetch/carriers.service';
import {ChangesDataService} from 'src/app/shared/services/changesdata.service';
import {UserService} from "../../../authorization/services/user.service";
import {Adds, ChangesItem, Removals} from "../../../shared/interfaces";

@Component({
  selector: 'app-changes-list',
  templateUrl: './changes-list.component.html',
  styleUrls: ['./changes-list.component.css'],
})
export class ChangesListComponent implements OnInit {
  constructor(public user: UserService, public dataService: ChangesDataService) { }

  ngOnInit() {
  }

  anotherAddition() {
    const newAddsItem:Adds = {
      name: null,
      type: null,
      unit: null,
      vin: null,
      year: null,
      make: null,
      value: null,
      ntl: false,
      leasedTo: null,
      addressLine1: null,
      addressLine2: null,
      lossPayee: null,
      notes: null,
      requestedBy: 'Kerice Brendle',
    }
    this.dataService.adds.push(newAddsItem)
    console.log(newAddsItem)
  }

  anotherRemoval() {
    const newRemovalsItem:Removals = {
      name: '',
      type: '',
      unit: '',
      vin: '',
      year: '',
      make: '',
      pd: false,
      ntl: false,
      leasedTo: '',
      notes: '',
      requestedBy: 'Devin Jenkins'
    }
    this.dataService.removals.push(newRemovalsItem)
    console.log(this.dataService.removals)
  }



  copyAddsToClipboard(id:string) {
    const range = document.createRange();
    range.selectNode(document.getElementById(id)!);
    window.getSelection()!.removeAllRanges(); // clear current selection
    window.getSelection()!.addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection()!.removeAllRanges();// to deselect
  }

  copyItemToClipboard(id:string) {
    const range = document.createRange();
    range.selectNode(document.getElementById(id)!);
    window.getSelection()!.removeAllRanges(); // clear current selection
    window.getSelection()!.addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection()!.removeAllRanges();// to deselect
  }


  removeAddsItem(i:number) {
    if (this.dataService.adds[i].name && this.dataService.adds[i].vin) {
      let isRemove = confirm("Are you sure you want to remove " + this.dataService.adds[i].name + ' & VIN# ' + this.dataService.adds[i].vin + ' from the changes list?');
      if(isRemove) {
        this.dataService.adds.splice(i, 1);
        console.log(this.dataService.adds)
      }
    } else {
      this.dataService.adds.splice(i, 1);
      console.log(this.dataService.adds)
    }
  }
}
