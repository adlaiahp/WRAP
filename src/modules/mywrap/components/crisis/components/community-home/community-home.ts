import { Component, HostListener, Directive, OnInit, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';

/**
 * Generated class for the CommunityHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-home',
  templateUrl: 'community-home.html',
})
@Directive({
  selector: 'ion-textarea[autosize]'
})
export class CommunityHomePage implements OnInit {

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  HomeForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public element: ElementRef,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    private events: Events) {
    this.HomeForm = formBuilder.group({
      "HomeCommunity": ['']
    });
  }

  // autosize textarea
  ngOnInit(): void {
    setTimeout(() => this.adjust(), 0);
  }

  adjust(): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + "px";
  }

  ionViewDidEnter() {
    this.baseclass.CheckCrisisTableExists().then((result) => {
      if (result == false) {
        this.database.TableManipulation("Crisis");
      }
      this.GetHomeCommunity();
    });
  }

  GetHomeCommunity() {
    this.database.executeReader(constant.SELECT_HOME_COMMUNITY, []).then((result) => {
      let data = <Array<Object>>result;
      this.HomeForm.patchValue({
        HomeCommunity: data[0]["HomeCommunity"]
      });
    });
  }

  ToggleMultiInput(event) {
    event._elementRef.nativeElement.style.opacity = "1";
  }

  //For updating individual form fields
  UpdateItem(event) {
    event._elementRef.nativeElement.style.opacity = "0.4";
    let dynamicQuery = "UPDATE CrisisItem SET ";
    let columnName = event._ngControl.name;
    dynamicQuery = dynamicQuery + columnName + "= ?";
    let homeValue = event.value;
    let value;
    if (homeValue == null) {
      homeValue = "";
    }
    value = homeValue.toString().trim();
    let params = [value];
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
    }, (error) => {
      console.log("Error:", error);
    });
  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  navigateleft() {
    this.navCtrl.push("AcceptableTreatmentPage");
  }

  navigateright() {
    this.navCtrl.push("AcceptableHospitalPage");
  }

  sendpage() {
    this.baseclass.displayAlert(" ", "Please enter an email address below", "HomeCommunity");
  }

}
