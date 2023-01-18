import { OfferActionTypes } from '../offer-action-types';

import { createAction, props } from '@ngrx/store';

export const getAnalogsAction = createAction(
  OfferActionTypes.GET_ANALOGS,
  props<{ data: any }>()
);

export const getAnalogsSuccessAction = createAction(
  OfferActionTypes.GET_ANALOGS_SUCCESS,
  props<{ response: any }>()
);

export const getAnalogsFailureAction = createAction(
  OfferActionTypes.GET_ANALOGS_FAILURE,
  props<{ error: any }>()
);
