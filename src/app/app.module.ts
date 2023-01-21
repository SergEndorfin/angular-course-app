import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-GB" },
    { provide: 'Window', useValue: window }
  ],
  bootstrap: [AppComponent],
  exports: [
    // RouterModule
  ]
})
export class AppModule { }
