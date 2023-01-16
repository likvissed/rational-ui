import { EffectsModule } from '@ngrx/effects';
import { NewOfferEffect } from './../store/effects/new-offer.effect';
import { offerReducer, OFFER_FEATURE_KEY } from './../store/offer-reducers';
import { StoreModule } from '@ngrx/store';
import { OfferServiceModule } from './../services/offer.service.module';
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
    ReactiveFormsModule,

    OfferServiceModule,

    StoreModule.forFeature(OFFER_FEATURE_KEY, offerReducer),
    EffectsModule.forFeature(
      [
        NewOfferEffect
      ]
    )
  ]
})
export class OfferModule { }
