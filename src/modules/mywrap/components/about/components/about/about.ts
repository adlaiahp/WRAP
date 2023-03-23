import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

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
    public baseclass: Baseclass) {

  }

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

  sendpage(emailTo) {
    this.baseclass.SendWrapEmail(emailTo);
  }

  taketour() {
    this.navCtrl.push("TakeTourPage");
  }
  
  public openWithInAppBrowser(url: string) {
    let target = "_blank";
    this.inappbrowser.create(url, target, this.options);
  }
}
