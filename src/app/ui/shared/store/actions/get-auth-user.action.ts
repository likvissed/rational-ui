import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../store-action-types';

export const getAuthUserAction = createAction(
  ActionTypes.GET_AUTH_USER,
  props<{ token: any }>()
);

export const getAuthUserSuccessAction = createAction(
  ActionTypes.GET_AUTH_USER_SUCCESS,
  props<{ response: any }>()
);

export const getAuthUserFailureAction = createAction(
  ActionTypes.GET_AUTH_USER_FAILURE,
  props<{ error: any }>()
);
