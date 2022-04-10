import {createAction, props} from '@ngrx/store';


export const login = createAction(
  '[Admin Auth] Login',
  props<{ login: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Admin Auth] Login Success',
  props<{ accessToken: string }>()
);

export const loginFailed = createAction(
  '[Admin Auth] Login Failure',
  props<{ serverError: string }>()
);
