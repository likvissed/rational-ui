import { OfferStateInterface } from '../types/offer.state.interface';

import { OFFER_FEATURE_KEY } from './offer-reducers';

import { createFeatureSelector, createSelector } from "@ngrx/store";

export const offerFeatureSelector = createFeatureSelector<OfferStateInterface>(OFFER_FEATURE_KEY);

export const selectNewOffer = createSelector(offerFeatureSelector, (state: any) => state.response);

export const sendNewOffer = createSelector(offerFeatureSelector, (state: any) => state.response);

export const getAnalogs = createSelector(offerFeatureSelector, (state: any) => state.proposals);
