import { uploadScanAction, uploadScanSuccessAction, uploadScanFailureAction } from './../actions/upload-scan.action';

import { MessageService } from 'primeng/api';

import { OfferService } from './../../services/offer.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getListsAction } from '../actions/get-lists.action';

@Injectable()
export class UploadScanEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService,
    private messageService: MessageService
  ) {}

  upload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadScanAction),
      switchMap((value) => {
        return this.service.uploadScan(value.file, value.id).pipe(
          map((response: any ) => {
            this.messageService.add({severity: 'success', summary: 'Успешно', detail: response.result });
          }),
          switchMap((response: any) => [
            uploadScanSuccessAction({response}),
            getListsAction()
          ]),

          catchError((errorResponse: HttpErrorResponse) => of(
            uploadScanFailureAction({ error: errorResponse.error })
          ))
        )
      })
    )
  );

}
