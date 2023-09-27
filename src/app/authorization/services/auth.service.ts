import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Credential, Token} from "../../shared/interfaces";
import {catchError, delay, Observable, Subject, tap, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {SuccessErrorsService} from "../../shared/services/success-errors.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient, private router: Router, private successErrorsService:SuccessErrorsService) { }

  get token():string | null {
    return localStorage.getItem('token')!
  }

  logIn(user: Credential): Observable<Token | null> {
    return this.http.post<Token | null>(`${environment.API_URL}/auth/`, user).pipe(
      tap(this.setToken),
    )
  }

  logOut() {
    this.setToken(null)
    this.router.navigate(['/login'])
  }

  isLoggedIn():boolean {
    return !!this.token
  }

  private setToken(token:Token | null) {
    if(token) {
      localStorage.setItem('token', token.token)
    } else {
      localStorage.removeItem('token')
    }
  }
}


export const canActivateAuth: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if (inject(AuthService).isLoggedIn()) {
      return true
    } else {
      inject(AuthService).logOut()
      return false
    }
  };
