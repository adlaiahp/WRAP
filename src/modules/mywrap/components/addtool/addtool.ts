import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Icon } from '../../../../app/app.config';
import { Database } from '../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../providers/constants/constants';
import { Baseclass } from '../../../../providers/baseclass/baseclass';

/**
 * Generated class for the AddtoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtool',
  templateUrl: 'addtool.html',
})
export class AddtoolPage {

  items: any;
  rowid: any;
  iconId: any;
  isDelete = false;
  wellnessContent: any;
  ContentForm: FormGroup;
  data = [];
  fileData = [];
  cont: void;
  buttonDisabled: boolean = false;
  selectedItem: any;
  active: any;
  isAddIcon = false;
  blurDiv = false;
  selectedIcon = 0;
  Q1: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public database: Database,
    public formBuilder: FormBuilder,
    public baseclass: Baseclass,
    public event: Events) {
    this.items = Icon.ICONS;
    this.ContentForm = formBuilder.group({
      "Content": ['', Validators.compose([Validators.requiredTrue])]
    });
    this.Q1= this.navParams.get("Q1");
    console.log(this.Q1);
  }


  ionViewDidEnter() {
    this.rowid = this.navParams.get('rowid');
    if (this.rowid != null && this.rowid != undefined) {
      this.isDelete = true;
      let iconId = this.navParams.get('iconId');
      if (iconId != "") {
        this.selectedIcon = iconId;
        this.blurDiv = true;
        this.iconId = this.selectedIcon;
      }
      this.GetWellnessTool(this.rowid);
    }
  }

  //To bind the content 

  GetWellnessTool(rowid) {
    let params = [rowid];
    this.database.executeReader(constant.SELECT_WELLNESS, params).then((result) => {
      this.data = <Array<Object>>result;
      this.setUpView(this.data[0]);
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  setUpView(data) {
    this.cont = data['Content'];
    this.ContentForm.controls['Content'].setValue(this.cont);
  }

  // Save the data

  Save() {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != "" && value != null && value != undefined) {
      if (this.rowid == null && this.rowid == undefined) {
        let params = [value, this.iconId,this.Q1];
        console.log(this.Q1);
        this.database.executeNonQuery(constant.INSERT_WELLNESS, params).then((result) => {
        }, (error1) => {
          console.log("ERROR: ", error1);
        });
      }
      else {
        let params = [value, this.iconId, this.rowid];
        this.database.executeNonQuery(constant.UPDATE_WELLNESS, params).then((result) => {
        }, (error1) => {
          console.log("ERROR: ", error1);
        });
      }
      this.baseclass.reloadData();
    }
    else {
      this.menu.close();
    }
    this.navCtrl.push("WellnessToolboxPage");
  }

  // Delete the data

  DeleteTool() {
    let params = [this.rowid];
    this.database.executeNonQuery(constant.DELETE_WELLNESS, params).then((result) => {
      this.navCtrl.push("WellnessToolboxPage");
    }, (error1) => {
      console.log("ErrorDelete", error1);
    });
  }

  // Homepage navigation

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  // Cancel 

  Cancel() {
    this.navCtrl.pop();
  }

  SelectIcon(iconSelected) {
    if (this.selectedIcon == 0 && iconSelected > 0) {
      this.selectedIcon = iconSelected;
      this.blurDiv = true;
      this.iconId = iconSelected;
    }
    else {
      this.selectedIcon = 0;
      this.blurDiv = false;
      this.iconId = 0;
    }
  }
}
