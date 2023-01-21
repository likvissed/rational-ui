import { MessageService } from 'primeng/api';
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
    private service: OfferService,
    private messageService: MessageService
  ) {}

  new$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newOfferAction),
      switchMap(() => {
        return this.service.newOffer().pipe(
          map((response: any ) => {
            return newOfferSuccessAction({response});
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Сервер временно недоступен', detail: 'Не удалось загрузить данные. Попробуйте обновить страницу' });

            return of(newOfferFailureAction({ error: errorResponse.error }))
          })
        )
      })
    )
  );

}
