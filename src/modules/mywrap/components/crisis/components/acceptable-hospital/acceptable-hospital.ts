import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';
import * as enums from '../../../../../../providers/enums/enums';

/**
 * Generated class for the AcceptableHospitalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acceptable-hospital',
  templateUrl: 'acceptable-hospital.html',
})
export class AcceptableHospitalPage {

  AcceptHospital = [];
  Hospital: FormGroup;
  isaddAcceptable = false;
  isUpdateitem = false;
  isaddUnacceptable = false;
  UnacceptHospital = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    public events: Events) {
    this.Hospital = formBuilder.group({
      "AcceptHospital": ['', Validators.compose([Validators.required])],
      "UnAcceptHospital": ['', Validators.compose([Validators.required])]
    });
    events.subscribe("Update:Crisis:AcceptableHospital", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateAcceptable(data.Content, data.Id);
      }
      else {
        this.ListAcceptHospital();
      }
    });
    events.subscribe("Update:Crisis:UnacceptableHospital", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateUnacceptable(data.Content, data.Id);
      }
      else {
        this.ListUnAcceptHospital();
      }
    });
  }

  ionViewDidEnter() {
    this.ListAcceptHospital();
    this.ListUnAcceptHospital();
  }

  // Functions For Acceptable Treatment

  ToggleInputAccept() {
    this.isaddAcceptable = true;
  }

  InsertAcceptable() {
    let data = this.Hospital.value.AcceptHospital;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != null && value != undefined && value != "") {
      let params = [value, enums.CrisisColumns.AcceptableHospital, enums.Crisis.Hospital];
      this.database.executeNonQuery(constant.INSERT_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListAcceptHospital();
    }
    else {
      this.isaddAcceptable = false;
    }
    this.Hospital["controls"]["AcceptHospital"].reset();
  }

  updateAcceptable(Data, Id) {
    if (Data != null && Data != undefined && Data != "") {
      let params = [Data, Id];
      this.database.executeNonQuery(constant.UPDATE_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListAcceptHospital();
    }
    else {
      this.isUpdateitem = false;
    }
  }

  ListAcceptHospital() {
    let params = [enums.CrisisColumns.AcceptableHospital, enums.Crisis.Hospital];
    this.database.executeReader(constant.SELECT_CRISIS_LOOKUP, params).then((result) => {
      this.AcceptHospital = <Array<Object>>result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }


  DeleteAcceptable(Id = 0) {
    if (Id == 0) {
      this.isaddAcceptable = false;
    }
    else {
      let params = [Id];
      this.database.executeNonQuery(constant.DELETE_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ErrorDelete", error1);
      });
    }
    this.ListAcceptHospital();
  }

  // Functions for UnAcceptable Treatment

  ToggleInputUnAccept() {
    this.isaddUnacceptable = true;
  }

  InsertUnacceptable() {
    let data = this.Hospital.value.UnAcceptHospital;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != null && value != undefined && value != "") {
      let params = [value, enums.CrisisColumns.UnacceptableHospital, enums.Crisis.Hospital];
      this.database.executeNonQuery(constant.INSERT_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListUnAcceptHospital();
    }
    else {
      this.isaddUnacceptable = false;
    }
    this.Hospital["controls"]["UnAcceptHospital"].reset();
  }

  updateUnacceptable(Data, Id) {
    if (Data != null && Data != undefined && Data != "") {
      let params = [Data, Id];
      this.database.executeNonQuery(constant.UPDATE_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListUnAcceptHospital();
    }
  }

  ListUnAcceptHospital() {
    let params = [enums.CrisisColumns.UnacceptableHospital, enums.Crisis.Hospital];
    this.database.executeReader(constant.SELECT_CRISIS_LOOKUP, params).then((result) => {
      this.UnacceptHospital = <Array<Object>>result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  DeleteUnacceptable(Id = 0) {
    if (Id == 0) {
      this.isaddUnacceptable = false;
    }
    else {
      let params = [Id];
      this.database.executeNonQuery(constant.DELETE_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ErrorDelete", error1);
      });
    }
    this.ListUnAcceptHospital();
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  navigateleft() {
    this.navCtrl.push("CommunityHomePage");
  }

  navigateright() {
    this.navCtrl.push("OthersHelpPage");
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "AcceptableHospital");
  }
}
