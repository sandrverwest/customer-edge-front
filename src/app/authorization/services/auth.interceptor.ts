import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token')!
      const cloned = req.clone({
        headers: req.headers.append('Auth', token)
      })
      return next.handle(cloned).pipe(
        catchError((err:HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.auth.logOut()
            }
          }
          return throwError(err)
        })
      )
    } else {
      return next.handle(req).pipe(
        catchError((err:HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.auth.logOut()
            }
          }
          return throwError(err)
        })
      )
    }

  }

}
