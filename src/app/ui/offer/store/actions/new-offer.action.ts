import { OfferActionTypes } from '../offer-action-types';

import { createAction, props } from '@ngrx/store';

export const newOfferAction = createAction(
  OfferActionTypes.NEW_OFFER
);

export const newOfferSuccessAction = createAction(
  OfferActionTypes.NEW_OFFER_SUCCESS,
  props<{ response: any }>()
);

export const newOfferFailureAction = createAction(
  OfferActionTypes.NEW_OFFER_FAILURE,
  props<{ error: any }>()
);
