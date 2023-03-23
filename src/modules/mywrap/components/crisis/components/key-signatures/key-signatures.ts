import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the KeySignaturesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-key-signatures',
  templateUrl: 'key-signatures.html',
})
export class KeySignaturesPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController) {
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }
  navigateleft(){
    this.navCtrl.push("PlanNotRequiredPage");
  }
}
