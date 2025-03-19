import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import { RouterModule } from '@angular/router';
import { ChangesLayoutComponent } from './changes-layout/changes-layout.component';
import {ChangesListComponent} from "./components/changes-list/changes-list.component";
import { AddsItemComponent } from './components/adds-item/adds-item.component';
import {CellComponent} from "./components/cell/cell.component";
import {InputfocusDirective} from "../shared/directives/inputfocus.directive";
import {ContenteditableValueAccessor} from "../shared/directives/editable-accessor.directive";



@NgModule({
  declarations: [
    ChangesLayoutComponent,
    ChangesListComponent,
    AddsItemComponent,
    CellComponent,
    InputfocusDirective,
    ContenteditableValueAccessor
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ChangesLayoutComponent,  children: [
          {path: '', component: ChangesListComponent},
          {path: '1045', component: ChangesListComponent},
          {path: 'yesterday', component: ChangesListComponent}
        ]}
    ])
  ],
  exports: [RouterModule]
})
export class ChangesModule { }
