import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EarlyWarningSignsPage } from './early-warning-signs';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    EarlyWarningSignsPage
  ],
  imports: [
    IonicPageModule.forChild(EarlyWarningSignsPage),
    ComponentsModule
  ],
})
export class EarlyWarningSignsPageModule { }
