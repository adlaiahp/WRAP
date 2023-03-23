import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriggersPage } from './triggers';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    TriggersPage
  ],
  imports: [
    IonicPageModule.forChild(TriggersPage),
    ComponentsModule
  ],
})
export class TriggersPageModule { }
