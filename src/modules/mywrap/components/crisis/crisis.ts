import { Component, Directive, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../providers/baseclass/baseclass';
import { Database } from '../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../providers/constants/constants';
import * as enums from '../../../../providers/enums/enums';

/**
 * Generated class for the CrisisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crisis',
  templateUrl: 'crisis.html',
})
@Directive({
  selector: 'ion-textarea[autosize]'
})
export class CrisisPage implements OnInit {
  pageNo: number = 1;
  items = [];
  maximumPage: number = 3;
  currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
  WhenWellDate = this.currentDate;
  isUpdateitem = false;
  isaddQ1item = false;
  ContentForm: FormGroup;
  isaddQ2item = false;
  isaddQ3item = false;
  isaddQ4item = false;
  isaddQ5item = false;
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    public events: Events,
    public element: ElementRef) {
    this.ContentForm = formBuilder.group({
      "Content": ['', Validators.compose([Validators.required])],
      "endangers": [''],
      "disagree": [''],
      "following": [''],
      "careof": [''],
      "decisions": ['']
    });
    this.baseclass.reloadData();
    this.events.subscribe("Tool:Save Completed", (data) => {
      if (data == "CrisisPage") {
        this.ListData();
      }
    });
    events.subscribe("Update:DailyItem", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateItem(data.Content, data.Id);
      }
      else {
        this.ListData();
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => this.adjust(), 0);
    this.GetCrisis();
  }
  GetCrisis() {
    this.database.executeReader(constant.SELECT_WHATISWRAP, []).then((result) => {
      let data = result;
      console.log("data", data);
      this.ContentForm.patchValue({
        endangers: data[0]["endangers"],
        disagree: data[0]["disagree"],
        following: data[0]["following"],
        careof: data[0]["careof"],
        decisions: data[0]["decisions"],
      })
    })
  }
  ionViewWillEnter() {
    this.Listdata();
  }
  ionViewDidLoad() {
    this.Listdata();
  }
  ionViewDidEnter() {
    this.baseclass.CheckCrisisTableExists().then((result) => {
      if (result == false) {
        this.database.TableManipulation("Crisis");
      }
      this.Listdata();
    });
    this.baseclass.CheckwhatisWrapTableExists().then((result) => {
      if (result == false) {
        this.database.TableManipulation("whatisWrap");
      }
      this.ListData();
    });
  }
  adjust(): void {
    let elementRef = this.element.nativeElement.getElementsByTagName('textarea');
    for (var n = 0; n < elementRef.length; n++) {
      elementRef[n].style.overflow = 'hidden';
      elementRef[n].style.height = 'auto';
      elementRef[n].style.height = elementRef[n].scrollHeight + "px";
    }
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "Crisis");
  }
  ToggleMultiInput(event) {
    console.log(event);
    event._elementRef.nativeElement.style.opacity = "1";
  }

  //For updating individual form fields
  UpdateItem(event, isDropDown = false) {
    event._elementRef.nativeElement.style.opacity = "0.4";
    let dynamicQuery = "UPDATE WHATISWRAP SET ";
    console.log("dquery", dynamicQuery);
    let columnName = !isDropDown ? event._ngControl.name : event._elementRef.nativeElement.id;
    console.log("cName", columnName);
    dynamicQuery = dynamicQuery + columnName + "= ?";
    console.log(dynamicQuery);
    let value = event.value;
    if (value == null) {
      value = "";
    }
    value = value.toString().trim();
    let params = [value];
    console.log("params", params)
    console.log(dynamicQuery);
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      console.log("res", result);
    }, (error) => {
      console.log("Error:", error);
    });
  }
  ToggleInputItem(event) {
    event._elementRef.nativeElement.style.opacity = "1";
  }
  Listdata() {
    let params = [enums.CrisisColumns.WhenWell, enums.Crisis.WhenWell];
    this.database.executeReader(constant.SELECT_CRISIS_LOOKUP, params).then((result) => {
      this.items = <Array<Object>>result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
    this.database.executeReader(constant.SELECT_WHENWELL, []).then((result) => {
      let data = <Array<Object>>result;
      console.log("data", data);
      if (data.length > 0) {
        var date = "";
        if (data[0]["WhenWellDate"] != null && data[0]["WhenWellDate"] != undefined)
          date = new Date(data[0]["WhenWellDate"]).getFullYear() + "-" + (((new Date(data[0]["WhenWellDate"]).getMonth() + 1) < 10) ? '0' : '') + (new Date(data[0]["WhenWellDate"]).getMonth() + 1) + "-" + (((new Date(data[0]["WhenWellDate"]).getDate() + 1) < 10) ? '0' : '') + (new Date(data[0]["WhenWellDate"]).getDate() + 1);
        console.log("whenweell", date);
        this.WhenWellDate = date != "" ? date : this.currentDate;
        console.log("whenweell", this.WhenWellDate);
      }
    });
  }

  onSelectChange(event) {
    console.log("event", event);
    console.log("WhenWellDate", this.WhenWellDate);
    event._elementRef.nativeElement.style.opacity = "0.4";
    let dynamicQuery = "UPDATE CrisisItem SET ";
    let columnName = "WhenWellDate";
    dynamicQuery = dynamicQuery + columnName + "= ?";
    let value = event._text;
    if (value == null) {
      value = "";
    }
    value = value.toString().trim();
    console.log("onselect", value);
    let params = [value];
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      console.log(result);
    }, (error) => {
      console.log("Error:", error);
    });

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
  ToggleQ4Input() {
    this.isaddQ4item = true;
  }
  ToggleQ5Input() {
    this.isaddQ5item = true;
  }
  InsertQ1Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem, QId];
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
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem, QId];
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
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem, QId];
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
  InsertQ4Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem, QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ4item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  InsertQ5Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem, QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ5item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  ListData() {
    let params = [enums.Page.DailyItem];
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
  DeleteQ4Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ4item = false;
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

  DeleteQ5Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ5item = false;
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
  navigateright() {
    if (this.pageNo < this.maximumPage) {
      ++this.pageNo;
    }
  }
  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }
  navigateleft() {
    if (this.pageNo > 1) {
      --this.pageNo;
    }
  }
}
