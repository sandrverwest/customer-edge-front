import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Carrier, Contractor} from "../../../../shared/interfaces";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http: HttpClient) { }

  getAllEntities() {
    return this.http.get<Contractor[]>(`${environment.API_URL}/entities`)
  }

  getCarrierAllEntities(cid:string) {
    return this.http.get<Contractor[]>(`${environment.API_URL}/entities/${cid}`)
  }

  addEntity(cid:string, entity:Contractor) {
    return this.http.post<Contractor>(`${environment.API_URL}/entities/${cid}`, entity)
  }
}
