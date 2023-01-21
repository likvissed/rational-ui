import { StatuslNamePipe } from './../pipes/status-name.pipe';
import { SerialNamePipe } from './../pipes/serial-name.pipe';
import { ErrorInterceptor } from './../interceptors/error.interceptor';
import { ErrorHandlerService } from './../services/error-handler.service';
import { EmployeeService } from '../services/employee.service';

import { FindEmployeeEffect } from '../store/effects/find-employee.effect';
import { sharedReducer, SHARED_FEATURE_KEY } from '../store/reducers';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrendNamePipe } from '../pipes/trend-name.pipe';

const pipes: any[] = [
  TrendNamePipe,
  SerialNamePipe,
  StatuslNamePipe
];

const components: any[] = [];

const directives: any[] = [];

@NgModule({
  declarations: [
    ...pipes,
    ...components,
    ...directives
  ],
  imports: [
    CommonModule,

    StoreModule.forFeature(SHARED_FEATURE_KEY, sharedReducer),
    EffectsModule.forFeature(
      [
        FindEmployeeEffect
      ]
    )
  ],
  exports: [
    ...pipes,
    ...components,
    ...directives
  ],
  providers: [
    EmployeeService,
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ]
})

export class SharedModule { }
