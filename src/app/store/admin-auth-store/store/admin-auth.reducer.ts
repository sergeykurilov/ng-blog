import {createReducer, on} from '@ngrx/store';
import {login, loginSuccess, loginFailed} from './admin-auth.actions';


export const ADMIN_AUTH_FEATURE_NAME = 'admin-auth';

export interface AuthData {
  accessToken: string;
}

export interface AdminAuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData?: AuthData;
}

const initialState: AdminAuthState = {
  loaded: true,
  loading: false,
  serverError: '',
};


export const adminAuthReducer = createReducer(
  initialState,
  on(login, state => ({
    ...state,
    loading: true,
    serverError: '',
  })),
  on(loginSuccess, (state, authData: AuthData) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      authData,
      serverError: '',
    };
  }),
  on(loginFailed, (state, {serverError}) => {
    return {
      ...state,
      authData: null,
      loading: false,
      loaded: true,
      serverError,
    };
  }),
);
