import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhoTakesOverPage } from './who-takes-over';
import { ComponentsModule } from '../../../../../../components/components.module';

@NgModule({
  declarations: [
    WhoTakesOverPage,
  ],
  imports: [
    IonicPageModule.forChild(WhoTakesOverPage),
    ComponentsModule
  ],
})
export class WhoTakesOverPageModule {}
