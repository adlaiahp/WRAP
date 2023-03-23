import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { DatePicker } from '@ionic-native/date-picker';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Baseclass } from '../providers/baseclass/baseclass';
import { Database } from '../providers/database/database';
import { Constants } from '../providers/constants/constants';
import { Enums } from '../providers/enums/enums';
import { EmailTemplate } from '../providers/email-template/email-template';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    EmailComposer,
    DatePicker,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Baseclass,
    Database,
    SQLite,
    Constants,
    Enums,
    InAppBrowser,
    StatusBar,
    EmailTemplate
  ]
})
export class AppModule { }
