import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';
import * as enums from '../../../../../../providers/enums/enums';

/**
 * Generated class for the WhoTakesOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-who-takes-over',
  templateUrl: 'who-takes-over.html',
})
export class WhoTakesOverPage {

  isaddMul = true;
  careItems = []
  insertedId = 0;
  noCareItems = [];
  isaddNoCare = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    public event: Events) {
  }

  ionViewDidEnter() {
    this.GetTakesCare();
  }

  GetTakesCare(event: any = 0) {
    this.database.executeReader(constant.SELECT_LOOKUP_TAKESCARE, []).then((result) => {
      let data = <Array<Object>>result;
      this.careItems = data;
      this.ShowActiveFields(event);
    });
    this.database.executeReader(constant.SELECT_LOOKUP_NOT_TAKESCARE, []).then((result) => {
      let data = <Array<Object>>result;
      this.noCareItems = data;
      this.ShowActiveFields(event);
    });
  }

  ShowActiveFields(event) {
    this.insertedId = 0;
    if (event != 0)
      switch (event.target.offsetParent.id) {
        case "careAdd":
          this.isaddMul = true;
          break;
        case "noCareAdd":
          this.isaddNoCare = true;
      }
  }

  ToggleMultiInput(event) {
    event._elementRef.nativeElement.style.opacity = "1";
  }

  ToggleMultiUpdate(event: any, ListName: any, ColumnName: any, Id: any): void {
    let dynamicQuery;
    let params = [event.value, Id];
    event._elementRef.nativeElement.style.opacity = "0.4";
    switch (ListName) {
      case "AddCare":
        this.isaddMul = true;
        dynamicQuery = constant.UPDATE_LOOKUP_TAKESCARE + ColumnName + " = ? WHERE Id=?";
        break;
      case "NoAddCare":
        this.isaddNoCare = true;
        dynamicQuery = constant.UPDATE_LOOKUP_NOT_TAKESCARE + ColumnName + " = ? WHERE Id=?";
        break;
    }
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
    });
  }

  AddMultiListItem(ListName: any): void {
    let dynamicQuery;
    switch (ListName) {
      case "AddCare":
        this.isaddMul = false;
        dynamicQuery = constant.INSERT_LOOKUP_TAKESCARE;
        break;
      case "NoAddCare":
        this.isaddNoCare = false;
        dynamicQuery = constant.INSERT_LOOKUP_NOT_TAKESCARE;
    }
    this.database.executeNonQuery(dynamicQuery, []).then((result) => {
      let data = <Array<Object>>result;
      switch (ListName) {
        case "AddCare":
          let newCaseData = { "Id": data["insertId"], "CareName": "", "CarePhone": "", "CareMail": "" };
          this.careItems.push(newCaseData);
          break;
        case "NoAddCare":
          let newNoCareData = { "Id": data["insertId"], "NoCareName": "", "NoCarePhone": "", "NoCareMail": "" };
          this.noCareItems.push(newNoCareData);
          break;
      }
    });
    this.GetTakesCare();
  }

  DeleteMultiList(ListName, Id): void {
    let params = [Id];
    let dynamicQuery;
    switch (ListName) {
      case "AddCare":
        dynamicQuery = constant.DELETE_LOOKUP_TAKESCARE;
        this.isaddMul = true;
        break;
      case "NoAddCare":
        dynamicQuery = constant.DELETE_LOOKUP_NOT_TAKESCARE;
        this.isaddNoCare = true;
        break;
    }
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      this.GetTakesCare();
    }, (error) => {
      console.log("Error Delete Takes Care", error);
    });
  }

  ToggleRemove(event) {
    this.insertedId = 0;
    switch (event.currentTarget.id) {
      case "careRemove":
        this.isaddMul = false;
        break;
    }
  }

  ToggleMulInput() {
    this.isaddMul = true;
  }

  ToggleMulRemove() {
    this.isaddMul = false;
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  navigateleft() {
    this.navCtrl.push("MySupportersPage");
  }

  navigateright() {
    this.navCtrl.push("MedicalCarePage");
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "WhoTakesCare");
  }
}
