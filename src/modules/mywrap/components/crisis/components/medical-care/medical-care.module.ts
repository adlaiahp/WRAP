import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalCarePage } from './medical-care';
import { ComponentsModule } from '../../../../../../components/components.module';
@NgModule({
  declarations: [
    MedicalCarePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalCarePage),
    ComponentsModule
  ],
})
export class MedicalCarePageModule { }
