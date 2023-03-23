import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptableHospitalPage } from './acceptable-hospital';
import { ComponentsModule } from '../../../../../../components/components.module';

@NgModule({
  declarations: [
    AcceptableHospitalPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptableHospitalPage),
    ComponentsModule
  ],
})
export class AcceptableHospitalPageModule { }
