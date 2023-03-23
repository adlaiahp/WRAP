import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityHomePage } from './community-home';

@NgModule({
  declarations: [
    CommunityHomePage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityHomePage),
  ],
})
export class CommunityHomePageModule {}
