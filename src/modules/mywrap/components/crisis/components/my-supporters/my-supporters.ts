import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';
import * as enums from '../../../../../../providers/enums/enums';

/**
 * Generated class for the MySupportersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-supporters',
  templateUrl: 'my-supporters.html',
})
export class MySupportersPage {

  items = [];
  ContentForm: FormGroup;
  isadditem = false;
  isUpdateitem = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    public events: Events) {
    this.ContentForm = formBuilder.group({
      "Content": ['', Validators.compose([Validators.required])],
    });
    events.subscribe("Update:Crisis:MySupporters", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateItem(data.Content, data.Id);
      }
      else {
        this.ListData();
      }
    });
  }

  ionViewDidEnter() {
    this.ListData();
  }

  InsertItem() {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != null && value != undefined && value != "") {
      let params = [value, enums.CrisisColumns.MySupporters, enums.Crisis.MySupporters];
      this.database.executeNonQuery(constant.INSERT_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isadditem = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }

  updateItem(Data, Id) {
    if (Data != null && Data != undefined && Data != "") {
      let params = [Data, Id];
      this.database.executeNonQuery(constant.UPDATE_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isUpdateitem = false;
    }
  }

  ListData() {
    let params = [enums.CrisisColumns.MySupporters, enums.Crisis.MySupporters];
    this.database.executeReader(constant.SELECT_CRISIS_LOOKUP, params).then((result) => {
      this.items = <Array<Object>>result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }


  DeleteItem(Id = 0) {
    if (Id == 0) {
      this.isadditem = false;
    }
    else {
      let params = [Id];
      this.database.executeNonQuery(constant.DELETE_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ErrorDelete", error1);
      });
    }
    this.ListData();
  }

  ToggleInput() {
    this.isadditem = true;
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  navigateleft() {
    this.navCtrl.push("WhenWellPage");
  }

  navigateright() {
    this.navCtrl.push("WhoTakesOverPage");
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "Mysupporter");
  }

}
