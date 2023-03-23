import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptableTreatmentPage } from './acceptable-treatment';
import { ComponentsModule } from '../../../../../../components/components.module';

@NgModule({
  declarations: [
    AcceptableTreatmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptableTreatmentPage),
    ComponentsModule
  ],
})
export class AcceptableTreatmentPageModule { }
