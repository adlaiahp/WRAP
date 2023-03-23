import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostCrisisPage } from './post-crisis';
import { ComponentsModule } from '../../../../../../components/components.module';

@NgModule({
  declarations: [
    PostCrisisPage,
  ],
  imports: [
    IonicPageModule.forChild(PostCrisisPage),
    ComponentsModule
  ],
})
export class PostCrisisPageModule { }
