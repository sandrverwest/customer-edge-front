import { Component, OnInit } from '@angular/core';
import { CarriersService } from 'src/app/shared/services/fetch/carriers.service';
import {AuthService} from "../../../authorization/services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../authorization/services/user.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../interfaces";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public user: UserService) { }

  ngOnInit() {
  }

}
