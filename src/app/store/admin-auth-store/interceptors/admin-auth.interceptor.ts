import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import {Store, select} from '@ngrx/store';
import { getAccessToken } from '../store/admin-auth.selectors';
import {first, flatMap, catchError} from 'rxjs/operators';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {

  constructor(
    private adminAuthService: AdminAuthService,
    private store$: Store
  ) {}

  intercept(request: HttpRequest<unknown>,
            next: HttpHandler): Observable<HttpEvent<unknown>> {
   return this.store$.pipe(
     select(getAccessToken),
     first(),
     flatMap(token => {
       const authRequest = token !== null ? request.clone({
         setHeaders: {
           Authorization: `Bearer ${token}`
         }
       }) : request;
       return next.handle(authRequest).pipe(
         catchError((err) => {
           if (err instanceof HttpErrorResponse) {
             if (err.status === 401) {
               console.log('redirect on login page or sign out');
               return EMPTY;
             }
           }
           throw err;
         }),
       );
     })
   );
  }
}
