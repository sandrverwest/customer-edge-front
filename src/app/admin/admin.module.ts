import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout/admin-layout.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import { AdminLeftSidebarComponent } from './admin-layout/components/admin-left-sidebar/admin-left-sidebar.component';
import {AppModule} from "../app.module";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminLeftSidebarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AdminModule { }
