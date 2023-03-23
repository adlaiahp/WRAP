import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrisisPage } from './crisis';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    CrisisPage,
  ],
  imports: [
    IonicPageModule.forChild(CrisisPage),
    ComponentsModule
  ],
})
export class CrisisPageModule {}
