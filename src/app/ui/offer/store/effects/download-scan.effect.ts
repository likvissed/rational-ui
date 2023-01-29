import { downloadScanAction, downloadScanSuccessAction, downloadScanFailureAction } from './../actions/download-scan.action';

import { OfferService } from './../../services/offer.service';

import { MessageService } from 'primeng/api';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class DownloadScanEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService,
    private messageService: MessageService
  ) {}

  downloadScan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(downloadScanAction),
      switchMap((value) => {
        return this.service.downloadScan(value.id).pipe(
          map((response: any ) => {         
            let file = new Blob([response], { type: response.type });
            let fileURL = URL.createObjectURL(file);

            let fileLink = document.createElement('a');
            fileLink.href = fileURL;

            fileLink.download = 'Скан-рацпредложения';

            fileLink.click();

            this.messageService.add({severity: 'success', summary: 'Загрузка файла...' });

            return downloadScanSuccessAction({ response: response });
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            downloadScanFailureAction({error: errorResponse.error})
          ))
        )
      })
    )
  );
}
