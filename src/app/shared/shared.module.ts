import {NgModule, Renderer2} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import { UserbarComponent } from './components/userbar/userbar.component';
import { RouterModule} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {CurrencyToNumberPipe} from "./pipes/curency-to-number.pipe";
import { TooltipDirective } from './directives/tooltip.directive';
import {ModalDirective} from "./directives/modal.directive";
import { AutoResizeTextareaDirective } from './directives/auto-resize-textarea.directive';
import {CarriersListComponent} from "../carriers/components/carriers-list/carriers-list.component";
import {PhotoUploaderComponent} from "./components/photo-uploader/photo-uploader.component";
import { ButtonLoaderComponent } from './components/ui/button-loader/button-loader.component';
import {PageLoaderComponent} from "./components/ui/page-loader/page-loader.component";
import { ErrorBarComponent } from './components/ui/error-bar/error-bar.component';
import { ContainerLoaderComponent } from './components/ui/container-loader/container-loader.component';
import { UsersOnlineComponent } from './components/users-online/users-online.component';
import {CarrierSidebarComponent} from "./components/carrier-sidebar/carrier-sidebar.component";
import { NumberToSsnPipe } from './pipes/number-to-ssn.pipe';
import { NumberToEinPipe } from './pipes/number-to-ein.pipe';
import { UsaPhonePipe } from './pipes/usa-phone.pipe';
import { ChangesSidebarComponent } from './components/changes-sidebar/changes-sidebar.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    UserbarComponent,
    TooltipDirective,
    ModalDirective,
    AutoResizeTextareaDirective,
    CarriersListComponent,
    PhotoUploaderComponent,
    ButtonLoaderComponent,
    PageLoaderComponent,
    ErrorBarComponent,
    ContainerLoaderComponent,
    UsersOnlineComponent,
    CarrierSidebarComponent,
    ChangesSidebarComponent,
  ],
  declarations: [
    HeaderComponent,
    UserbarComponent,
    TooltipDirective,
    ModalDirective,
    AutoResizeTextareaDirective,
    CarriersListComponent,
    PhotoUploaderComponent,
    ButtonLoaderComponent,
    PageLoaderComponent,
    ErrorBarComponent,
    ContainerLoaderComponent,
    UsersOnlineComponent,
    CarrierSidebarComponent,
    CurrencyToNumberPipe,
    NumberToSsnPipe,
    NumberToEinPipe,
    UsaPhonePipe,
    ChangesSidebarComponent,
  ],
  providers: [
    CurrencyPipe,
    CurrencyToNumberPipe,
    DatePipe,
    NumberToSsnPipe,
    NumberToEinPipe,
    UsaPhonePipe
  ]
})
export class SharedModule { }

