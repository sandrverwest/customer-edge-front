import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Credential} from "../../../shared/interfaces";
import {SuccessErrorsService} from "../../../shared/services/success-errors.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup

  constructor(
    public auth: AuthService,
    private router: Router,
    public successErrorsService:SuccessErrorsService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  logIn() {
    if(this.form.valid){
      const user:Credential = {...this.form.value}
      this.successErrorsService.processing(true)
      this.auth.logIn(user).subscribe({
        next: ()=>{
          this.form.reset()
          this.successErrorsService.removeError()
          this.successErrorsService.processing(false)
          this.router.navigate(['login', 'auth'])
        },
        error: (error)=>{
          this.successErrorsService.setError('Authorization', error)
          this.successErrorsService.processing(false)
        }})
    }
  }
}
