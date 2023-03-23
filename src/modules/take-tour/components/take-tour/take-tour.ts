import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the TakeTourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-take-tour',
  templateUrl: 'take-tour.html',
})
export class TakeTourPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController) {
  }

  slideData = [
    { image: "assets/images/1-17.png", title: "Welcome", text: "Welcome to the Wellness Recovery Action Plan application. To get started, tap the My WRAP button on the Welcome screen to activate the main menu.", pageNo: "1" },
    { image: "assets/images/2-17.png", title: "Welcome", text: "The menu icon in the top left will also activate the main menu from any page throughout the application.", pageNo: "2" },
    { image: "assets/images/3-17.png", title: "Welcome", text: "To return to the welcome screen at any time, tap the WRAP logo in the top right of every page.", pageNo: "3" },
    { image: "assets/images/4-17.png", title: "Wellness Toolbox", text: "In your wellness toolbox, list the tools that help you feel better and stay well. You can list tools you already use and tools you would like to try. Tap Build Your Wellness Toolbox to add tools to your lists.", pageNo: "4" },
    { image: "assets/images/5-17.png", title: "Wellness Toolbox", text: "To build your wellness toolbox, enter in the name of your tool and tap an icon to represent the tool.", pageNo: "5" },
    { image: "assets/images/6-17.png", title: "Daily Plan", text: "In your Daily Plan, describe yourself when you are well, and list things you need to do every day to maintain wellness.", pageNo: "6" },
    { image: "assets/images/7-17.png", title: "Daily Plan", text: "Tap the Add Item link to add to the list. Tap a listed word to edit. Tap the X to remove a word from the list.", pageNo: "7" },
    { image: "assets/images/8-17.png", title: "Stressors", text: "In the Stressors section, tap the Add Item link to add to the list. Tap a listed word to edit. Tap the X to remove a word from the list.", pageNo: "8" },
    { image: "assets/images/9-17.png", title: "Early Warning Signs", text: "In the Early Warning Signs section, tap the Add Item link to add to the list. Tap a listed word to edit. Tap the X to remove a word from the list.", pageNo: "9" },
    { image: "assets/images/10-17.png", title: "When Things are Breaking Down", text: " In the When Things Are Breaking Down section, tap the Add Item link to add to the list. Tap a listed word to edit. Tap the X to remove a word from the list.", pageNo: "10" },
    { image: "assets/images/11-17.png", title: "Crisis Plan", text: "Use the calendar scroller to adjust the date to show when your plan was created or updated.", pageNo: "11" },
    { image: "assets/images/12-17.png", title: "Crisis Plan", text: "For your Crisis Plan, tap the Add Item link to add to the list. Tap a listed word to edit. Tap the X to remove a word from the list.", pageNo: "12" },
    { image: "assets/images/13-17.png", title: "Crisis Plan", text: "In the text boxes, type your answers. You can type as much or as little as you want in each text box.",pageNo: "13"},
    { image: "assets/images/14-17.png", title: "Post-Crisis Plan", text: "For your Post-Crisis Plan, tap the Add Item link to add to the list. Tap a listed word to edit. Tap the X to remove a word from the list.", pageNo: "14" },
    { image: "assets/images/15-17.png", title: "Post-Crisis Plan", text: "In the text boxes, type your answers. You can type as much or as little as you want in each text box.", pageNo: "15" },
    { image: "assets/images/16-17.png", title: "Email My Plan", text: "Enter your email address and tap the Submit button to send yourself a PDF copy of your completed WRAP. You can also send copies to other people this way.", pageNo: "16" },
    { image: "assets/images/17-17.png", title: "Send Page", text: "Tap the Send Page button and enter your email address to send yourself a PDF copy of your completed WRAP. You can also send copies to other people this way.", pageNo: "17" },
  ];

  navigateToHome(obj) {
    this.navCtrl.push("HomePage");
    this.menu.close();
  }

}
