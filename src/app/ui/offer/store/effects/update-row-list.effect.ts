import { updateRowListAction, updateRowListSuccessAction, updateRowListFailureAction } from './../actions/update_row_list.action';

import { MessageService } from 'primeng/api';

import { OfferService } from './../../services/offer.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class UpdateRowListEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService,
    private messageService: MessageService
  ) {}

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRowListAction),
      switchMap((value) => {
        return this.service.updateRowList(value.data).pipe(
          map((response: any ) => {
            this.messageService.add({severity: 'success', summary: 'Успешно', detail: response.result });

            return updateRowListSuccessAction({response});
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            updateRowListFailureAction({ error: errorResponse.error })
          ))
        )
      })
    )
  );

}
