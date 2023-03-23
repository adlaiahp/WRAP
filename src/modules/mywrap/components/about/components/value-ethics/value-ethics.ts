import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the ValueEthicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-value-ethics',
  templateUrl: 'value-ethics.html',
})
export class ValueEthicsPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController) {
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }
}
