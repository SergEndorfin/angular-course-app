import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MinutesToHoursPipe } from './pipes/minutes-to-hours.pipe';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    COMPONENTS,
    MinutesToHoursPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    COMPONENTS,
    MinutesToHoursPipe
  ]
})
export class SharedModule { }
