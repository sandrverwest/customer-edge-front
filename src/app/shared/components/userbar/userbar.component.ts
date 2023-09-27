import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../authorization/services/auth.service";
import {UserService} from "../../../authorization/services/user.service";

import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../interfaces";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-userbar',
  templateUrl: './userbar.component.html',
  styleUrls: ['./userbar.component.scss']
})
export class UserbarComponent implements OnInit{
  @Input() userData: User

  isActiveBar = false
  @ViewChild('userBar') userBar: ElementRef
  @ViewChild('email') email: ElementRef

  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (this.userBar.nativeElement.contains(event.target) || this.email?.nativeElement.contains(event.target)) {
      this.isActiveBar = true
    } else {
      this.isActiveBar = false
    }
  }
  constructor(public auth: AuthService, private user: UserService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  protected readonly environment = environment;
}
