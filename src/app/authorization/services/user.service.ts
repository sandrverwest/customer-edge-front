import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, catchError, delay, map, Observable, of, Subject, tap, throwError} from "rxjs";
import {Carrier, User} from "../../shared/interfaces";
import {ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Router, RouterStateSnapshot} from "@angular/router";
import {LoaderService} from "../../shared/services/loader.service";
import {CarriersService} from "../../shared/services/fetch/carriers.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userData$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  public readonly userData$: Observable<User | null> = this._userData$.asObservable()

    private _userError$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
    public readonly userError$: Observable<string | null> = this._userError$.asObservable()

  constructor(private http: HttpClient) {

    // this.getUserData().subscribe(
    //     {
    //       next: result => {this._userData$.next(result)},
    //       error: error => {this._userError$.next(error.error)}
    //     }
    //   )
  }

  pushUserData(user:User) {
      this._userData$.next(user)
  }

  pushError(error:string) {
    this._userError$.next(error)
  }

  getUserData():Observable<User> {
    return this.http.post<User>(`${environment.API_URL}/auth/user`, null)
  }
}

export function userInit(httpClient: HttpClient, router:Router, userService:UserService): () => Observable<User | null> {
  return () => httpClient.post<User>(`${environment.API_URL}/auth/user`, null)
      .pipe(
          tap(user => {
              userService.pushUserData(user)
          }),
          catchError(error => {
              router.navigate(['/login'])
              return of(null)
          }),
          delay(0),
      )
}
