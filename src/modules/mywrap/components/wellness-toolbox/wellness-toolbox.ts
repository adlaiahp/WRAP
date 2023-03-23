import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../providers/baseclass/baseclass';
import { Database } from '../../../../providers/database/database';
import { Icon } from '../../../../app/app.config';
import * as constant from '../../../../providers/constants/constants';
import * as template from '../../../../providers/email-template/email-template';
/**
 * Generated class for the WellnessToolboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wellness-toolbox',
  templateUrl: 'wellness-toolbox.html',
})
export class WellnessToolboxPage {
  toolList: any;
  items = [];
  binditems: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseClass: Baseclass,
    public database: Database,
    public events: Events) {
  }

  ionViewDidEnter() {
    this.listdata();
    this.listbindtooldata();
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }
  sendpage() {
    this.baseClass.displayAlert(" ", "Please enter an email address below", "Wellness");

  }
  addtool(q1) {
    this.navCtrl.push("AddtoolPage",{Q1:q1});
    this.menu.close();
  }
  listdata() {
    this.database.executeReader(constant. SELECT_WELLNESS_LIST).then((result) => {
      this.items = <Array<Object>>result;
      console.log("Q1",this.items);
      this.items.forEach(element => {
        element.IconAsset = element.IconId == null ? "" : Icon.ICONS.find(x => x.id == element.IconId).asset;
      });
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }
  listbindtooldata() {
    this.database.executeReader(constant.SELECT_WELLNESS_LIST).then((result) => {
      this.binditems = <Array<Object>>result;
      console.log("Q2",this.binditems);
      this.binditems.forEach(element => {
        element.IconAsset = element.IconId == null ? "" : Icon.ICONS.find(x => x.id == element.IconId).asset;
      });
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }
  updateTool(RowId, IconId,QId) {
    this.navCtrl.push("AddtoolPage", { rowid: RowId, iconId: IconId, QId: QId });
  }
}
