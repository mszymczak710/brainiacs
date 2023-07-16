import { createSelector } from '@ngrx/store';
import * as fromFeature from '@users/state/reducers/users.reducer';

export const getUsersPage = createSelector(fromFeature.getUsersFeatureState, (state) => state.page);

export const getLoadingState = createSelector(fromFeature.getUsersFeatureState, (state) => state.loading);

export const getError = createSelector(fromFeature.getUsersFeatureState, (state) => state.error);
