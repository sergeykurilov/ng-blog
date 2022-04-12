import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, delay, filter, first, map, switchMap, tap} from 'rxjs/operators';
import {fromEvent, of, timer} from 'rxjs';
import {extractLoginData, initAdminAuth, login, loginFailed, loginSuccess, logoutSuccess} from './admin-auth.actions';
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
      map((authData: AuthData) => loginSuccess({ authData })),
      catchError(
        error => of(loginFailed({
            serverError: error.message
          }))
      )
    ))
  ));

  saveAuthDataToLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(({authData}) => {
      localStorage.setItem('authData', JSON.stringify(authData));
    })
  ), { dispatch: false });


  listenStorageEffect$ = createEffect(() => this.actions$.pipe(
    ofType(initAdminAuth),
    switchMap(() => fromEvent(window, 'storage')),
    map(() => extractLoginData())
  ));

  extractLoginData$ = createEffect(() => this.actions$.pipe(
    ofType(initAdminAuth, extractLoginData),
    map(() => {
      const authDataString = localStorage.getItem('authData');
      if (!authDataString) {
        return logoutSuccess();
      }

      const authData: AuthData = JSON.parse(authDataString);

      if ((authData.exp * 1000 - 10 * 1000 - Date.now()) < 0){
        return logoutSuccess();
      }

      return loginSuccess({ authData });
    })
  ));

  $refresh = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    switchMap(
      ({authData}) => timer(
        authData.exp * 1000 - 60 * 1000 - Date.now(),
      )),
    delay(5000),
    switchMap(() => this.store$.pipe(
      select(isAuth),
      first(),
      filter(isAdminAUth => isAdminAUth),
    )),
    switchMap(() => this.adminAuthService.refresh()),
    map((authData) => loginSuccess({authData})),
  ));
}
