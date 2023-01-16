import { OfferStateInterface } from '../types/offer.state.interface';

import { OFFER_FEATURE_KEY } from './offer-reducers';

import { createFeatureSelector, createSelector } from "@ngrx/store";

export const deptnameFeatureSelector = createFeatureSelector<OfferStateInterface>(OFFER_FEATURE_KEY);

export const selectNewOffer = createSelector(deptnameFeatureSelector, (state: any) => state.response);

