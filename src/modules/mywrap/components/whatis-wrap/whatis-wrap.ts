
import { Component,Directive, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonicPage,MenuController,NavController, NavParams,Events } from 'ionic-angular';
import {  FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Baseclass } from '../../../../providers/baseclass/baseclass';
import { Database } from '../../../../providers/database/database';
import * as constant from '../../../../providers/constants/constants';
import * as enums from '../../../../providers/enums/enums';
import { Icon } from '../../../../app/app.config';

/**
 * Generated class for the WhatisWrapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-whatis-wrap',
  templateUrl: 'whatis-wrap.html',
})
@Directive({
  selector: 'ion-textarea[autosize]'
})
export class WhatisWrapPage implements OnInit{
  isadditem = false;
  isUpdateitem = false;
  ContentForm: FormGroup;
  items=[];
  subToolReferenceId= [];
  toolReferenceId=[];
  tools=[];
  subTools=[];
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController,public events: Events,public database: Database,public formBuilder: FormBuilder,public baseclass: Baseclass, public element: ElementRef) {
      this.ContentForm = formBuilder.group({
        "whatisWrap": ['']
      });
    //   this.baseclass.reloadData();
    //   this.events.subscribe("Tool:Save Completed", (data) => {
    //     if (data == "WhatisWrapPage") {
    //       this.ListData();
    //     }
    //   });
    // events.subscribe("Update:WhatisWrap", (data) => {
    //   if (data.Content != null && data.Content != undefined && data.Content != "") {
    //     this.updateItem(data.Content, data.Id);
    //   }
    //   else {
    //     this.ListData();
    //   }
    // });
      
  }
  ngOnInit(): void {
    setTimeout(() => this.adjust(), 0);
    this.GetwhatisWrap();
  }
  ionViewDidLoad() {
    this.baseclass.CheckwhatisWrapTableExists().then((result) => {
      if (result == false) {
        this.database.TableManipulation("whatisWrap");
      }
    });
    //this.GetwhatisWrap();
  }
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

  // ToggleInput() {
  //   this.isadditem = true;
  // }

  // ToggleUpdate() {
  //   this.isUpdateitem = true;
  // }

  // InsertItem(event) {
  //   let data = this.ContentForm.value.Content;
  //   let value;
  //   if (data == null) {
  //     data = "";
  //   }
  //   value = data.toString().trim();
  //   if (value != "" && value != null && value != undefined) {
  //     let params = [value, enums.Page.WhatisWrap];
  //     this.database.executeNonQuery(constant.INSERT_WHATISWRAP, params).then((result) => {
  //     }, (error1) => {
  //       console.log("ERROR: ", error1);
  //     });
  //     this.ListData();
  //   }
  //   else {
  //     this.isadditem = false;
  //   }
  //   this.ContentForm["controls"]["whatisWrap"].reset();
  // }

  // // updateItem(Data, Id) {
  // //   if (Data != null && Data != undefined && Data != "") {
  // //     let params = [Data, Id, enums.Page.WhatisWrap];
  // //     this.database.executeNonQuery(constant.UPDATE_WHATISWRAP, params).then((result) => {
  // //     }, (error1) => {
  // //       console.log("ERROR: ", error1);
  // //     });
  // //     this.ListData();
  // //   }
  // //   else {
  // //     this.isUpdateitem = false;
  // //   }
  // // }
  // ListData() {
  //   let params = [enums.Page.WhatisWrap];
  //   this.database.executeReader(constant.SELECT_WHATISWRAP, params).then((result) => {
  //     this.items = <Array<Object>>result;
  //     console.log("items",this.items);
  //   }, (error) => {
  //     console.log("ERROR: ", error);
  //   });
  // }
  // DeleteItem(Id = 0) {
  //   if (Id == 0) {
  //     this.isadditem = false;
  //   }
  //   else {
  //     let params = [Id];
  //     this.database.executeNonQuery(constant.DELETE_WHATISWRAP, params).then((result) => {
  //     }, (error1) => {
  //       console.log("ErrorDelete", error1);
  //     });
  //   }
  //   this.ListData();
  // }
  // ListTool() {
  //   let params = [enums.Page.DailyItem];
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

  //   //List Sub tools
  //   params = [enums.Page.DailyItemSub];
  //   this.database.executeReader(constant.SELECT_REFERENCE, params).then((result) => {
  //     let data = <Array<Object>>result;
  //     if (data.length > 0) {
  //       let refe = data[0]['ReferenceId'];
  //       let selectToolQuery = constant.SELECT_TOOL + "(" + refe + ")";
  //       this.database.executeReader(selectToolQuery, []).then((result) => {
  //         this.subTools = <Array<Object>>result;
  //         this.subTools.forEach(element => {
  //           this.subToolReferenceId.push(element.Id);
  //           element.IconAsset = element.IconId == null ? "" : Icon.ICONS.find(x => x.id == element.IconId).asset;
  //         });
  //       }, (error) => {
  //         console.log("Error:", error);
  //       });
  //     } else {
  //       this.subTools = [];
  //     }
  //   },
  //     (error) => {
  //       console.log("Error:", error);
  //     });
  // }
  GetwhatisWrap() {
    this.database.executeReader(constant.SELECT_WHATISWRAP, []).then((result) => {
      let data = result;
      console.log("data",data);
      this.ContentForm.patchValue({
        whatisWrap: data[0]["whatisWrap"]
      })
      console.log("patach", data[0]["whatisWrap"]);
    })
  }

  ToggleMultiInput(event) {
    console.log("toggle");
    event._elementRef.nativeElement.style.opacity = "1";
  }
  
  UpdateItem(event,isDropDown =  false) {
    console.log("update");
    event._elementRef.nativeElement.style.opacity = "0.4";
    let dynamicQuery = "UPDATE WHATISWRAP  SET ";
    let columnName = !isDropDown ? event._ngControl.name : event._elementRef.nativeElement.id;
    dynamicQuery = dynamicQuery + columnName + "= ?";
    console.log(dynamicQuery);
    let value = event.value;
    if (value == null) {
      value = "";
    }
    value = value.toString().trim();
    let params = [value];
    console.log("params",params);
    console.log("dynamic query",dynamicQuery);
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      console.log("result",result);
    }, (error) => {
      console.log("Error:", error);
    });
  }

}
