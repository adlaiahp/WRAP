import { Component, Directive, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';
import * as enums from '../../../../../../providers/enums/enums';
import { Icon } from '../../../../../../app/app.config';

@IonicPage()
@Component({
  selector: 'page-post-crisis',
  templateUrl: 'post-crisis.html',
})

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class PostCrisisPage implements OnInit {
  supportItems = [];
  isAddSupport = true;
  insertedId = 0;
  peopleThankItems = [];
  isAddThank = true;
  tools = [];
  subToolReferenceId = [];
  toolReferenceId = [];
  apologizeItems = [];
  isAddApologize = true;
  amendsItems = [];
  isAddAmends = true;
  Worseitems = [];
  isWorse = false;
  InitIsSafe: string = "select";
  PostCrisisForm: FormGroup;
  HomeSafe: any;
  pageNo: number = 1;
  maximumPage: number = 6;
  isSafePlace: boolean;
  isHomeSafe: boolean;
  isChangeInLife: boolean;

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public element: ElementRef,
    public baseclass: Baseclass,
    public database: Database,
    private events: Events) {
    this.PostCrisisForm = formBuilder.group({
      "OutOfCrisis": [''],
      "FeelRecovered": [''],
      "WorseContent": [''],
      "IsSafePlace": [''],
      "IsSafeHome": [''],
      "EaseMyReturn": [''],
      "TakeCareSoon": [''],
      "SomeoneToDo": [''],
      "WaitUntilBetter": [''],
      "MustThingMyself": [''],
      "CanThingsMyself": [''],
      "AvoidThingsPeople": [''],
      "PreventRepercussion": [''],
      "PreventLoss": [''],
      "SignsPCOver": [''],
      "PreventCrisisInFuture": [''],
      "ChangesInCrisis": [''],
      "LifeStyle": [''],
      "LearnInCrisis": [''],
      "PersonToHome": [''],
      "OrPersonToHome": [''],
      "StayPerson": [''],
      "OrStayPerson": [''],
      "ThingsILike": [''],
      "OrThingsILike": [''],
      "MedicalIssue": [''],
      "ResolveMedicalIssue": [''],
      "SafePlace": [''],
      "IsHomeSafe": [''],
      "HomeSafe": [''],
      "IsChangeInLife": [''],
      "ChangeInLife": ['']
    });
    this.baseclass.reloadData();
    this.events.subscribe("Tool:Save Completed", (data) => {
      if (data == "PostCrisisPage") {
        this.ListTool();
      }
    });
    events.subscribe("Update:BreakingDown", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateWorseItem(data.Content, data.Id);
      }
      else {
        this.GetPostCrisis();
      }
    });
  }

  ionViewDidEnter() {
    this.baseclass.CheckPostCrisisTableExists().then((result) => {
      if (result == false) {
        this.database.TableManipulation("PostCrisis");
      }
    });
    this.GetPostCrisis();
    this.ListTool();
  }

  ngOnInit(): void {
    setTimeout(() => this.adjust(), 0);
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "PostCrisis");
  }

  adjust(): void {
    let elementRef = this.element.nativeElement.getElementsByTagName('textarea');
    for (var n = 0; n < elementRef.length; n++) {
      elementRef[n].style.overflow = 'hidden';
      elementRef[n].style.height = 'auto';
      elementRef[n].style.height = elementRef[n].scrollHeight + "px";
    }
  }

  IsSafePlace(event) {
    if (this.PostCrisisForm.controls['IsSafePlace'].value == "2") {
      this.isSafePlace = true;
    }
    else {
      this.isSafePlace = false;
    }
    this.UpdateItem(event, true);
  }

  IsHomeSafe(event) {
    if (this.PostCrisisForm.controls['IsHomeSafe'].value == "2") {
      this.isHomeSafe = true;
    }
    else {
      this.isHomeSafe = false;
    }
    this.UpdateItem(event, true);
  }

  IsChangeInLife(event) {
    if (this.PostCrisisForm.controls['IsChangeInLife'].value == "2") {
      this.isChangeInLife = true;
    } else {
      this.isChangeInLife = false;
    }
    this.UpdateItem(event, true);
  }

  ToggleMenu() {
    this.events.publish('menu:closed', '');
    this.menu.open("AddTool");
  }

  GetPostCrisis(event: any = 0) {
    this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
      let data = <Array<Object>>result;
      console.log("data",data);
      if (data.length > 0) {
        if (data[0]["IsSafeHome"] == "2") {
          this.isHomeSafe = true;
        } else {
          this.isHomeSafe = false;
        }
        if (data[0]["IsSafePlace"] == "2") {
          this.isSafePlace = true;
        } else {
          this.isSafePlace = false;
        }
        if (data[0]["IsChangeInLife"]) {
          this.isChangeInLife = true;
        }
        else {
          this.isChangeInLife = false;
        }
        this.PostCrisisForm.patchValue({
          OutOfCrisis: data[0]["OutOfCrisis"],
          FeelRecovered: data[0]["FeelRecovered"],
          PersonToHome: data[0]["PersonToHome"],
          OrPersonToHome: data[0]["OrPersonToHome"],
          IsSafeHome: data[0]["IsSafeHome"],
          IsSafePlace: data[0]["IsSafePlace"],
          IsChangeInLife: data[0]["IsChangeInLife"],
          ChangeInLife: data[0]["ChangeInLife"],
          HomeSafe: data[0]["HomeSafe"],
          EaseMyReturn: data[0]["EaseMyReturn"],
          TakeCareSoon: data[0]["TakeCareSoon"],
          SomeoneToDo: data[0]["SomeoneToDo"],
          WaitUntilBetter: data[0]["WaitUntilBetter"],
          MustThingMyself: data[0]["MustThingMyself"],
          CanThingsMyself: data[0]["CanThingsMyself"],
          AvoidThingsPeople: data[0]["AvoidThingsPeople"],
          PreventRepercussion: data[0]["PreventRepercussion"],
          PreventLoss: data[0]["PreventLoss"],
          SignsPCOver: data[0]["SignsPCOver"],
          PreventCrisisInFuture: data[0]["PreventCrisisInFuture"],
          ChangesInCrisis: data[0]["ChangesInCrisis"],
          LifeStyle: data[0]["LifeStyle"],
          LearnInCrisis: data[0]["LearnInCrisis"],
          StayPerson: data[0]["StayPerson"],
          OrStayPerson: data[0]["OrStayPerson"],
          ThingsILike: data[0]["ThingsILike"],
          OrThingsILike: data[0]["OrThingsILike"],
          MedicalIssue: data[0]["MedicalIssue"],
          ResolveMedicalIssue: data[0]["ResolveMedicalIssue"],
          SafePlace: data[0]["SafePlace"],
          IsHomeSafe: data[0]["IsHomeSafe"]
        });
        console.log("patch",data[0]["OutOfCrisis"]);
      }
    });

    this.database.executeReader(constant.SELECT_LOOKUP_SUPPORTERS, []).then((result) => {
      let data = <Array<Object>>result;
      this.supportItems = data;
      this.ShowActiveFields(event);
    });
    this.database.executeReader(constant.SELECT_LOOKUP_PEOPLE_THANK, []).then((result) => {
      let data = <Array<Object>>result;
      this.peopleThankItems = data;
      this.ShowActiveFields(event);
    });
    this.database.executeReader(constant.SELECT_LOOKUP_APOLOGIZE, []).then((result) => {
      let data = <Array<Object>>result;
      this.apologizeItems = data;
      this.ShowActiveFields(event);
    });
    this.database.executeReader(constant.SELECT_LOOKUP_AMENDS, []).then((result) => {
      let data = <Array<Object>>result;
      this.amendsItems = data;
      this.ShowActiveFields(event);
    });
    let params = [enums.Page.PostCrisis];
    this.database.executeReader(constant.SELECT_DISPLAYITEM, params).then((result) => {
      this.Worseitems = <Array<Object>>result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  updateWorseItem(Data, Id) {
    if (Data != null && Data != undefined && Data != "") {
      let params = [Data, Id, enums.Page.PostCrisis];
      this.database.executeNonQuery(constant.UPDATE_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.GetPostCrisis();
    }
  }

  DeleteWorseItem(Id = 0) {
    if (Id == 0) {
      this.isWorse = false;
    }
    else {
      let params = [Id];
      this.database.executeNonQuery(constant.DELETE_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ErrorDelete", error1);
      });
    }
    this.GetPostCrisis();
  }

  InsertWorseItem() {
    let data = this.PostCrisisForm.value.WorseContent;
    let value;
    if (data == null) {
      data = "";
    }
    value = data.toString().trim();
    if (value != "" && value != null && value != undefined) {
      let params = [value, enums.Page.PostCrisis];
      this.database.executeNonQuery(constant.INSERT_DISPLAYITEM, params).then((result) => {
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
      this.GetPostCrisis();
    }
    else {
      this.isWorse = false;
    }
    this.PostCrisisForm["controls"]["WorseContent"].reset();
  }

  ToggleWorseInput() {
    this.isWorse = true;
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

  ToggleMultiUpdate(event: any, ListName: any, ColumnName: any, Id: any): void {
    let dynamicQuery;
    let params = [event.value, Id];
    event._elementRef.nativeElement.style.opacity = "0.4";
    switch (ListName) {
      case "AddSupport":
        this.isAddSupport = true;
        dynamicQuery = constant.UPDATE_LOOKUP_SUPPORTERS + ColumnName + " = ? WHERE Id=?";
        break;
      case "AddThank":
        this.isAddThank = true;
        dynamicQuery = constant.UPDATE_LOOKUP_PEOPLE_THANK + ColumnName + " =? WHERE Id=?";
        break;
      case "AddApologize":
        this.isAddApologize = true;
        dynamicQuery = constant.UPDATE_LOOKUP_APOLOGIZE + ColumnName + " =? WHERE Id=?";
        break;
      case "AddAmends":
        this.isAddAmends = true;
        dynamicQuery = constant.UPDATE_LOOKUP_AMENDS + ColumnName + " =? WHERE Id=?";
        break;
    }
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
    });
  }

  AddMultiListItem(ListName: any): void {
    let dynamicQuery;
    switch (ListName) {
      case "AddSupport":
        this.isAddSupport = false;
        dynamicQuery = constant.INSERT_LOOKUP_SUPPORTERS;
        break;
      case "AddThank":
        this.isAddThank = false;
        dynamicQuery = constant.INSERT_LOOKUP_PEOPLE_THANK;
        break;
      case "AddApologize":
        this.isAddApologize = false;
        dynamicQuery = constant.INSERT_LOOKUP_APOLOGIZE;
        break;
      case "AddAmends":
        this.isAddAmends = false;
        dynamicQuery = constant.INSERT_LOOKUP_AMENDS;
    }
    this.database.executeNonQuery(dynamicQuery, []).then((result) => {
      let data = <Array<Object>>result;
      switch (ListName) {
        case "AddSupport":
          let newSupportData = { "Id": data["insertId"], "WhoName": "", "Phone": "", "Email": "", "NeedThem": "" };
          this.supportItems.push(newSupportData);
          break;
        case "AddThank":
          let newThankData = { "Id": data["insertId"], "PeopleName": "", "WhenThank": "", "HowThank": "" };
          this.peopleThankItems.push(newThankData);
          break;
        case "AddApologize":
          let newApologizeData = { "Id": data["insertId"], "ApologizeName": "", "WhenApologize": "", "HowApologize": "" };
          this.apologizeItems.push(newApologizeData);
          break;
        case "AddAmends":
          let newAmendsData = { "Id": data["insertId"], "AmendsName": "", "WhenAmends": "", "HowAmends": "" }
          this.amendsItems.push(newAmendsData);
      }
    });
    this.GetPostCrisis();
  }

  ShowActiveFields(event) {
    this.insertedId = 0;
    if (event != 0)
      switch (event.target.offsetParent.id) {
        case "supporterAdd":
          this.isAddSupport = true;
          break;
        case "thankAdd":
          this.isAddThank = true;
          break;
        case "ApologizeAdd":
          this.isAddApologize = true;
          break;
        case "AmendsAdd":
          this.isAddAmends = true;
          break;
      }
  }

  DeleteMultiList(ListName, Id): void {
    let dynamicQuery;
    let params = [Id];
    switch (ListName) {
      case "AddSupport":
        this.isAddSupport = true;
        dynamicQuery = constant.DELETE_LOOKUP_SUPPORTERS;
        break;
      case "AddThank":
        this.isAddThank = true;
        dynamicQuery = constant.DELETE_LOOKUP_PEOPLE_THANK;
        break;
      case "AddApologize":
        this.isAddApologize = true;
        dynamicQuery = constant.DELETE_LOOKUP_APOLOGIZE;
        break;
      case "AddAmends":
        this.isAddAmends = true;
        dynamicQuery = constant.DELETE_LOOKUP_AMENDS;
        break;
    }
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      this.GetPostCrisis();
    }, (error) => {
      console.log("Error :PostCrisis :DeleteMultiList :" + ListName + ": ", error);
    });
  }

  ListTool() {
    let params = [enums.Page.PostCrisis];
    this.subToolReferenceId = [];
    this.toolReferenceId = [];
    this.database.executeReader(constant.SELECT_REFERENCE, params).then((result) => {
      let data = <Array<Object>>result;
      if (data.length > 0) {
        let refe = data[0]['ReferenceId'];
        let selectToolQuery = constant.SELECT_TOOL + "(" + refe + ")";
        this.database.executeReader(selectToolQuery, []).then((result) => {
          this.tools = <Array<Object>>result;
          this.tools.forEach(element => {
            this.toolReferenceId.push(element.Id);
            element.IconAsset = element.IconId == null ? "" : Icon.ICONS.find(x => x.id == element.IconId).asset;
          });
        }, (error) => {
          console.log("Error:", error);
        });
      } else {
        this.tools = [];
      }
    },
      (error) => {
        console.log("Error:", error);
      });
  }

  DeleteTool(Id) {
    let pageType;
    let queryFilter;
    let referenceId;
    let params;
    pageType = enums.Page.PostCrisis;
    this.toolReferenceId.splice(this.toolReferenceId.indexOf(Id), 1);
    queryFilter = this.toolReferenceId.length >= 1 ? constant.UPDATE_TOOL : constant.DELETE_TOOL;
    referenceId = this.toolReferenceId.join(",");
    params = this.toolReferenceId.length >= 1 ? [referenceId, pageType] : [pageType];
    this.database.executeNonQuery(queryFilter, params).then((result) => {
    }, (error1) => {
      console.log("Error :Post Crisis  : DeleteTool", error1);
    });
    this.ListTool();
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
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
