import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {Carrier, Coverage, User} from "../../shared/interfaces";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoveragesService {

  constructor( private http: HttpClient) { }

  addCoverage(data:Coverage):Observable<Coverage> {
    return this.http.post<Coverage>(environment.API_URL+ '/coverages', data)
  }

  getCoverage(coverageID:string):Observable<Coverage>{
    return this.http.get<Coverage>(`${environment.API_URL}/coverages/${coverageID}`)
  }

  getCarrierCoverages(carrierID:string):Observable<Coverage[]>{
    return this.http.get<Coverage[]>(`${environment.API_URL}/coverages/carrier/${carrierID}`)
  }

  updateSingleCoverage(id:string, data:any):Observable<Coverage> {
    return this.http.patch<Coverage>(`${environment.API_URL}/coverages/${id}`, data)
  }

  deleteSingleCoverage(id:string) {
    return this.http.delete<Coverage>(`${environment.API_URL}/coverages/${id}`)
  }
}
