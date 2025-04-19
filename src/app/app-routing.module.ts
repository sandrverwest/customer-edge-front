import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { HelpComponent } from './shared/pages/help/help.component';
import { HomeComponent } from './shared/pages/home/home.component';
import {CarriersLayoutComponent} from "./carriers/carriers-layout/carriers-layout.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {canActivateAuth} from "./authorization/services/auth.service";
import {carriersResolver} from "./shared/services/fetch/carriers.service";



const routes: Routes = [
  {path: '', component: MainLayoutComponent, canActivate: [canActivateAuth], children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomeComponent},
      {path: 'changeslist', loadChildren: () => import('./changes/changes.module').then(m => m.ChangesModule)},
      {path: 'help', component: HelpComponent},
      {path: 'carriers', component: CarriersLayoutComponent, resolve: {carriers: carriersResolver}},
      {path: 'carrier/:id', loadChildren: () => import('./carrier/carrier.module').then(m => m.CarrierModule)}
    ]},
  {path: 'login', loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)},
  {path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
