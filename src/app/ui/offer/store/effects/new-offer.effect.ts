import { newOfferFailureAction, newOfferSuccessAction } from './../actions/new-offer.action';
import { newOfferAction } from './../actions/new-offer.action';

import { OfferService } from './../../services/offer.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class NewOfferEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService
  ) {}

  new$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newOfferAction),
      switchMap(() => {
        return this.service.newOffer().pipe(
          // map((response: any ) => {
          //   if (response) {
          //     response.deptnames.map((deptname: any, index: number) => {
          //       let arrStr = deptname.users.map((user: any) => user.fio).join(', ');

          //       response.deptnames[index]['fio_users'] = arrStr;
          //     });
          //   }

          //   return response;
          // }),
          map((response: any ) => {
            console.log('new offer', response);

            return newOfferSuccessAction({response});
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            newOfferFailureAction({error: errorResponse.error})
          ))
        )
      })
    )
  );

}
