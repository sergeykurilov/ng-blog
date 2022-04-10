import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {login, loginFailed, loginSuccess} from './admin-auth.actions';
import { AdminAuthService } from '../services/admin-auth.service';


@Injectable()
export class AdminAuthEffects  {

  constructor(
    private actions$: Actions,
    private adminAuthService: AdminAuthService
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap((action) =>  this.adminAuthService.login({
      login: action.login,
      password: action.password
    }).pipe(
      map(loginSuccessData => loginSuccess(loginSuccessData)),
      catchError(
        error => of(loginFailed({
            serverError: error.message
          }))
      )
    ))
  ));






}
