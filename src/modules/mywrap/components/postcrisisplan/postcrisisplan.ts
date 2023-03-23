import { Component,Directive,OnInit, HostListener,ElementRef } from '@angular/core';
import { IonicPage,AlertController,NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../providers/baseclass/baseclass';
import { Database } from '../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import * as constant from '../../../../providers/constants/constants';
import * as enums from '../../../../providers/enums/enums';
import { Icon } from '../../../../app/app.config';
/**
 * Generated class for the PostcrisisplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postcrisisplan',
  templateUrl: 'postcrisisplan.html',
})
@Directive({
  selector: 'ion-textarea[autosize]'
})
export class PostcrisisplanPage implements OnInit {
  toolList: any;
  items = [];
  ContentForm: FormGroup;
  isaddmyGoalsitem = false;
  isaddstayWellitem = false;
  tools = [];
  subTools = [];
  toolReferenceId = [];
  subToolReferenceId = [];
  isUpdateitem = false;
  isUpdatestayWellitem =false;
  isUpdatemyGoalsitem= false;
  myGoalsitems: Object[];
  stayWellitems: Object[];
  isaddQ1item= false;
  isaddQ3item=false;
  isaddQ2item=false;
  isaddQ4item = false;
  isaddQ5item = false;
  isaddQ6item = false;
  isaddQ7item = false;
  isaddQ8item = false;
  isaddQ9item = false;
  isaddQ10item = false;
  pageNo: number = 1;
  maximumPage: number = 4;
  insertedId = 0;
  peopleThankItems = [];
  isAddThank = true;
  apologizeItems = [];
  isAddApologize = true;
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    public events: Events,
    public element: ElementRef) {

    this.ContentForm = formBuilder.group({
      "Content": [''],
      "FeelRecovered":[''],
      "LearnInCrisis":[''],
      "LifeStyle":[''],
      "OutOfCrisis":[''],
      "PreventRepercussion":[''],
      "thank":[''],
      "apologize":['']
    });
    this.baseclass.reloadData();
    this.events.subscribe("Tool:Save Completed", (data) => {
      if (data == "PostcrisisplanPage") {
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
    this.GetPostCrisis();
  }
  ionViewDidEnter() {
    this.ListData();
  }
  ionViewDidLoad() {
    this.baseclass.CheckPostCrisisTableExists().then((result) => {
      if (result == false) {
        this.database.TableManipulation("PostCrisis");
      }
    });
  }
  GetPostCrisis(event: any = 0) {
    this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
      let data = <Array<Object>>result;
      console.log("data",data);
      this.ContentForm.patchValue({
        FeelRecovered: data[0]["FeelRecovered"],
        LifeStyle: data[0]["LifeStyle"],
        LearnInCrisis: data[0]["LearnInCrisis"],
        OutOfCrisis: data[0]["OutOfCrisis"],
        PreventRepercussion: data[0]["PreventRepercussion"],
        thank: data[0]["thank"],
        apologize: data[0]["apologize"]
      });
      // this.database.executeReader(constant.SELECT_LOOKUP_PEOPLE_THANK, []).then((result) => {
      //   let data = <Array<Object>>result;
      //   this.peopleThankItems = data;
      //   this.ShowActiveFields(event);
      // });
      // this.database.executeReader(constant.SELECT_LOOKUP_APOLOGIZE, []).then((result) => {
      //   let data = <Array<Object>>result;
      //   this.apologizeItems = data;
      //   this.ShowActiveFields(event);
      // });
    });
  }
  // ShowActiveFields(event) {
  //   this.insertedId = 0;
  //   if (event != 0)
  //     switch (event.target.offsetParent.id) {
  //       case "thankAdd":
  //         this.isAddThank = true;
  //         break;
  //       case "ApologizeAdd":
  //         this.isAddApologize = true;
  //         break;
  //     }
  // }
  adjust(): void {
    let elementRef = this.element.nativeElement.getElementsByTagName('textarea');
    for (var n = 0; n < elementRef.length; n++) {
      elementRef[n].style.overflow = 'hidden';
      elementRef[n].style.height = 'auto';
      elementRef[n].style.height = elementRef[n].scrollHeight + "px";
    }
  }
  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
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
  ToggleQ6Input() {
    this.isaddQ6item = true;
  }
  ToggleQ7Input() {
    this.isaddQ7item = true;
  }
  ToggleQ8Input() {
    this.isaddQ8item = true;
  }
  ToggleQ9Input() {
    this.isaddQ9item = true;
  }
  ToggleQ10Input() {
    this.isaddQ10item = true;
  }
  
 
  ToggleUpdate() {
    this.isUpdateitem = true;
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
      let params = [value, enums.Page.DailyItem,QId];
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
      let params = [value, enums.Page.DailyItem,QId];
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
  ToggleMultiInput(event) {
    console.log(event);
    event._elementRef.nativeElement.style.opacity = "1";
  }

  //For updating individual form fields
  UpdateItem(event, isDropDown = false) {
    event._elementRef.nativeElement.style.opacity = "0.4";
    let dynamicQuery = "UPDATE PostCrisis SET ";
    console.log("dquery",dynamicQuery);
    let columnName = !isDropDown ? event._ngControl.name : event._elementRef.nativeElement.id;
    console.log("cName",columnName);
    dynamicQuery = dynamicQuery + columnName + "= ?";
    console.log(dynamicQuery);
    let value = event.value;
    if (value == null) {
      value = "";
    }
    value = value.toString().trim();
    let params = [value];
    console.log("params",params)
    console.log(dynamicQuery);
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      console.log("res",result);
    }, (error) => {
      console.log("Error:", error);
    });
  }
  // ToggleMultiUpdate(event: any, ListName: any, ColumnName: any, Id: any): void {
  //   let dynamicQuery;
  //   let params = [event.value, Id];
  //   event._elementRef.nativeElement.style.opacity = "0.4";
  //   switch (ListName) {
  //     case "AddThank":
  //       this.isAddThank = true;
  //       dynamicQuery = constant.UPDATE_LOOKUP_PEOPLE_THANK + ColumnName + " =? WHERE Id=?";
  //       break;
  //     case "AddApologize":
  //       this.isAddApologize = true;
  //       dynamicQuery = constant.UPDATE_LOOKUP_APOLOGIZE + ColumnName + " =? WHERE Id=?";
  //       break;
  //   }
  //   this.database.executeNonQuery(dynamicQuery, params).then((result) => {
  //   });
  // }

  // AddMultiListItem(ListName: any): void {
  //   let dynamicQuery;
  //   switch (ListName) {
  //     case "AddThank":
  //       this.isAddThank = false;
  //       dynamicQuery = constant.INSERT_LOOKUP_PEOPLE_THANK;
  //       break;
  //     case "AddApologize":
  //       this.isAddApologize = false;
  //       dynamicQuery = constant.INSERT_LOOKUP_APOLOGIZE;
  //       break;
  //   }
  //   this.database.executeNonQuery(dynamicQuery, []).then((result) => {
  //     let data = <Array<Object>>result;
  //     switch (ListName) {
  //       case "AddThank":
  //         let newThankData = { "Id": data["insertId"], "PeopleName": "", "WhenThank": "", "HowThank": "" };
  //         this.peopleThankItems.push(newThankData);
  //         break;
  //       case "AddApologize":
  //         let newApologizeData = { "Id": data["insertId"], "ApologizeName": "", "WhenApologize": "", "HowApologize": "" };
  //         this.apologizeItems.push(newApologizeData);
  //         break;
  //     }
  //   });
  //   this.GetPostCrisis();}
  InsertQ3Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem,QId];
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
      let params = [value, enums.Page.DailyItem,QId];
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
      let params = [value, enums.Page.DailyItem,QId];
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
  InsertQ6Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem,QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ6item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  InsertQ7Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem,QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ7item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  InsertQ8Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem,QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ8item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  InsertQ9Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem,QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ10item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  InsertQ10Item(QId) {
    let data = this.ContentForm.value.Content;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    console.log(QId);
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.DailyItem,QId];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.ListData();
    }
    else {
      this.isaddQ10item = false;
    }
    this.ContentForm["controls"]["Content"].reset();
  }
  updateItem(Data, Id) {
    if (Data != null && Data != undefined && Data != "") {
      let params = [Data, Id, enums.Page.DailyItem];
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
  DeleteQ6Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ6item = false;
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
  DeleteQ7Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ7item = false;
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
  DeleteQ8Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ8item = false;
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
  DeleteQ9Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ9item = false;
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
  DeleteQ10Item(Id = 0) {
    if (Id == 0) {
      this.isaddQ10item = false;
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
  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "PostCrisis");
  }

  navigateright() {
    if (this.pageNo < this.maximumPage) {
      ++this.pageNo;
    }
  }

  navigateleft() {
    if (this.pageNo > 1) {
      --this.pageNo;
    }
  }
}
