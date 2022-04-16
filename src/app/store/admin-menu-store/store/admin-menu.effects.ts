import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import { AdminMenuService } from '../services/admin-menu.service';
import {initMenu, initMenuFailure, initMenuSuccess} from './admin-menu.actions';
import {filter, map, switchMap, withLatestFrom, catchError} from 'rxjs/operators';
import {getLoading, getLoaded} from './admin-auth.selectors';
import {of} from 'rxjs';


@Injectable()
export class AdminMenuEffects  {

  constructor(
    private actions$: Actions,
    private adminMenuService: AdminMenuService,
    private store$: Store,
  ) {}



  saveAuthDataToLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(initMenu),
    withLatestFrom(
      this.store$.pipe(select(getLoaded)),
      this.store$.pipe(select(getLoading)),
    ),
    filter(([_, loaded, loading]) => !loaded && loading),
    switchMap(() => this.adminMenuService.getMenu().pipe(
      map(data => initMenuSuccess({data})),
      catchError((error) => of(
        initMenuFailure({serverError: error.serverError}),
      ))
    )),
  ));

}
