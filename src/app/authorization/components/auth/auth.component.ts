import {Component, OnInit} from '@angular/core';
import {delay, Observable} from "rxjs";
import {User} from "../../../shared/interfaces";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  isAuthing = false

  constructor(public user: UserService, private http: HttpClient, private router: Router) { }
  ngOnInit() {
    this.isAuthing = true
    this.getUserData().pipe(delay(2500)).subscribe(
      {
        next: result => {
          this.user.pushUserData(result)
          this.isAuthing = false
          this.router.navigate(['/'])
        },
        error: error => {
          this.user.pushError(error.error)
          this.isAuthing = false
          this.router.navigate(['login'])
        }
      }
    )
  }

  getUserData():Observable<User> {
    return this.http.post<User>(`${environment.API_URL}/auth/user`, null)
  }


}
