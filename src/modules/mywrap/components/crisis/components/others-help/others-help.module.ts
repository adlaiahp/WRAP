import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OthersHelpPage } from './others-help';
import { ComponentsModule } from '../../../../../../components/components.module';

@NgModule({
  declarations: [
    OthersHelpPage,
  ],
  imports: [
    IonicPageModule.forChild(OthersHelpPage),
    ComponentsModule
  ],
})
export class OthersHelpPageModule {}
