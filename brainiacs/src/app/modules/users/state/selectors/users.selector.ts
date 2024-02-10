import * as fromFeature from 'src/app/modules/users/state/reducers/users.reducer';

import { createSelector } from '@ngrx/store';

export const getUsersPage = createSelector(
  fromFeature.getUsersFeatureState,
  (state) => state.page
);

export const getLoadingState = createSelector(
  fromFeature.getUsersFeatureState,
  (state) => state.loading
);

export const getError = createSelector(
  fromFeature.getUsersFeatureState,
  (state) => state.error
);
