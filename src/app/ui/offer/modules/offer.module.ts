import { AnalogComponent } from './../page/components/analog/analog.component';
import { NewComponent } from './../page/components/new/new.component';
import { ListComponent } from '../page/components/list/list.component';

import { GetListsEffect } from './../store/effects/get-lists.effect';
import { GetAnalogsEffect } from './../store/effects/get-analogs.effect';
import { CreateOfferEffect } from './../store/effects/create-offer.effect';
import { NewOfferEffect } from './../store/effects/new-offer.effect';
import { offerReducer, OFFER_FEATURE_KEY } from './../store/offer-reducers';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../../shared/modules/shared.module';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferServiceModule } from './../services/offer.service.module';
import { PrimengModule } from 'src/app/primeng.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    NewComponent,
    ListComponent,
    AnalogComponent
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,

    PrimengModule,
    SharedModule,

    FormsModule,
    ReactiveFormsModule,

    OfferServiceModule,

    StoreModule.forFeature(OFFER_FEATURE_KEY, offerReducer),
    EffectsModule.forFeature(
      [
        NewOfferEffect,
        CreateOfferEffect,
        GetAnalogsEffect,
        GetListsEffect
      ]
    )
  ]
})
export class OfferModule { }
