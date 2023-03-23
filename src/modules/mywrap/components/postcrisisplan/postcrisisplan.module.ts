import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostcrisisplanPage } from './postcrisisplan';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    PostcrisisplanPage,
  ],
  imports: [
    IonicPageModule.forChild(PostcrisisplanPage),
    ComponentsModule
  ],
})
export class PostcrisisplanPageModule {}
