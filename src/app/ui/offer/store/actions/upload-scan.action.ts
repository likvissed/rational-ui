import { OfferActionTypes } from '../offer-action-types';

import { createAction, props } from '@ngrx/store';

export const uploadScanAction = createAction(
  OfferActionTypes.UPLOAD_SCAN,
  props<{ file: any, id: number }>()
);

export const uploadScanSuccessAction = createAction(
  OfferActionTypes.UPLOAD_SCAN_SUCCESS,
  props<{ response: any }>()
);

export const uploadScanFailureAction = createAction(
  OfferActionTypes.UPLOAD_SCAN_FAILURE,
  props<{ error: any }>()
);
