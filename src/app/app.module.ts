import {APP_INITIALIZER, inject, NgModule, Provider, Renderer2} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftSidebarComponent } from './shared/components/left-sidebar/left-sidebar.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { HelpComponent } from './shared/pages/help/help.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { CarriersLayoutComponent } from './carriers/carriers-layout/carriers-layout.component';
import { ResolveLoaderComponent } from './shared/components/ui/resolve-loader/resolve-loader.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import {SharedModule} from "./shared/shared.module";
import {AuthorizationLayoutComponent} from "./authorization/authorization-layout/authorization-layout.component";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {AuthInterceptor} from "./authorization/services/auth.interceptor";
import {LoaderService} from "./shared/services/loader.service";
import {delay, Observable, tap} from "rxjs";
import {environment} from "../environments/environment";
import {userInit, UserService} from "./authorization/services/user.service";
import {User} from "./shared/interfaces";
import {Router} from "@angular/router";



const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

const INITIALIZER_PROVIDER:Provider = {
  provide: APP_INITIALIZER,
    useFactory: userInit,
    multi: true,
    deps: [HttpClient, Router, UserService]
}

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    HomeComponent,
    HelpComponent,
    NotFoundComponent,
    CarriersLayoutComponent,
    ResolveLoaderComponent,
    MainLayoutComponent,
    AuthorizationLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER, INITIALIZER_PROVIDER],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
