import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.model';

export const AUTH_STATE_NAME = 'auth';

const authSelector =
  createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getAuthToken = createSelector(
  authSelector,
  state => state?.token
);
export const getAuthStatus = createSelector(
  authSelector,
  state => state?.isLoggedIn
);
export const getUser = createSelector(
  authSelector,
  state => state?.user
);
export const getUserName = createSelector(
  authSelector,
  state => state?.user.name
);

export const getAuthLoading = createSelector(
  authSelector,
  state => state.isLoading
);
