import { Component,Directive, OnInit, HostListener, ElementRef } from '@angular/core';
import { IonicPage,MenuController,NavController, NavParams,Events } from 'ionic-angular';
import {  FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Database } from '../../../../../../providers/database/database';
import { StatusBar } from '@ionic-native/status-bar';
import * as constant from '../../../../../../providers/constants/constants';

/**
 * Generated class for the KeyConceptsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-key-concepts',
  templateUrl: 'key-concepts.html',
})
@Directive({
  selector: 'ion-textarea[autosize]'
})
export class KeyConceptsPage implements OnInit {
  keyConcept: string = "select";
  item: any;
  ContentForm: FormGroup;
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public inappbrowser: InAppBrowser,
    public statusBar: StatusBar,
    public events: Events,public database: Database,public formBuilder: FormBuilder,public baseclass:Baseclass,public element: ElementRef) {
      this.ContentForm = formBuilder.group({
        "hopemean": [''],
        "increasehope": [''],
        "responsibility": [''],
        "mywellness": [''],
        "education": [''],
        "learnmore": [''],
        "selfad": [''],
        "advocate": [''],
        "support": [''],
        "build": ['']
      });
  }

  public openWithInAppBrowser(url: string) {
    let target = "_blank";
    this.inappbrowser.create(url, target, this.options);
  }
  ionViewDidLoad() {
    this.baseclass.CheckwhatisWrapTableExists().then((result) => {
      if (result == false) {
        this.database.TableManipulation("whatisWrap");
      }
    });
    //this.GetwhatisWrap();
  }
  onSelectChange() {
    this.item = this.keyConcept;
  }
  ngOnInit(): void {
    setTimeout(() => this.adjust(), 0);
    this.GetwhatisWrap();
  }
  adjust(): void {
    let elementRef = this.element.nativeElement.getElementsByTagName('textarea');
    for (var n = 0; n < elementRef.length; n++) {
      elementRef[n].style.overflow = 'hidden';
      elementRef[n].style.height = 'auto';
      elementRef[n].style.height = elementRef[n].scrollHeight + "px";
    }
  }
  GetwhatisWrap() {
    this.database.executeReader(constant.SELECT_WHATISWRAP, []).then((result) => {
      let data = result;
      console.log("data",data);
      this.ContentForm.patchValue({
        hopemean: data[0]["hopemean"],
        increasehope: data[0]["increasehope"],
        responsibility: data[0]["responsibility"],
        mywellness: data[0]["mywellness"],
        education: data[0]["education"],
        learnmore: data[0]["learnmore"],
        selfad:  data[0]["selfad"],
        advocate: data[0]["advocate"],
        support: data[0]["support"],
        build: data[0]["build"]
      })
    })
  }
  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }
  ToggleMultiInput(event) {
    event._elementRef.nativeElement.style.opacity = "1";
  }
  UpdateItem(event, isDropDown = false) {
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
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      console.log("eq",result);
    }, (error) => {
      console.log("Error:", error);
    });
  }
}
