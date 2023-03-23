import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WrapBookstorePage } from './wrap-bookstore';

@NgModule({
  declarations: [
    WrapBookstorePage,
  ],
  imports: [
    IonicPageModule.forChild(WrapBookstorePage),
  ],
})
export class WrapBookstorePageModule {}
