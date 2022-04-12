import {createAction, props} from '@ngrx/store';
import {AuthData} from './admin-auth.reducer';


export const login = createAction(
  '[Admin Auth] Login',
  props<{ login: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Admin Auth] Login Success',
  props<{authData: AuthData}>()
);

export const loginFailed = createAction(
  '[Admin Auth] Login Failure',
  props<{ serverError: string }>()
);

export const initAdminAuth = createAction(
  '[Admin Auth] Init Admin Auth'
);

export const logoutSuccess = createAction(
  '[Admin Auth] Logout Success'
);

export const extractLoginData = createAction(
  '[Admin Auth] Extract Login Data'
);
