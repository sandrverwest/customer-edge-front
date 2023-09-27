import { NgModule } from '@angular/core';

import {SharedModule} from "../../../shared/shared.module";
import { FleetLayoutComponent } from './fleet-layout/fleet-layout.component';
import {RouterModule} from "@angular/router";
import { AddEntityComponent } from './components/add-entity/add-entity.component';
import { AddIndividualComponent } from './components/add-entity/add-individual/add-individual.component';
import { AddBusinessComponent } from './components/add-entity/add-business/add-business.component';
import { FleetComponent } from './components/fleet/fleet.component';



@NgModule({
  declarations: [
    FleetLayoutComponent,
    AddEntityComponent,
    AddIndividualComponent,
    AddBusinessComponent,
    FleetComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: FleetLayoutComponent, children: [
          {path: 'hiring', component: FleetComponent},
          {path: 'active', component: FleetComponent},
          {path: 'leaving', component: FleetComponent}
        ]}
    ])
  ]
})
export class FleetModule { }
