import { OfferActionTypes } from '../offer-action-types';

import { createAction, props } from '@ngrx/store';

export const downloadFileAction = createAction(
  OfferActionTypes.DOWNLOAD_FILE,
  props<{ id: number, filename: string }>()
);

export const downloadFileSuccessAction = createAction(
  OfferActionTypes.DOWNLOAD_FILE_SUCCESS,
  props<{ response: any }>()
);

export const downloadFileFailureAction = createAction(
  OfferActionTypes.DOWNLOAD_FILE_FAILURE,
  props<{ error: any }>()
);
