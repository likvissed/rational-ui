import { AuthInterceptor } from './../interceptors/auth.interceptor';

import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { AuthService } from './../services/auth.service';
import { GetAuthUserEffect } from './../store/effects/get-auth-user.effect';
import { JoinPipe } from './../pipes/join.pipe';
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
import { StorageService } from '../services/storage.service';

const pipes: any[] = [
  TrendNamePipe,
  SerialNamePipe,
  StatuslNamePipe,
  JoinPipe
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
        FindEmployeeEffect,
        GetAuthUserEffect
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
    AuthService,
    StorageService,
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})

export class SharedModule { }
