import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';
import * as enums from '../../../../../../providers/enums/enums';

@IonicPage()
@Component({
  selector: 'page-when-well',
  templateUrl: 'when-well.html',
})
export class WhenWellPage {

  items = [];
  notWellItems = [];
  ContentForm: FormGroup;
  isadditem = false;
  isaddnotwell = false;
  isUpdateitem = false;
  currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
  WhenWellDate = this.currentDate;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    public events: Events) {
    this.ContentForm = formBuilder.group({
      "Content": ['', Validators.compose([Validators.required])],
      "WhenNotWell": ['', Validators.compose([Validators.required])
      ]
    });
    events.subscribe("Update:Crisis:WhenWell", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateItem(data.Content, data.Id);
      }
      else {
        this.ListData();
      }
    });
    events.subscribe("Update:Crisis:WhenNotWell", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateItem(data.Content, data.Id);
      } else {
        this.ListNotwellData();
      }
    });
  }

  ionViewDidEnter() {
    this.baseclass.CheckCrisisTableExists().then((result) => {
      if (result == false) {
        this.database.TableManipulation("Crisis");
      }
      this.ListData();
      this.ListNotwellData();
    });
  }

  ToggleInput() {
    this.isadditem = true;
  }

  ToggleNotWellInput() {
    this.isaddnotwell = true;
  }

  ToggleInputItem(event) {
    event._elementRef.nativeElement.style.opacity = "1";
  }

  onSelectChange(event) {
    event._elementRef.nativeElement.style.opacity = "0.4";
    let dynamicQuery = "UPDATE CrisisItem SET ";
    let columnName = "WhenWellDate";
    dynamicQuery = dynamicQuery + columnName + "= ?";
    let value = event._text;
    if (value == null) {
      value = "";
    }
    value = value.toString().trim();
    let params = [value];
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      console.log("ex",result);
    }, (error) => {
      console.log("Error:", error);
    });

  }

  InsertItem() {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.CrisisColumns.WhenWell, enums.Crisis.WhenWell];
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
    let params = [enums.CrisisColumns.WhenWell, enums.Crisis.WhenWell];
    this.database.executeReader(constant.SELECT_CRISIS_LOOKUP, params).then((result) => {
      this.items = <Array<Object>>result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
    this.database.executeReader(constant.SELECT_WHENWELL, []).then((result) => {
      let data = <Array<Object>>result;
      console.log("listdata",data);
      if (data.length > 0) {
        var date = "";
        if (data[0]["WhenWellDate"] != null && data[0]["WhenWellDate"] != undefined)
          date = new Date(data[0]["WhenWellDate"]).getFullYear() + "-" + (new Date(data[0]["WhenWellDate"]).getMonth() + 1) + "-" + new Date(data[0]["WhenWellDate"]).getDate();
          console.log(date);
        this.WhenWellDate = date != "" ? date : this.currentDate;
        console.log(this.WhenWellDate);
      }
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

  ListNotwellData() {
    let params = [enums.CrisisColumns.WhenNotWell, enums.Crisis.WhenWell];
    this.database.executeReader(constant.SELECT_CRISIS_LOOKUP, params).then((result) => {
      this.notWellItems = <Array<Object>>result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
    this.database.executeReader(constant.SELECT_WHENWELL, []).then((result) => {
      let data = <Array<Object>>result;
    });
  }

  InsertNotWellItem() {
    let data = this.ContentForm.value.WhenNotWell;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.CrisisColumns.WhenNotWell, enums.Crisis.WhenWell];
      this.database.executeNonQuery(constant.INSERT_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListNotwellData();
    }
    else {
      this.isaddnotwell = false;
    }
    this.ContentForm["controls"]["WhenNotWell"].reset();
  }

  DeleteNotWellItem(Id = 0) {
    if (Id == 0) {
      this.isaddnotwell = false;
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

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  navigateright() {
    this.navCtrl.push("MySupportersPage");
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "WhenWell")
  }
}
