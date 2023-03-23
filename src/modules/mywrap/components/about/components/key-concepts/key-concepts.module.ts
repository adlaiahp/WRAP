import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeyConceptsPage } from './key-concepts';

@NgModule({
  declarations: [
    KeyConceptsPage,
  ],
  imports: [
    IonicPageModule.forChild(KeyConceptsPage),
  ],
})
export class KeyConceptsPageModule {}
