 import { Injectable } from '@angular/core';
import {InsurancePremiums, InsuranceRates} from "../../shared/interfaces";
 import {CurrencyToNumberPipe} from "../../shared/pipes/curency-to-number.pipe";

@Injectable({
  providedIn: 'root'
})
export class InsuranceRatesService {
  private insuranceRates: InsuranceRates = {
    basePackage: 0,
    pdRate: 0,
    teamDriverPremium: 0
  }
  private insurancePremiums: InsurancePremiums = {
    basePackage: 0,
    truckPremium: 0,
    trailerPremium: 0,
    teamDriverPremium: 0,
    weeklyTotal: 0
  }
  constructor() { }

  setRates(insuranceRates:InsuranceRates) {
    this.insuranceRates = insuranceRates
  }

  getRates():InsuranceRates {
    return this.insuranceRates
  }

  getPremiums(truckValue:number, trailerValue:number, teamDriver:boolean):InsurancePremiums {

    this.insurancePremiums.basePackage = this.getRates().basePackage ? this.getRates().basePackage : 0
    this.insurancePremiums.truckPremium = (truckValue/100 * this.getRates().pdRate) / 52
    this.insurancePremiums.trailerPremium = (trailerValue/100 * this.getRates().pdRate) / 52
    this.insurancePremiums.teamDriverPremium = teamDriver ?  this.getRates().teamDriverPremium : 0

    this.insurancePremiums.weeklyTotal = this.insurancePremiums.basePackage + this.insurancePremiums.truckPremium + this.insurancePremiums.trailerPremium + this.insurancePremiums.teamDriverPremium

    return this.insurancePremiums
  }
}
