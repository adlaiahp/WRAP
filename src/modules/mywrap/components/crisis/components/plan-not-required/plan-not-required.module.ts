import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanNotRequiredPage } from './plan-not-required';
import { ComponentsModule } from '../../../../../../components/components.module';

@NgModule({
  declarations: [
    PlanNotRequiredPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanNotRequiredPage),
    ComponentsModule
  ],
})
export class PlanNotRequiredPageModule {}
