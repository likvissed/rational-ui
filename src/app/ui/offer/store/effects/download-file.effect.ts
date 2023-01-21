import { OfferService } from './../../services/offer.service';
import { downloadFileAction, downloadFileSuccessAction, downloadFileFailureAction } from './../actions/download-file.action';

import { MessageService } from 'primeng/api';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class DownloadFileEffect {
  constructor(
    private actions$: Actions,
    private service: OfferService,
    private messageService: MessageService
  ) {}

  download$ = createEffect(() =>
    this.actions$.pipe(
      ofType(downloadFileAction),
      switchMap((value) => {
        return this.service.downloadFile(value.id).pipe(
          map((response: any ) => {
            let file = new Blob([response], { type: response.type });
            let fileURL = URL.createObjectURL(file);

            let fileLink = document.createElement('a');
            fileLink.href = fileURL;

            // FIXME: Изменить наименование
            let nameFile = 'Наименование файла';
            fileLink.download = `${nameFile}`;

            fileLink.click();

            this.messageService.add({severity: 'success', summary: 'Загрузка файла...' });

            return downloadFileSuccessAction({ response: response });
          }),

          catchError((errorResponse: HttpErrorResponse) => of(
            downloadFileFailureAction({error: errorResponse.error})
          ))
        )
      })
    ), { dispatch: false }
  );
}
