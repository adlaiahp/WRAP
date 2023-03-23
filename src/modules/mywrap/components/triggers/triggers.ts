import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../providers/baseclass/baseclass';
import { Database } from '../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../providers/constants/constants';
import * as enums from '../../../../providers/enums/enums';
import { Icon } from '../../../../app/app.config';

/**
 * Generated class for the TriggersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-triggers',
  templateUrl: 'triggers.html',
})
export class TriggersPage {
  toolList: any;
  items=[];
  ContentForm: FormGroup;
  tools = [];
  subToolReferenceId = [];
  toolReferenceId = [];
  isUpdateitem = false;
  isaddQ1item= false;
  isaddQ3item=false;
  isaddQ2item=false;

  constructor(public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder) {
    this.ContentForm = formBuilder.group({
      "Content": ['', Validators.compose([Validators.required])],
    });
    this.baseclass.reloadData();
    this.events.subscribe("Tool:Save Completed", (data) => {
      if (data == "TriggersPage") {
        this.ListData();
      }
    });
    events.subscribe("Update:Triggers", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateItem(data.Content, data.Id);
      }
      else {
        this.ListData();
      }
    });
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  ionViewDidEnter() {
    this.ListData();
    //this.ListTool();
  }

  ToggleQ1Input() {
    this.isaddQ1item = true;
  }
  ToggleQ2Input() {
    this.isaddQ2item = true;
  }
  ToggleQ3Input() {
    this.isaddQ3item = true;
  }

  // ToggleMenu() {
  //   this.events.publish('menu:closed', '');
  //   this.menu.open("AddTool");
  // }

  InsertQ1Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.Triggers,QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ1item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  InsertQ2Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.Triggers,QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ2item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  InsertQ3Item(QId) {
    console.log(QId);
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.Triggers,QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ3item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  updateItem(Data, Id) {
    if (Data != null && Data != undefined && Data != "") {
      let params = [Data, Id, enums.Page.Triggers];
      this.database.executeNonQuery(constant.UPDATE_DISPLAYITEM, params).then((result) => {
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
    let params = [enums.Page.Triggers];
    this.database.executeReader(constant.SELECT_DISPLAYITEM, params).then((result) => {
      this.items = <Array<Object>>result;
      console.log(this.items);
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  DeleteQ1Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ1item = false;
    }
    else {
      let params = [Id];
      this.database.executeNonQuery(constant.DELETE_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ErrorDelete", error1);
      });
    }
    this.ListData();
  }
  DeleteQ2Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ2item = false;
    }
    else {
      let params = [Id];
      this.database.executeNonQuery(constant.DELETE_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ErrorDelete", error1);
      });
    }
    this.ListData();
  }
  DeleteQ3Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ3item = false;
    }
    else {
      let params = [Id];
      this.database.executeNonQuery(constant.DELETE_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ErrorDelete", error1);
      });
    }
    this.ListData();
  }

  // ListTool() {
  //   let params = [enums.Page.Triggers];
  //   this.subToolReferenceId = [];
  //   this.toolReferenceId = [];
  //   this.database.executeReader(constant.SELECT_REFERENCE, params).then((result) => {
  //     let data = <Array<Object>>result;
  //     if (data.length > 0) {
  //       let refe = data[0]['ReferenceId'];
  //       let selectToolQuery = constant.SELECT_TOOL + "(" + refe + ")";
  //       this.database.executeReader(selectToolQuery, []).then((result) => {
  //         this.tools = <Array<Object>>result;
  //         this.tools.forEach(element => {
  //           this.toolReferenceId.push(element.Id);
  //           element.IconAsset = element.IconId == null ? "" : Icon.ICONS.find(x => x.id == element.IconId).asset;
  //         });
  //       }, (error) => {
  //         console.log("Error:", error);
  //       });
  //     } else {
  //       this.tools = [];
  //     }
  //   },
  //     (error) => {
  //       console.log("Error:", error);
  //     });
  // }

  // DeleteTool(Id) {
  //   let pageType;
  //   let queryFilter;
  //   let referenceId;
  //   let params;
  //   pageType = enums.Page.Triggers;
  //   this.toolReferenceId.splice(this.toolReferenceId.indexOf(Id), 1);
  //   queryFilter = this.toolReferenceId.length >= 1 ? constant.UPDATE_TOOL : constant.DELETE_TOOL;
  //   referenceId = this.toolReferenceId.join(",");
  //   params = this.toolReferenceId.length >= 1 ? [referenceId, pageType] : [pageType];
  //   this.database.executeNonQuery(queryFilter, params).then((result) => {
  //   }, (error1) => {
  //     console.log("Error : Warning Signs  : DeleteTool", error1);
  //   });
  //   this.ListTool();
  // }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "Triggers");
  }
  
}
