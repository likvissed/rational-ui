import { OfferActionTypes } from '../offer-action-types';

import { createAction, props } from '@ngrx/store';

export const createOfferAction = createAction(
  OfferActionTypes.CREATE_OFFER,
  props<{ data: any, formData: any, id: any }>()
);

export const createOfferSuccessAction = createAction(
  OfferActionTypes.CREATE_OFFER_SUCCESS,
  props<{ response: any }>()
);

export const createOfferFailureAction = createAction(
  OfferActionTypes.CREATE_OFFER_FAILURE,
  props<{ error: any }>()
);
