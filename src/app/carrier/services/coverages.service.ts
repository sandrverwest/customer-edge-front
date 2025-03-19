import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {Carrier, Coverages, User} from "../../shared/interfaces";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoveragesService {

  constructor( private http: HttpClient) { }

  addCoverage(data:Coverages):Observable<Coverages> {
    return this.http.post<Coverages>(environment.API_URL+ '/coverages', data)
  }

  getCoverage(coverageID:string):Observable<Coverages>{
    return this.http.get<Coverages>(`${environment.API_URL}/coverages/${coverageID}`)
  }

  getCarrierCoverages(carrierID:string):Observable<Coverages[]>{
    return this.http.get<Coverages[]>(`${environment.API_URL}/coverages/carrier/${carrierID}`)
  }

  updateSingleCoverage(id:string, data:any):Observable<Coverages> {
    return this.http.patch<Coverages>(`${environment.API_URL}/coverages/${id}`, data)
  }

  deleteSingleCoverage(id:string) {
    return this.http.delete<Coverages>(`${environment.API_URL}/coverages/${id}`)
  }
}
