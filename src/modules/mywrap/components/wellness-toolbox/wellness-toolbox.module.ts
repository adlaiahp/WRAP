import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WellnessToolboxPage } from './wellness-toolbox';

@NgModule({
  declarations: [
    WellnessToolboxPage,
  ],
  imports: [
    IonicPageModule.forChild(WellnessToolboxPage),
  ],
})
export class WellnessToolboxPageModule {}
