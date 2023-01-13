import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../store-action-types';

export const findEmployeeAction = createAction(
  ActionTypes.GET_EMPLOYEE,
  props<{ data: any }>()
);

export const findEmployeeSuccessAction = createAction(
  ActionTypes.GET_EMPLOYEE_SUCCESS,
  props<{ response: any }>()
);

export const findEmployeeFailureAction = createAction(
  ActionTypes.GET_EMPLOYEE_FAILURE,
  props<{ error: any }>()
);
