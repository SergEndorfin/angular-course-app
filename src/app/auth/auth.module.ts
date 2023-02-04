import { NgModule } from '@angular/core';
import * as fromAuthStore from './store/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(
      fromAuthStore.authFeatureKey,
      fromAuthStore.authReducer
    ),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule { }
