import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';
import * as enums from '../../../../../../providers/enums/enums';

/**
 * Generated class for the AcceptableTreatmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acceptable-treatment',
  templateUrl: 'acceptable-treatment.html',
})
export class AcceptableTreatmentPage {

  AcceptTreatment = [];
  Treatment: FormGroup;
  isaddAcceptable = false;
  isUpdateitem = false;
  isaddUnacceptable = false;
  UnacceptTreatment = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    public events: Events) {
    this.Treatment = formBuilder.group({
      "AcceptTreatment": ['', Validators.compose([Validators.required])],
      "UnAcceptTreatment": ['', Validators.compose([Validators.required])]
    });
    events.subscribe("Update:Crisis:AcceptTreatment", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateAcceptable(data.Content, data.Id);
      }
      else {
        this.ListAcceptTreatment();
      }
    });
    events.subscribe("Update:Crisis:UnacceptTreatment", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateUnacceptable(data.Content, data.Id);
      }
      else {
        this.ListUnAcceptTreatment();
      }
    });
  }

  ionViewDidEnter() {
    this.ListAcceptTreatment();
    this.ListUnAcceptTreatment();
  }

  // Functions For Acceptable Treatment

  ToggleInputAccept() {
    this.isaddAcceptable = true;
  }

  InsertAcceptable() {
    let data = this.Treatment.value.AcceptTreatment;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != null && value != undefined && value != "") {
      let params = [value, enums.CrisisColumns.AcceptableTreatment, enums.Crisis.Treatment];
      this.database.executeNonQuery(constant.INSERT_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListAcceptTreatment();
    }
    else {
      this.isaddAcceptable = false;
    }
    this.Treatment["controls"]["AcceptTreatment"].reset();
  }

  updateAcceptable(Data, Id) {
    if (Data != null && Data != undefined && Data != "") {
      let params = [Data, Id];
      this.database.executeNonQuery(constant.UPDATE_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListAcceptTreatment();
    }
    else {
      this.isUpdateitem = false;
    }
  }

  ListAcceptTreatment() {
    let params = [enums.CrisisColumns.AcceptableTreatment, enums.Crisis.Treatment];
    this.database.executeReader(constant.SELECT_CRISIS_LOOKUP, params).then((result) => {
      this.AcceptTreatment = <Array<Object>>result;
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
    this.ListAcceptTreatment();
  }

  // Functions for UnAcceptable Treatment

  ToggleInputUnAccept() {
    this.isaddUnacceptable = true;
  }

  InsertUnacceptable() {
    let data = this.Treatment.value.UnAcceptTreatment;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != null && value != undefined && value != "") {
      let params = [value, enums.CrisisColumns.UnacceptableTreatment, enums.Crisis.Treatment];
      this.database.executeNonQuery(constant.INSERT_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListUnAcceptTreatment();
    }
    else {
      this.isaddUnacceptable = false;
    }
    this.Treatment["controls"]["UnAcceptTreatment"].reset();
  }

  updateUnacceptable(Data, Id) {
    if (Data != null && Data != undefined && Data != "") {
      let params = [Data, Id];
      this.database.executeNonQuery(constant.UPDATE_CRISIS_LOOKUP, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListUnAcceptTreatment();
    }
  }

  ListUnAcceptTreatment() {
    let params = [enums.CrisisColumns.UnacceptableTreatment, enums.Crisis.Treatment];
    this.database.executeReader(constant.SELECT_CRISIS_LOOKUP, params).then((result) => {
      this.UnacceptTreatment = <Array<Object>>result;
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
    this.ListUnAcceptTreatment();
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  navigateleft() {
    this.navCtrl.push("MedicalCarePage");
  }

  navigateright() {
    this.navCtrl.push("CommunityHomePage");
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "AcceptableTreatment");
  }

}
