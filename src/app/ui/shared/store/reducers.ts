import { getAuthUserAction, getAuthUserSuccessAction, getAuthUserFailureAction } from './actions/get-auth-user.action';
import { Action, createReducer, on } from '@ngrx/store';

import { findEmployeeAction, findEmployeeSuccessAction, findEmployeeFailureAction } from './actions/find-employee.action';

export const SHARED_FEATURE_KEY = 'shared';

const initialState = {
  isSubmitting: false,
  response: null,
  errors: null,
  peoples: null
}

const reducer = createReducer(
  initialState,

  on(findEmployeeAction, (state) => ({
    ...state,
    isSubmitting: true,
    response: null,
    errors: null
  })),
  on(findEmployeeSuccessAction, (state, action): any => ({
    ...state,
    isSubmitting: false,
    response: action.response,
    peoples: action.response.people
  })),
  on(findEmployeeFailureAction, (state, action): any => ({
    ...state,
    isSubmitting: false,
    errors: action.error,
  })),

  on(getAuthUserAction, (state) => ({
    ...state,
    isSubmitting: true,
    response: null,
    errors: null
  })),
  on(getAuthUserSuccessAction, (state, action): any => ({
    ...state,
    isSubmitting: false,
    response: action.response,
    peoples: action.response.people
  })),
  on(getAuthUserFailureAction, (state, action): any => ({
    ...state,
    isSubmitting: false,
    errors: action.error,
  }))
)

export function sharedReducer(state: any, action: Action) {
  return reducer(state, action)
}