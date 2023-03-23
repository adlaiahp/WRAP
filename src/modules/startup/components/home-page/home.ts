import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

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

  constructor(public nav: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public inappbrowser: InAppBrowser,
    public statusBar: StatusBar) {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#00000');
  }

  // taketour() {
  //   this.nav.push("TakeTourPage");
  // }

  navigateToHome(obj) {
    this.nav.push("HomePage");
    this.menu.close();
  }

  public openWithInAppBrowser(url: string) {
    let target = "_blank";
    this.inappbrowser.create(url, target, this.options);
  }

}
