import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private _isResolving$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  isResolving$: Observable<boolean> = this._isResolving$.pipe(
    switchMap(isLoading => {
      if(!isLoading) {
        return of(false)
      }
      return of(true).pipe(delay(1000))
    })
  )

  showResolveLoader() {
    this._isResolving$.next(true)
  }

  hideResolveLoader() {
    this._isResolving$.next(false)
  }
}
