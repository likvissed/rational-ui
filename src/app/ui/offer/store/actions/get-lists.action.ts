import { OfferActionTypes } from '../offer-action-types';

import { createAction, props } from '@ngrx/store';

export const getListsAction = createAction(
  OfferActionTypes.GET_LISTS
);

export const getListsSuccessAction = createAction(
  OfferActionTypes.GET_LISTS_SUCCESS,
  props<{ response: any }>()
);

export const getListsFailureAction = createAction(
  OfferActionTypes.GET_LISTS_FAILURE,
  props<{ error: any }>()
);
