import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SaverService {

  constructor() { }

  private _isSaving$ = new BehaviorSubject(false)

  isSaving$: Observable<boolean> = this._isSaving$.asObservable()

  show() {
    this._isSaving$.next(true)
  }

  hide() {
    this._isSaving$.next(false)
  }
}
