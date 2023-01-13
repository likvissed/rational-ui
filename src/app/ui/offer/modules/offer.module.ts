import { OfferRoutingModule } from './offer-routing.module';
import { NewComponent } from './../page/components/new/new.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/primeng.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListComponent } from '../page/components/list/list.component';

@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,

    PrimengModule,

    FormsModule,
    ReactiveFormsModule
  ]
})
export class OfferModule { }
