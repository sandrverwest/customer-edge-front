import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, of, switchMap, timeout} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

export interface ErrorObservable {
  subject:string,
  error:HttpErrorResponse
}

export interface ErrorWS {
  subject:string,
  error:string
}

@Injectable({
  providedIn: 'root'
})
export class SuccessErrorsService {
  constructor() { }

  private _isProcessing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isProcessing$: Observable<boolean> = this._isProcessing$.asObservable()

  private _successMessage$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  successMessage$: Observable<string | null> = this._successMessage$.asObservable()

  private _errorMessage$: BehaviorSubject<ErrorObservable | null> = new BehaviorSubject<ErrorObservable | null>(null)
  errorMessage$: Observable<ErrorObservable | null> = this._errorMessage$.asObservable()


  private _wsErrorMessage$: BehaviorSubject<ErrorWS | null> = new BehaviorSubject<ErrorWS | null>(null)
  wsErrorMessage$: Observable<ErrorWS | null> = this._wsErrorMessage$.asObservable()


  processing(isProcessing: boolean) {
    this._isProcessing$.next(isProcessing)
    if(isProcessing) {
      this._successMessage$.next(null)
    }
  }

  setError(subject: string, error:HttpErrorResponse) {
    this._errorMessage$.next({subject, error})
  }

  wsSetError(subject: string, error:string) {
    this._wsErrorMessage$.next({subject, error})
  }

  removeError(){
    this._errorMessage$.next(null)
  }

  setSuccess() {
    this._successMessage$.next('All changes have been saved')
    this._errorMessage$.next(null)
    setTimeout(()=> this._successMessage$.next(null), 3000)
  }

  removeSuccess() {
    this._successMessage$.next(null)
  }

}
