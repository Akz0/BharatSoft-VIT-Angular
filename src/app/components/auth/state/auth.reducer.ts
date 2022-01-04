import {
  loginSuccess,
  loginFail,
  logout,
  loginStart,
  registerStart,
  registerSuccess,
  registerFail,
} from './auth.actions';
import { initAuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';

const _authReducer = createReducer(
  initAuthState,
  on(loginStart, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
      isLoggedIn: true,
      user: action.user,
      error: '',
      isLoading: false,
    };
  }),
  on(loginFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoggedIn: false,
      isLoading: false,
    };
  }),
  on(logout, state => {
    return {
      ...state,
      ...initAuthState,
    };
  }),
  on(registerStart, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(registerSuccess, (state, action) => {
    return {
      ...state,
      isLoggedIn: false,
      error: '',
      isLoading: false,
    };
  }),
  on(registerFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoggedIn: false,
      isLoading: false,
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
