import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';
import * as enums from '../../../../../../providers/enums/enums';

/**
 * Generated class for the OthersHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-others-help',
  templateUrl: 'others-help.html',
})
export class OthersHelpPage {

  helpItem = [];
  isaddHelp = true;
  isaddNoHelp = true;
  DontHelp = [];
  OthersTask = [];
  isaddTask = true;
  insertedId = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    private events: Events) {
  }

  ionViewDidEnter() {
    this.GetTaskItems();
  }

  GetTaskItems(event: any = 0) {
    this.helpItem = [];
    this.DontHelp = [];
    this.OthersTask = [];
    this.database.executeReader(constant.SELECT_LOOKUP_THINGSHELP, []).then((result) => {
      let data = <Array<Object>>result;
      console.log("AddHelp", data);
      this.helpItem = data;
      this.ShowActiveFields(event);
    });
    this.database.executeReader(constant.SELECT_LOOKUP_THINGSDONTHELP, []).then((result) => {
      let data = <Array<Object>>result;
      console.log("DontHelp", data);
      this.DontHelp = data;
      this.ShowActiveFields(event);
    });
    this.database.executeReader(constant.SELECT_LOOKUP_OTHERS, []).then((result) => {
      let data = <Array<Object>>result;
      console.log("Task", data);
      this.OthersTask = data;
      this.ShowActiveFields(event);
    });
  }

  ShowActiveFields(event) {
    this.insertedId = 0;
    if (event != 0)
      switch (event.target.offsetParent.id) {
        case "helpAdd":
          this.isaddHelp = true;
          break;
        case "noHelpAdd":
          this.isaddNoHelp = true;
          break;
        case "taskAdd":
          this.isaddTask = true;
          break;
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
      case "AddHelp":
        this.isaddHelp = true;
        dynamicQuery = constant.UPDATE_LOOKUP_THINGSHELP + ColumnName + " = ? WHERE Id=?";
        break;
      case "AddNoHelp":
        this.isaddNoHelp = true;
        dynamicQuery = constant.UPDATE_LOOKUP_THINGSDONTHELP + ColumnName + " =? WHERE Id=?";
        break;
      case "AddTask":
        this.isaddTask = true;
        dynamicQuery = constant.UPDATE_LOOKUP_OTHERS + ColumnName + " =? WHERE Id=?";
        break;
    }
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
    });
  }

  AddMultiListItem(ListName: any): void {
    let dynamicQuery;
    switch (ListName) {
      case "AddHelp":
        this.isaddHelp = false;
        dynamicQuery = constant.INSERT_LOOKUP_THINGSHELP;
        break;
      case "AddNoHelp":
        this.isaddNoHelp = false;
        dynamicQuery = constant.INSERT_LOOKUP_THINGSDONTHELP;
        break;
      case "AddTask":
        this.isaddTask = false;
        dynamicQuery = constant.INSERT_LOOKUP_OTHERS;
        break;
    }
    this.database.executeNonQuery(dynamicQuery, []).then((result) => {
      let data = <Array<Object>>result;
      switch (ListName) {
        case "AddHelp":
          let newhelpData = { "Id": data["insertId"], "HelpName": "", "HelpPhone": "", "HelpEmail": "" };
          this.helpItem.push(newhelpData);
          break;
        case "AddNoHelp":
          let newNoHelpData = { "Id": data["insertId"], "NoHelpName": "", "NoHelpPhone": "", "NoHelpEmail": "" };
          this.DontHelp.push(newNoHelpData);
          break;
        case "AddTask":
          let newTaskData = { "Id": data["insertId"], "TaskName": "", "TaskPhone": "", "TaskEmail": "" };
          this.OthersTask.push(newTaskData);
          break;
      }
    });
    this.GetTaskItems();
  }

  DeleteMultiList(ListName, Id): void {
    let dynamicQuery;
    let params = [Id];
    switch (ListName) {
      case "AddHelp":
        this.isaddHelp = true;
        dynamicQuery = constant.DELETE_LOOKUP_THINGSHELP;
        break;
      case "AddNoHelp":
        this.isaddNoHelp = true;
        dynamicQuery = constant.DELETE_LOOKUP_THINGSDONTHELP;
        break;
      case "AddTask":
        this.isaddTask = true;
        dynamicQuery = constant.DELETE_LOOKUP_OTHERS;
        break;
    }
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      this.GetTaskItems();
    }, (error) => {
      console.log("Error :Crisis :OthersHelp :DeleteMultiList :" + ListName + ": ", error);
    });
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  navigateleft() {
    this.navCtrl.push("AcceptableHospitalPage");
  }

  navigateright() {
    this.navCtrl.push("PlanNotRequiredPage");
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "HelpOthers")
  }

}
