import { createOfferAction, createOfferSuccessAction, createOfferFailureAction } from './actions/create-offer.action';
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
    response: action.response
  })),
  on(newOfferFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error
  })),

  on(createOfferAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true
  })),
  on(createOfferSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response
  })),
  on(createOfferFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error
  }))
)

export function offerReducer(state: OfferStateInterface, action: Action) {
  return reducer(state, action)
}
