import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { GeneralComponent } from './components/general/general.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import {SharedModule} from "../shared/shared.module";
import { UsersComponent } from './components/users/users.component';
import { LevelsComponent } from './components/insurance/levels/levels.component';
import { ProducersComponent } from './components/insurance/producers/producers.component';
import { LevelComponent } from './components/insurance/levels/level/level.component';
import {carrierResolver, carriersResolver} from "../shared/services/fetch/carriers.service";
import {levelResolver} from "../shared/services/fetch/levels.service";
import { ProducerComponent } from './components/insurance/producers/producer/producer.component';
import { NewProducerComponent } from './components/insurance/producers/new-producer/new-producer.component';
import { NewLevelComponent } from './components/insurance/levels/new-level/new-level.component';
import {CarriersListComponent} from "../carriers/components/carriers-list/carriers-list.component";
import { UserComponent } from './components/users/user/user.component';
import { UserEditingComponent } from './components/users/user/user-editing/user-editing.component';
import { UserSecuringComponent } from './components/users/user/user-securing/user-securing.component';
import { NewUserComponent } from './components/users/user/new-user/new-user.component';
import { CarriersAdminLayoutComponent } from './components/general/carriers-admin-layout/carriers-admin-layout.component';
import {NewCarrierComponent} from "./components/general/carriers-admin-layout/new-carrier/new-carrier.component";




@NgModule({
  declarations: [
    CustomerLayoutComponent,
    GeneralComponent,
    InsuranceComponent,
    UsersComponent,
    LevelsComponent,
    ProducersComponent,
    LevelComponent,
    ProducerComponent,
    NewProducerComponent,
    NewLevelComponent,
    UserComponent,
    UserEditingComponent,
    UserSecuringComponent,
    NewUserComponent,
    CarriersAdminLayoutComponent,
    NewCarrierComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: CustomerLayoutComponent, children: [
          {path: 'general', component: GeneralComponent, children: [
              {path: 'carriers', component: CarriersAdminLayoutComponent, children: [
                  {path: '', component: CarriersListComponent, resolve: {carriers: carriersResolver}}
                ]},
              {path: 'users', component: UsersComponent},
            ]},
          {path: 'insurance', component: InsuranceComponent, children: [
              {path: 'levels', component: LevelsComponent, children: [
                  {path: 'level/:id', component: LevelComponent, resolve: {level: levelResolver}},
                  {path: 'new', component: NewLevelComponent}
                ]},

              {path: 'producers', component: ProducersComponent},
            ]}
        ]}
    ])
  ],
  exports: [RouterModule]
})
export class CustomerModule { }
