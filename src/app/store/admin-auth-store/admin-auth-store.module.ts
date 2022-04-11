import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {ADMIN_AUTH_FEATURE_NAME, adminAuthReducer} from './store/admin-auth.reducer';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AdminAuthEffects} from './store/admin-auth.effects';
import {EffectsModule} from '@ngrx/effects';
import {JwtModule} from '@auth0/angular-jwt';
import {AdminAuthInterceptor} from './interceptors/admin-auth.interceptor';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (request) => request as any,
      }
    }),
    StoreModule.forFeature(ADMIN_AUTH_FEATURE_NAME,
      adminAuthReducer),
    EffectsModule.forFeature([AdminAuthEffects])
  ],
  providers: [ // провайдер для перехвата запроса
    {
      provide: HTTP_INTERCEPTORS, // Injection token for the HTTP interceptor.
      useClass: AdminAuthInterceptor, // класс интерцептора SPI
      multi: true // мы внедряем массив интерцепторов
    }
  ]
})
export class AdminAuthStoreModule { }
