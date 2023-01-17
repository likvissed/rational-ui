import { SharedModule } from './ui/shared/modules/shared.module';
import { OfferModule } from './ui/offer/modules/offer.module';
import { LayoutModule } from './ui/layout/modules/layout.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from './primeng.module';

import { environment } from './../environments/environment';

import { AuthCenterModule } from '@iss/ng-auth-center';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const appModules: any[] = [
  LayoutModule,
  PrimengModule,
  OfferModule,
  SharedModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    AuthCenterModule.forRoot(environment.auth),
    AppRoutingModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.debugRedux ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],

    ...appModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
