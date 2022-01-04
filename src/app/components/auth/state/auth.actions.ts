import { createAction, props } from '@ngrx/store';
import { AuthState } from './auth.model';

export const LOGIN_START = '[AUTH] login start';
export const LOGIN_SUCCESS = '[AUTH] login success';
export const LOGIN_FAIL = '[AUTH] login fail';
export const LOGOUT = '[AUTH] logout';

export const REGISTER_START = '[AUTH] register start';
export const REGISTER_SUCCESS = '[AUTH] register success';
export const REGISTER_FAIL = '[AUTH] register fail';

export const loginStart = createAction(LOGIN_START);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: any; token: string }>()
);
export const loginFail = createAction(
  LOGIN_FAIL,
  props<{ error: string }>()
);
export const logout = createAction(LOGOUT);

export const registerStart = createAction(REGISTER_START);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFail = createAction(
  REGISTER_FAIL,
  props<{ error: string }>()
);
