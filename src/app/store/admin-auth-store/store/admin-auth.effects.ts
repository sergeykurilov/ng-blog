import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, delay, delayWhen, filter, first, map, switchMap} from 'rxjs/operators';
import {of, timer} from 'rxjs';
import {login, loginFailed, loginSuccess} from './admin-auth.actions';
import { AdminAuthService } from '../services/admin-auth.service';
import {AuthData} from './admin-auth.reducer';
import {select, Store} from '@ngrx/store';
import {isAuth} from './admin-auth.selectors';


@Injectable()
export class AdminAuthEffects  {

  constructor(
    private actions$: Actions,
    private adminAuthService: AdminAuthService,
    private store$: Store
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap((action) =>  this.adminAuthService.login({
      login: action.login,
      password: action.password
    }).pipe(
      map((loginSuccessData: AuthData) => loginSuccess(loginSuccessData)),
      catchError(
        error => of(loginFailed({
            serverError: error.message
          }))
      )
    ))
  ));


  $refresh = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    delayWhen(
      (action: AuthData) => timer(
        action.exp * 1000 - 60 * 1000 - Date.now(),
      )),
    delay(5000),
    switchMap(() => this.store$.pipe(
      select(isAuth),
      first(),
      filter(isAdminAUth => isAdminAUth),
    )),
    switchMap(() => this.adminAuthService.refresh().pipe(
      map((loginSuccessData: AuthData) => loginSuccess(loginSuccessData)),
    ))
  ));





}
