import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ADMIN_AUTH_FEATURE_NAME, AdminAuthState} from './admin-auth.reducer';


const getFeature = createFeatureSelector<AdminAuthState>(ADMIN_AUTH_FEATURE_NAME);



export const getLoading = createSelector(
    getFeature,
    (state: AdminAuthState) => state.loading
);

export const getLoaded = createSelector(
  getFeature,
  (state: AdminAuthState) => state.loaded
);

export const getServerError = createSelector(
  getFeature,
  (state: AdminAuthState) => state.serverError
);


export const getAuthData = createSelector(
  getFeature,
  (state: AdminAuthState) => state.authData
);

export const getAccessToken = createSelector(
  getAuthData,
  authData => authData && authData.accessToken
);


export const isAuth = createSelector(
  getAccessToken,
  accessToken => !!accessToken,
);
