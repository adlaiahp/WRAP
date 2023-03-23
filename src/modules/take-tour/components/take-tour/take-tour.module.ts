import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakeTourPage } from './take-tour';

@NgModule({
  declarations: [
    TakeTourPage,
  ],
  imports: [
    IonicPageModule.forChild(TakeTourPage),
  ],
})
export class TakeTourPageModule {}
