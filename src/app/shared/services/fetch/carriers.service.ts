import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {catchError, delay, Observable, of, tap, timeout} from 'rxjs';
import {ActivatedRouteSnapshot, provideRouter, Resolve, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {LoaderService} from "../loader.service";
import {Address, Carrier, CarrierFormsData, User} from "../../interfaces";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CarriersService {
  private carrierFormsData:CarrierFormsData = {
    name: ''
  }
  constructor( private http: HttpClient) { }

  getCarrier(id:string):Observable<Carrier>{
    return this.http.get<Carrier>(`${environment.API_URL}/carriers/${id}`)
  }

  getAllCarriers():Observable<Carrier[]>{
    return this.http.get<Carrier[]>(`${environment.API_URL}/carriers/`)
  }

  updateCarrier(id:string, data:any):Observable<Carrier> {
    return this.http.patch<Carrier>(`${environment.API_URL}/carriers/${id}`, data)
  }

  getCarriersMenu():Observable<Carrier[]>{
    let params = new HttpParams().set('name', '1')
    return this.http.get<Carrier[]>(`${environment.API_URL}/carriers/`, {params})
  }

  setCarrierFormsData(name: string, logo?: string, address?:Address) {
    this.carrierFormsData.name = name
    this.carrierFormsData.photo = logo
    this.carrierFormsData.address = address
  }

  getCarrierFormsData() {
    return this.carrierFormsData
  }

}

export const carrierResolver: ResolveFn<Carrier> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    inject(LoaderService).showResolveLoader()
    return inject(CarriersService).getCarrier(route.params.id!).pipe(
      // delay(3000)
    )
  }

export const carriersResolver: ResolveFn<Carrier[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    inject(LoaderService).showResolveLoader()
    return inject(CarriersService).getAllCarriers()
  }


