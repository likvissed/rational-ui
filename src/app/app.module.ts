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

const appModules: any[] = [
  LayoutModule,
  PrimengModule,
  OfferModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ...appModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
