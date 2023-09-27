import { NgModule } from '@angular/core';

import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {AuthorizationLayoutComponent} from "./authorization-layout/authorization-layout.component";
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';



@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: AuthorizationLayoutComponent, children: [
          {path: '', component: LoginComponent},
          {path: 'auth', component: AuthComponent}
        ]}
    ])
  ],
  exports: [RouterModule]
})
export class AuthorizationModule { }
