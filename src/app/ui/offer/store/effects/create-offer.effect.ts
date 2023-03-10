import { MessageService } from 'primeng/api';
import { createOfferAction, createOfferSuccessAction, createOfferFailureAction } from './../actions/create-offer.action';

import { OfferService } from './../../services/offer.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class CreateOfferEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService,
    private messageService: MessageService
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOfferAction),
      switchMap((value) => {
        return this.service.createOffer(value.formData, value.id).pipe(
          map((response: any ) => {
            this.messageService.add({severity: 'success', summary: 'Успешно', detail: response.result });

            return createOfferSuccessAction({response});
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            createOfferFailureAction({ error: errorResponse.error })
          ))
        )
      })
    )
  );

}
