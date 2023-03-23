import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyMaintenancePage } from './daily-maintenance';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    DailyMaintenancePage
  ],
  imports: [
    IonicPageModule.forChild(DailyMaintenancePage),
    ComponentsModule
  ],
})
export class DailyMaintenancePageModule { }
