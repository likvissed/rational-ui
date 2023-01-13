import { findEmployeeSuccessAction, findEmployeeFailureAction } from './../actions/find-employee.action';
import { EmployeeService } from './../../services/employee.service';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of, debounceTime } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { findEmployeeAction } from '../actions/find-employee.action';

@Injectable()
export class FindEmployeeEffect {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}

  findEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findEmployeeAction),
      debounceTime(800),
      switchMap((value) => {
        return this.employeeService.findUsers(value.data).pipe(
          map((response: any) => {
            return findEmployeeSuccessAction({response});
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            findEmployeeFailureAction({error: errorResponse.error.message})
          ))
        )
      })
    )
  );
}
