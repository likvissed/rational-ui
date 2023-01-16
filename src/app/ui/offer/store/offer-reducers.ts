import { newOfferAction, newOfferSuccessAction, newOfferFailureAction } from './actions/new-offer.action';
import { OfferStateInterface } from './../types/offer.state.interface';

import { Action, createReducer, on } from '@ngrx/store';

export const OFFER_FEATURE_KEY = 'offer';

const initialState: OfferStateInterface = {
  isSubmitting: false,
  response: null,
  errors: null,
  newOffer: null
}

const reducer = createReducer(
  initialState,

  on(newOfferAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true
  })),
  on(newOfferSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response,
    // newOffer: action.response.deptnames
  })),
  on(newOfferFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    // deptnames: null,
    errors: action.error
  }))
)

export function offerReducer(state: OfferStateInterface, action: Action) {
  return reducer(state, action)
}
