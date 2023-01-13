import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../page/components/list/list.component';

import { NewComponent } from '../page/components/new/new.component';

const routes: Routes = [
  { path: '', redirectTo: '/offer/list', pathMatch: 'full' },
  { path: 'new', component: NewComponent },
  { path: 'list', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
