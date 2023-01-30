import { OfferActionTypes } from '../offer-action-types';

import { createAction, props } from '@ngrx/store';

export const updateRowListAction = createAction(
  OfferActionTypes.UPDATE_ROW_LIST,
  props<{ data: any }>()
);

export const updateRowListSuccessAction = createAction(
  OfferActionTypes.UPDATE_ROW_LIST_SUCCESS,
  props<{ response: any }>()
);

export const updateRowListFailureAction = createAction(
  OfferActionTypes.UPDATE_ROW_LIST_FAILURE,
  props<{ error: any }>()
);
