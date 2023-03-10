import { downloadScanAction, downloadScanSuccessAction, downloadScanFailureAction } from './actions/download-scan.action';
import { uploadScanAction, uploadScanSuccessAction, uploadScanFailureAction } from './actions/upload-scan.action';
import { updateRowListAction, updateRowListSuccessAction, updateRowListFailureAction } from './actions/update_row_list.action';
import { downloadFileAction, downloadFileSuccessAction, downloadFileFailureAction } from './actions/download-file.action';
import { getListsAction, getListsSuccessAction, getListsFailureAction } from './actions/get-lists.action';
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
  flagAnalog: false,
  flagCreatedOffer: false,
  filters: null,
  isLoadLists: false,
  lists: null
}

const reducer = createReducer(
  initialState,

  on(newOfferAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true,
    newOffer: null
  })),
  on(newOfferSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response,
    newOffer: action.response
  })),
  on(newOfferFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error,
    newOffer: null
  })),

  on(createOfferAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true,
    flagCreatedOffer: false
  })),
  on(createOfferSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response,
    flagCreatedOffer: true
  })),
  on(createOfferFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error,
    flagCreatedOffer: false
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
  })),

  on(getListsAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true,
    filters: null,
    isLoadLists: false,
    lists: []
  })),
  on(getListsSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response,
    filters:  action.response,
    isLoadLists: true,
    lists: action.response.proposals
  })),
  on(getListsFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error,
    filters: null,
    isLoadLists: false,
    lists: []
  })),

  on(downloadFileAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true
  })),
  on(downloadFileSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response
  })),
  on(downloadFileFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error
  })),

  on(updateRowListAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true
  })),
  on(updateRowListSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response
  })),
  on(updateRowListFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error
  })),

  on(uploadScanAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true
  })),
  on(uploadScanSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response
  })),
  on(uploadScanFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error
  })),

  on(downloadScanAction, (state): OfferStateInterface => ({
    ...state,
    isSubmitting: true
  })),
  on(downloadScanSuccessAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.response
  })),
  on(downloadScanFailureAction, (state, action): OfferStateInterface => ({
    ...state,
    isSubmitting: false,
    errors: action.error
  }))
)

export function offerReducer(state: OfferStateInterface, action: Action) {
  return reducer(state, action)
}
