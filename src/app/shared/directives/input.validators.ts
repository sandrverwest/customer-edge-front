import { FormControl } from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, of} from "rxjs";


export class InputValidators {
  constructor(private http: HttpClient) {
  }

  static dateFormat(control: FormControl):{[key:string]:boolean}|null {
    const dateFormat = /^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/]([1-9][0-9][0-9]{2}))*$/.test(control.value)

    if(!dateFormat) {
      return {"wrongDate": true}
    }
    return null
  }

}
