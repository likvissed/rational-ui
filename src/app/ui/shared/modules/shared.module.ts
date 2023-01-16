import { FindEmployeeEffect } from '../store/effects/find-employee.effect';
import { EffectsModule } from '@ngrx/effects';
import { sharedReducer, SHARED_FEATURE_KEY } from '../store/reducers';
import { EmployeeService } from '../services/employee.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

const pipes: any[] = [];

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
    EmployeeService
  ]
})

export class SharedModule { }
