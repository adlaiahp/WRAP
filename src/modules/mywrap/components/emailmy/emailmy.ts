import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Baseclass } from '../../../../providers/baseclass/baseclass';

/**
 * Generated class for the EmailmyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emailmy',
  templateUrl: 'emailmy.html',
})
export class EmailmyPage {
  menu: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public baseclass:Baseclass) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailmyPage');
  }
  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  sendpage(emailTo) {
    this.baseclass.SendWrapEmail(emailTo);
  }
}
