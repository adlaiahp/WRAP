import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DASHBOARD } from './app.config';
import { Icon } from '../app/app.config';
import { Database } from '../providers/database/database';
import * as constant from '../providers/constants/constants'
import * as enums from '../providers/enums/enums';

@Component({
  templateUrl: 'app.html',
  providers: [Database]
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  items = [];
  wellitems = [];
  rootPage: any = "HomePage";
  pages: Array<{ title: string, component: any }>;
  filterData = [];
  concat: string;
  isSecondary: boolean;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public menu: MenuController,
    public splashScreen: SplashScreen,
    public database: Database,
    public events: Events
  ) {
    this.initializeApp();
    this.statusBar.styleDefault();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#00000');
    this.items = DASHBOARD.MENU;
    events.subscribe('tool:data', () => {
      this.listdata();
    })
    events.subscribe('menu:closed', (data) => {
      this.isSecondary = data == "Daily" ? true : false;
      this.BindToolList();
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.database.createDatabase();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      // this.events.publish(this.listdata());
    });
  }

  listdata() {
    this.GetToolList();
  }

  BindToolList() {
    let pageType = this.GetPageType();
    this.database.executeReader(constant.SELECT_REFERENCE, [pageType]).then((result) => {
      let data = <Array<Object>>result;
      if (data.length > 0) {
        console.log(data);
        let reference = data[0]['ReferenceId'];
        let referenceCheck = reference.split(',');
        this.GetToolList(referenceCheck);
      } else {
        this.GetToolList(0);
      }
    });
  }

  GetToolList(referenceCheck: any = 0) {
    this.database.executeReader(constant.SELECT_WELLNESS_LIST).then((result) => {
      this.wellitems = <Array<Object>>result;
      console.log(this.wellitems);
      this.wellitems.forEach(res => {
        if (referenceCheck != 0)
          res.check = referenceCheck.indexOf(String(res.Id)) > -1 ? true : false;
        res.IconAsset = res.IconId == null ? "" : Icon.ICONS.find(x => x.id == res.IconId).asset;
      });
    });
  }


  Save() {
    this.filterData = this.wellitems.filter((item) => item.check == true);
    let checked = "";
    this.filterData.forEach(element => {
      checked = checked + element.Id + ",";
    });
    checked = checked.slice(0, -1);
    this.SaveTool(checked);
    this.menu.close();
  }

  GetPageType(): any {
    let pageType;
    let currentPagename = this.nav.getActive().name;
    switch (currentPagename) {
      case "DailyMaintenancePage":
        pageType = this.isSecondary ? enums.Page.DailyItemSub : enums.Page.DailyItem;
        break;
      case "TriggersPage":
        pageType = enums.Page.Triggers;
        break;
      case "EarlyWarningSignsPage":
        pageType = enums.Page.WarningSigns
        break;
      case "BreakingDownPage":
        pageType = enums.Page.BreakingDown
        break;
      case "PostCrisisPage":
        pageType = enums.Page.PostCrisis
        break;
    }
    return pageType;
  }

  SaveTool(checked) {
    let currentPagename = this.nav.getActive().name;
    let pageType = this.GetPageType();
    let params = [checked, pageType];
    let params1 = [pageType];
    this.database.executeReader(constant.SELECT_REFERENCE, params1).then((result) => {
      let isData = <Array<Object>>result;
      if (isData.length > 0) {
        this.database.executeNonQuery(constant.UPDATE_TOOL, params).then((result) => {
          this.SaveCompletedEvent(currentPagename);
        }, (error1) => {
          console.log("UpdateToolERROR: ", error1);
        });
      } else {
        this.database.executeNonQuery(constant.INSERT_TOOL, params).then((result) => {
          this.SaveCompletedEvent(currentPagename);
        }, (error1) => {
          console.log("InsertToolERROR: ", error1);
        });
      }
    });
  }

  SaveCompletedEvent(pageName) {
    this.events.publish("Tool:Save Completed", pageName);
  }

  openPage(name) {
    this.menu.close();

    if (name == 'HomePage') {
      this.nav.setRoot(name);
    } else {
      this.nav.push(name);
    }
  }

  toggleSection(i) {
    this.items[i].open = !this.items[i].open;
  }

  EditTool() {
    this.nav.push("WellnessToolboxPage");
    this.menu.close();
  }
}
