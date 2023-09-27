import { Injectable } from '@angular/core';
import {Adds, Removals} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ChangesDataService {

adds:Adds[] = [
    {
      name: 'John Doe',
      type: 'TRUCK',
      unit: '3568',
      vin: '3AKJHHDR9LSLG6099',
      year: '2018',
      make: 'FRHT',
      value: '168000',
      ntl: true,
      leasedTo: 'Carolina Logistic Inc',
      addressLine1: '1920 Mountain Street',
      addressLine2: 'Graham, TX 76480',
      lossPayee: 'Ukrainian Credit Union, PO BOX 58621, Huston, TX 47852',
      notes: 'Add to PD/NTL.',
      requestedBy: 'Devin Jenkins'
    },
    {
      name: 'Ivan Shykal',
      type: 'TRUCK',
      unit: '177',
      vin: '2C3CCAAG0EH363346',
      year: '2015',
      make: 'FRHT',
      value: null,
      ntl: true,
      leasedTo: 'Carolina Transportation Inc',
      addressLine1: '85 Creek Street',
      addressLine2: 'Candler, NC 87459',
      lossPayee: null,
      notes: 'Add to PD/NTL.',
      requestedBy: 'Christina Tryhub'
    },
    {
      name: 'David Stoughton',
      type: 'TRAILER',
      unit: '7758',
      vin:'5NPDH4AE6BH023266',
      year: '2019',
      make: 'TEXA',
      value: '14000',
      ntl: false,
      leasedTo: 'Superior Transportation Inc',
      addressLine1: '896 Aaron Ln',
      addressLine2: 'Bridgeport, WV 74589',
      lossPayee: null,
      notes: 'Add to PD',
      requestedBy: 'Christina Tryhub'
    }
  ]

removals: Removals[] = [
    {
      name: 'Christopher Daven',
      type: 'TRUCK',
      unit: '7482',
      vin: 'YV1LS55A3X1588402',
      year: '2010',
      make: 'VOLV',
      pd: true,
      ntl: true,
      leasedTo: 'Precise Transportation Inc',
      notes: 'Remove from ALL.',
      requestedBy: 'Devin Jenkins'
    },
    {
      name: 'Christopher Daven',
      type: 'TRAILER',
      unit: '7482',
      vin: 'WAUDFAFL6DN014563',
      year: '2012',
      make: 'UTIL',
      pd: true,
      ntl: false,
      leasedTo: 'Carolina Logistic Inc',
      notes: 'Remove from ALL.',
      requestedBy: 'Devin Jenkins'
    },
    {
      name: 'Boriss Johnson',
      type: 'TRUCK',
      unit: '4250',
      vin: '3G1JC1245WS848211',
      year: '2003',
      make: 'CHEV',
      pd: false,
      ntl: true,
      leasedTo: 'Carolina LogisticS Inc',
      notes: 'Remove from ALL.',
      requestedBy: 'Nate Holmes'
    },
    {
      name: 'Boriss Johnson',
      type: 'TRAILER',
      unit: '4250',
      vin: 'JTHBP5C21B5009664',
      year: '2011',
      make: 'GOOS',
      pd: true,
      ntl: false,
      leasedTo: 'Carolina LogisticS Inc',
      notes: 'Remove from ALL.',
      requestedBy: 'Nate Holmes'
    }
  ]

  constructor() { }


  isUpdating = false

  updateAddValue(index:number, keyName:string, value: string | number | boolean) {
    // if (this.adds[index][keyName] !== value) {
    //   this.isUpdating = true
    //   setTimeout(()=> {
    //     this.adds[index][keyName] = value
    //     console.log(this.adds)
    //     this.isUpdating = false
    //   },
    //     2000
    //   )
    // }
  }
}
