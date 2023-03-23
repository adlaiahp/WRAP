import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySupportersPage } from './my-supporters';
import { ComponentsModule } from '../../../../../../components/components.module';

@NgModule({
  declarations: [
    MySupportersPage,
  ],
  imports: [
    IonicPageModule.forChild(MySupportersPage),
    ComponentsModule
  ],
})
export class MySupportersPageModule {}
