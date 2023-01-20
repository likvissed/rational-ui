import { getAnalogsAction, getAnalogsSuccessAction, getAnalogsFailureAction } from './actions/get-analogs.action';
import { createOfferAction, createOfferSuccessAction, createOfferFailureAction } from './actions/create-offer.action';
import { newOfferAction, newOfferSuccessAction, newOfferFailureAction } from './actions/new-offer.action';
import { OfferStateInterface } from './../types/offer.state.interface';

import { Action, createReducer, on } from '@ngrx/store';

export const OFFER_FEATURE_KEY = 'offer';

const initialState: OfferStateInterface = {
  isSubmitting: false,
  response: null,
  errors: null,
  newOffer: null,
  proposals: null,
  flagAnalog: false
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
  })),

  on(getAnalogsAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true,
    flagAnalog: false,
    response: null,
    proposals: []
  })),
  on(getAnalogsSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response,
    proposals: action.response.proposals,
    flagAnalog: true
  })),
  on(getAnalogsFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error,
    flagAnalog: false,
    response: null,
    proposals: []
  }))
)

export function offerReducer(state: OfferStateInterface, action: Action) {
  return reducer(state, action)
}
