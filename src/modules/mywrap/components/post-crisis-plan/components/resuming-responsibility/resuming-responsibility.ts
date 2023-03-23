import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';

/**
 * Generated class for the ResumingResponsibilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resuming-responsibility',
  templateUrl: 'resuming-responsibility.html',
})
export class ResumingResponsibilityPage {

  isaddRes = false;
  isaddPlan = false;
  resumeItems = [];
  isResume = true;
  isLookUp = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database) {

  }

  ionViewDidEnter() {
    this.GetResume();
  }

  GetResume() {
    this.database.executeReader(constant.SELECT_RESUME_RESPONSIBILITY, []).then(result => {
      this.resumeItems = <Array<Object>>result;
      this.resumeItems.forEach(element => {
        let resumeId = element.Id;
        this.database.executeReader(constant.SELECT_LOOKUP_RESPONSIBILITY, [resumeId]).then(result => {
          let lookUpData = <Array<Object>>result;
          element.lookup = lookUpData.length > 0 ? lookUpData : [];
        });
      });
    });
  }

  ToggleMultiInput(event) {
    event._elementRef.nativeElement.style.opacity = "1";
  }

  //Fake inserting single list data
  AddSingleListItem(ResumeId: any) {
    let singleListData = { "Id": 0, "Content": "", "ResumeId": ResumeId };
    let index = this.resumeItems.findIndex(x => x.Id == ResumeId);
    this.resumeItems[index].lookup.push(singleListData);
  }

  //Insert /Update Single list data
  UpdateSingleList(event: any, ResumeId: any, Id: any): void {
    event._elementRef.nativeElement.style.opacity = "0.4";
    let params;
    let dynamicQuery;
    if (Id == 0) {
      dynamicQuery = constant.INSERT_LOOKUP_RESPONSIBILITY;
      params = [event.value, ResumeId];
    } else {
      dynamicQuery = constant.UPDATE_LOOKUP_RESPONSIBILITY;
      params = [event.value, Id];
    }
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      this.GetResume();
    });
  }

  //Deleting single list data
  DeleteSingleList(Id: any): void {
    let params = [Id];
    this.database.executeNonQuery(constant.DELTE_LOOKUP_RESPONSIBILITY, params).then((result) => {
      this.GetResume();
    })
  }

  //Inserting multilist data
  AddMultiListItem() {
    this.isResume = false;
    this.database.executeNonQuery(constant.INSERT_RESUME_RESPONSIBILITY, []).then((result) => {
      let data = <Array<Object>>result;
      let insertedId = data["insertId"];
      this.resumeItems.push({ "Id": insertedId, "Responsibility": "", "DoingCrisis": "", "WhileResuming": "", "ToResponsibility": "", "lookup": [] });
    })
  }

  //Updating multilist data
  ToggleMultiUpdate(event: any, columnName: any, Id: any): void {
    this.isResume = true;
    event._elementRef.nativeElement.style.opacity = "0.4";
    let params = [event.value, Id];
    let dynamicQuery = constant.UPDATE_RESUME_RESPONSIBILITY + columnName + " = ? WHERE Id=?";
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {

    });
  }

  //Deleting multilist data
  DeleteMultiList(Id: any): void {
    let params = [Id];
    this.database.executeNonQuery(constant.DELETE_RESUME_RESPONSIBILITY, params).then((result) => {
      this.GetResume();
    });
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "ResumeResponsibility");
  }
}

