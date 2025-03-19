import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Equipment} from "../../interfaces";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  createEquipment(data:Equipment) {
    return this.http.post<Equipment>(`${environment.API_URL}/equipment`, data)
  }

  getContractorEquipment(ssn_ein:string) {
    return this.http.get<Equipment[]>(`${environment.API_URL}/equipment/contractor/${ssn_ein}`)
  }

  getSingleEquipment(vin:string) {
    return this.http.get<Equipment>(`${environment.API_URL}/equipment/${vin}`)
  }
}
