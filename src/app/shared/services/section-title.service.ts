import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SectionTitleService {

  constructor() { }

  private _title$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  title$: Observable<string | null> = this._title$.asObservable()

  setTitle(title:string){
    this._title$.next(title)
  }
}
