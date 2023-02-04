import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './store/user.effects';
import * as fromUserStore from './store/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(
      fromUserStore.userFeatureKey,
      fromUserStore.userReducer
    ),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule { }