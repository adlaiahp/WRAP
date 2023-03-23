import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeySignaturesPage } from './key-signatures';

@NgModule({
  declarations: [
    KeySignaturesPage,
  ],
  imports: [
    IonicPageModule.forChild(KeySignaturesPage),
  ],
})
export class KeySignaturesPageModule {}
