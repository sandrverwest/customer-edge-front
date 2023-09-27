import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Carrier} from "../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CarrierSidebarService {

  private _isCarrierData$: BehaviorSubject<Carrier | null> = new BehaviorSubject<Carrier | null>(null)
  public isCarrierData$: Observable<Carrier | null> = this._isCarrierData$.asObservable()

  private _isMaximized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  public isMaximized: Observable<boolean> = this._isMaximized.asObservable()
  constructor() {
    this._isMaximized.next((localStorage.getItem('maximizeCarrierSidebar') === 'true'))
  }

  passCarrierData(carrier: Carrier) {
    this._isCarrierData$.next(carrier)
  }

  removeCarrierData() {
    this._isCarrierData$.next(null)
  }

  maximizeCarrierSidebar(isMaximize: boolean) {
    this._isMaximized.next(isMaximize)
    localStorage.setItem('maximizeCarrierSidebar', isMaximize.toString())
  }
}
