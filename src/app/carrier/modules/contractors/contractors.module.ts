import { NgModule } from '@angular/core';

import {SharedModule} from "../../../shared/shared.module";
import {RouterModule} from "@angular/router";
import { ContractorsComponent } from './components/contractors/contractors.component';
import {ContractorsLayoutComponent} from "./contractors-layout/contractors-layout.component";
import { NewContractorComponent } from './modals/new-contractor/new-contractor.component';
import { NewContractorCardComponent } from './ui/new-contractor-card/new-contractor-card.component';
import {
  contractorsActiveResolver,
  contractorsHiringResolver, contractorsLeavingResolver,
} from "../../../shared/services/fetch/contractors.service";
import { HiringContractorComponent } from './contractors-layout/hiring/hiring-contractor.component';
import { ActiveContractorComponent } from './contractors-layout/active/active-contractor.component';
import {LeavingContractorComponent} from "./contractors-layout/leaving/leaving-contractor.component";




@NgModule({
  declarations: [
    ContractorsComponent,
    NewContractorComponent,
    NewContractorCardComponent,
    HiringContractorComponent,
    ActiveContractorComponent,
    LeavingContractorComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: ContractorsLayoutComponent, children: [
          {path: '', component: ActiveContractorComponent, resolve: {contractors: contractorsActiveResolver}},
          {path: 'hiring', component: HiringContractorComponent,  resolve: {contractors: contractorsHiringResolver}},
          {path: 'active', component: ActiveContractorComponent, resolve: {contractors: contractorsActiveResolver}},
          {path: 'leaving', component: LeavingContractorComponent, resolve: {contractors: contractorsLeavingResolver}}
        ]}
    ])
  ]
})
export class ContractorsModule { }
