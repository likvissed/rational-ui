import { getListsAction, getListsSuccessAction, getListsFailureAction } from './../actions/get-lists.action';
import { OfferService } from './../../services/offer.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class GetListsEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService
  ) {}

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListsAction),
      switchMap(() => {
        return this.service.getLists().pipe(
          map((response: any ) => {
            return getListsSuccessAction({response});
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            getListsFailureAction({error: errorResponse.error})
          ))
        )
      })
    )
  );

}
