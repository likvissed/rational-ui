import { SHARED_FEATURE_KEY } from './reducers';

import { createFeatureSelector, createSelector } from "@ngrx/store";

export const sharedFeatureSelector = createFeatureSelector(SHARED_FEATURE_KEY);

export const searchUsers = createSelector(sharedFeatureSelector, (state: any) => {
  return state.peoples;
});
