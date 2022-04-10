import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {ADMIN_AUTH_FEATURE_NAME, adminAuthReducer} from './store/admin-auth.reducer';
import {HttpClientModule} from '@angular/common/http';
import {AdminAuthEffects} from './store/admin-auth.effects';
import {EffectsModule} from '@ngrx/effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(ADMIN_AUTH_FEATURE_NAME,
      adminAuthReducer),
    EffectsModule.forFeature([AdminAuthEffects])
  ]
})
export class AdminAuthStoreModule { }
