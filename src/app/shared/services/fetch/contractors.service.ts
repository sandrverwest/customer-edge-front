import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Carrier, Contractor} from "../../interfaces";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {LoaderService} from "../loader.service";
import {CarriersService} from "./carriers.service";
import {delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractorsService {

  constructor(private http: HttpClient) { }


  createContractor(data:Contractor) {
      return this.http.post<Contractor>(`${environment.API_URL}/contractors`, data)
  }

  getCarrierContractors(id:string, status:string) {
    return this.http.get<Contractor[]>(`${environment.API_URL}/contractors/carrier/${id}?status=${status}`)
  }

  getSingleContractor(id:string) {
    return this.http.get<Contractor>(`${environment.API_URL}/contractors/${id}`)
  }
}


export const contractorsHiringResolver: ResolveFn<Contractor[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    inject(LoaderService).showResolveLoader()
    return inject(ContractorsService).getCarrierContractors(route.parent?.parent?.parent?.params.id!, 'hiring')
  }

export const contractorsActiveResolver: ResolveFn<Contractor[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    inject(LoaderService).showResolveLoader()
    return inject(ContractorsService).getCarrierContractors(route.parent?.parent?.parent?.params.id!, 'active')
  }

export const contractorsLeavingResolver: ResolveFn<Contractor[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    inject(LoaderService).showResolveLoader()
    return inject(ContractorsService).getCarrierContractors(route.parent?.parent?.parent?.params.id!, 'leaving')
  }
