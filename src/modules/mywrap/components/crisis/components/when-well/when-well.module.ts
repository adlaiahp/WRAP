import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhenWellPage } from './when-well';
import { ComponentsModule } from '../../../../../../components/components.module';

@NgModule({
  declarations: [
    WhenWellPage,
  ],
  imports: [
    IonicPageModule.forChild(WhenWellPage),
    ComponentsModule
  ],
})
export class WhenWellPageModule { }
