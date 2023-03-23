import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatisWrapPage } from './whatis-wrap';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    WhatisWrapPage,
  ],
  imports: [
    IonicPageModule.forChild(WhatisWrapPage),
    ComponentsModule
  ],
})
export class WhatisWrapPageModule {}
