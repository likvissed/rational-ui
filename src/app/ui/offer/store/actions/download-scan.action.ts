import { OfferActionTypes } from '../offer-action-types';

import { createAction, props } from '@ngrx/store';

export const downloadScanAction = createAction(
  OfferActionTypes.DOWNLOAD_SCAN,
  props<{ id: number }>()
);

export const downloadScanSuccessAction = createAction(
  OfferActionTypes.DOWNLOAD_SCAN_SUCCESS,
  props<{ response: any }>()
);

export const downloadScanFailureAction = createAction(
  OfferActionTypes.DOWNLOAD_SCAN_FAILURE,
  props<{ error: any }>()
);
