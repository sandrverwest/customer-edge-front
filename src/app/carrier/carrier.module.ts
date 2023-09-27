import {NgModule, Renderer2} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CarrierLayoutComponent} from "./carrier-layout/carrier-layout.component";
import {InformationComponent} from "./components/information/information.component";
import {EquipmentComponent} from "./modules/equipment/equipment.component";
import {DriversComponent} from "./modules/drivers/drivers.component";
import {ClaimsComponent} from "./modules/claims/claims.component";
import {FormsComponent} from "./components/forms/forms.component";
import {carrierResolver, carriersResolver} from "../shared/services/fetch/carriers.service";
import {InsuranceComponent} from "./components/information/insurance/insurance.component";
import {CarrierSidebarComponent} from "../shared/components/carrier-sidebar/carrier-sidebar.component";
import {SharedModule} from "../shared/shared.module";
import {ModalLevelComponent} from "./components/modals/level/modal-level.component";
import { EditCarrierComponent } from './components/modals/edit-carrier/edit-carrier.component';
import { InsuranceAddEditComponent } from './components/modals/insurance-add-edit/insurance-add-edit.component';
import { CarrierStatisticComponent } from './components/information/carrier-statistic/carrier-statistic.component';
import { CoverageComponent } from './components/information/insurance/coverage/coverage.component';
import { ContractorsLayoutComponent } from './modules/contractors/contractors-layout/contractors-layout.component';



@NgModule({
  declarations: [
    InformationComponent,
    InsuranceComponent,
    CarrierLayoutComponent,
    FormsComponent,
    ModalLevelComponent,
    EquipmentComponent,
    DriversComponent,
    ClaimsComponent,
    EditCarrierComponent,
    InsuranceAddEditComponent,
    CarrierStatisticComponent,
    CoverageComponent,
    ContractorsLayoutComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: CarrierLayoutComponent, resolve: {carrier: carrierResolver}, children: [
          {path: '', component: InformationComponent},
          {path: 'contractors', loadChildren: () => import('./modules/contractors/contractors.module').then(m => m.ContractorsModule)},
          {path: 'equipment', loadChildren: () => import('./modules/fleet/fleet.module').then(m => m.FleetModule)},
          {path: 'drivers', component: DriversComponent},
          {path: 'claims', component: ClaimsComponent},
          {path: 'forms', component: FormsComponent},
        ]
      }
    ])
  ],
  exports: [RouterModule],
})
export class CarrierModule { }
