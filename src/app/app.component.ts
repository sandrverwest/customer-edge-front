import {APP_INITIALIZER, ApplicationInitStatus, Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "./authorization/services/auth.service";
import {audit} from "rxjs";
import {UserService} from "./authorization/services/user.service";
import {LoaderService} from "./shared/services/loader.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  constructor (
    public loaderService: LoaderService
  ) {
  }

}
