import { Injectable, ViewChild } from '@angular/core';
import { AlertController, Nav, LoadingController, ModalController, Platform, ToastController, Events, Content } from 'ionic-angular';
// import { Toast } from '@ionic-native/toast'
import { EmailValidator } from '@angular/forms';
import { Database } from '../../providers/database/database';
import * as constant from '../../providers/constants/constants';
import { EmailComposer } from '@ionic-native/email-composer';
import * as template from '../../providers/email-template/email-template';
import * as enums from '../../providers/enums/enums';
import { Icon } from '../../app/app.config';
import { IfObservable } from 'rxjs/observable/IfObservable';


declare let cordova: any;
@Injectable()
export class Baseclass {
  isSecondary: boolean;
  @ViewChild(Nav) nav: Nav;
  sendEmail: boolean;
  itemsWellNess: Object[];
  constructor(public alertCtrl: AlertController,
    public events: Events, private database: Database, public emailComposer: EmailComposer, public loadingCtrl: LoadingController) {
    this.emailComposer.requestPermission().then((available) => {
      console.log("EmailIsAvailable", available);
    });
  }

  GetMailData() {

  }
  /**
 * Display an alert.
 * @return : alert.
 * @param : title to display, subtitle of toast
 */
  displayAlert(title, Message, currentPagename) {
    const prompt = this.alertCtrl.create({
      title: title,
      message: Message,
      inputs: [
        {
          name: 'title',
          placeholder: 'Enter your email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            let emailTo = data.title;
            this.SendEmailWithTemplate(emailTo, currentPagename);
          }
        }
      ]
    });
    prompt.present();
  }


  SendWrapEmail(emailTo): any {
    let email = {
      To: emailTo,
      FileName: "",
      Subject: "",
      Template: ""
    };
    let templateData = "";
    return new Promise((resolve, reject) => {
      this.GetWellnessTemplate().then((data) => {
        templateData += data;
        this.GetDailyMaintenanceTemplate().then((data) => {
          templateData += data;
          this.GetTriggersTemplate().then((data) => {
            templateData += data;
            this.GetEarlySignsTemplate().then((data) => {
              templateData += data;
              this.GetBreakingDownTemplate().then((data) => {
                console.log("hit21")
                templateData += data;
                this.GetCrisisTemplate().then((data) => {
                console.log("hit22");
                  templateData += data;
                  this.GetPostCrisisTemplate().then((data) => {
                    templateData += data;
                    // this.GetWhoTakesCareTemplate().then((data) => {
                    //   templateData += data;
                    //   this.GetMedicalCareTemplate().then((data) => {
                    //     templateData += data;
                    //     this.GetAcceptableTreatment().then((data) => {
                    //       templateData += data;
                    //       this.GetHomeCommunityTemplate().then((data) => {
                    //         templateData += data;
                    //         this.GetAcceptableHospital().then((data) => {
                    //           templateData += data;
                    //           this.GetHelpOthersTemplate().then((data) => {
                    //             templateData += data;
                    //             this.GetCrisisItemTemplate("PlanNotRequired").then((data) => {
                    //               templateData += data;
                    //               this.GetPostCrisisTemplate().then((data) => {
                    //                 templateData += data;
                    //                 this.GetResponsibilityTemplate().then((data) => {
                    //                   templateData += data;
                    email.FileName = "Wrap.pdf";
                    email.Subject = "My WRAP from the WRAP App";
                    email.Template = templateData;
                    this.SendEmail(email);
                    //                 });
                    //               });
                    //             });
                    //           });
                    //         });
                    //       });
                    //     });
                    //   });
                    // });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  SendEmailWithTemplate(emailTo, pageType) {
    let email = {
      To: emailTo,
      FileName: "",
      Subject: "",
      Template: ""
    };
    switch (pageType) {
      case "Wellness":
        email.FileName = "Wellness.pdf";
        email.Subject = "Wellness Toolbox Details";
        this.GetWellnessTemplate().then((data) => {
          console.log("templateData get well ness", data);
          email.Template = data;
          // this.sendEmail = 
          this.SendEmail(email);
        });
        break;
      case "PostCrisis":
        email.FileName = "PostCrisis.pdf";
        email.Subject = "Post-Crisis Plan Details";
        this.GetPostCrisisTemplate().then((data) => {
          email.Template = data;
          console.log("email post crisis", email.Template);
          this.SendEmail(email);
        });
        break;
      case "DailyMaintenance":
        email.FileName = "Daily Plan.pdf";
        email.Subject = "Daily Plan Details";
        this.GetDailyMaintenanceTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);

        });
        break;
      case "Triggers":
        email.FileName = "Stressors.pdf";
        email.Subject = "Stressors Details";
        this.GetTriggersTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "EarlyWarningSigns":
        email.FileName = "EarlyWarningSigns.pdf";
        email.Subject = "Early Warning Signs Details";
        this.GetEarlySignsTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "BreakingDown":
        email.FileName = "BreakingDown.pdf";
        email.Subject = "Breaking Down Details";
        this.GetBreakingDownTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "Crisis":
        email.FileName = "Crisis.pdf";
        email.Subject = "Crisis Plan Details";
        this.GetCrisisTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "WhenWell":
        email.FileName = "WhenWell.pdf";
        email.Subject = "When Well Crisis details";
        this.GetWhenWellTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "Mysupporter":
        email.FileName = "Mysupporter.pdf";
        email.Subject = "My Supporters details";
        this.GetCrisisItemTemplate("Mysupporter").then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "PlanNotRequired":
        email.FileName = "The Plan Is No Longer Needed.pdf";
        email.Subject = "The Plan Is No Longer Needed details";
        this.GetCrisisItemTemplate("PlanNotRequired").then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "MedicalCare":
        email.FileName = "MedicalCare.pdf";
        email.Subject = "Medical Care Crisis details";
        this.GetMedicalCareTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "WhoTakesCare":
        email.FileName = "WhoTakesCare.pdf";
        email.Subject = "Who Takes Care Details";
        this.GetWhoTakesCareTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "HelpOthers":
        email.FileName = "HelpFromOthers.pdf";
        email.Subject = "Help From Others";
        this.GetHelpOthersTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "HomeCommunity":
        email.FileName = "Home Community.pdf";
        email.Subject = "Home Community Details";
        this.GetHomeCommunityTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "AcceptableTreatment":
        email.FileName = "Acceptable Treatment.pdf";
        email.Subject = "Acceptable Treatment Details";
        this.GetAcceptableTreatment().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "AcceptableHospital":
        email.FileName = "Acceptable Hospital.pdf";
        email.Subject = "Acceptable Hospital details";
        this.GetAcceptableHospital().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
      case "ResumeResponsibility":
        email.FileName = "Resume Responsibility.pdf";
        email.Subject = "Resume Responsibility";
        this.GetResponsibilityTemplate().then((data) => {
          email.Template = data;
          this.SendEmail(email);
        });
        break;
    }
  }

  reloadData() {
    this.events.publish("tool:data");
  }

  CheckCrisisTableExists(): any {
    return new Promise((resolve, reject) => {
      this.database.executeReader(constant.SELECT_CRISISITEM, []).then((result) => {
        let data = <Array<Object>>result;
        console.log("checktable", data);
        let returnData = data.length < 1 ? false : true;
        resolve(returnData);
      }, (error) => {
        reject(error);
      });
    });
  }

  CheckPostCrisisTableExists(): any {
    return new Promise((resolve, reject) => {
      this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
        let data = <Array<Object>>result;
        let returnData = data.length < 1 ? false : true;
        resolve(returnData);
      }, (error) => {
        reject(error);
      });
    });
  }
  CheckwhatisWrapTableExists(): any {
    return new Promise((resolve, reject) => {
      this.database.executeReader(constant.SELECT_WHATISWRAP, []).then((result) => {
        let data = <Array<Object>>result;
        let returnData = data.length < 1 ? false : true;
        resolve(returnData);
      }, (error) => {
        reject(error);
      });
    });
  }
  SendEmail(email): boolean {
    let options = {
      documentSize: 'A4',
      type: 'base64',

    };
    cordova.plugins.pdf.fromData(email.Template, options)
      .then((result) => {
        console.log("result pdf", result);
        this.OpenEmail(result, email);
      })
      .catch((err) => { console.error(err) });
    return true;
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email',
      subTitle: 'Email sent successfully',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  OpenEmail(base64, email) {
    console.log("email");
    let content = {
      to: email.To,
      // cc: '',
      // bcc: [],
      attachments: ["base64:" + email.FileName + "//" + base64],
      subject: email.Subject,
      body: '',
      isHtml: true
    };
    console.log("content", content);
    this.emailComposer.isAvailable().then((isavailable) => {
      console.log("available", isavailable);
      this.emailComposer.open(content);
      console.log("emailcompose");
      setTimeout(() => {
        this.presentAlert();
      }, 9000);
  
    });
  }



  //Null or undefined filter
  NF(value): any {
    return (value == undefined || value == null) ? "" : value;
  }

  // to get image for template
  GetImageData(source, height, width): any {
    return new Promise((resolve, reject) => {
      if (source != "") {
        let image = new Image();
        image.src = source;
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        console.log("canvas.toDataURL");
        console.log(canvas.toDataURL());
        resolve(canvas.toDataURL("image/jpg"));
        // resolve(canvas.toDataURL('image/svg+xml'));
      } else {
        resolve("");
      }
    });
  }
  //EMAIL TEMPLATES

  //Wellness Template
  GetWellnessTemplate(): any {
    let templateData = "";
    let templateData1 = "";
    let templateData2 = "";
    return new Promise((resolve, reject) => {
      templateData += '<h3>Wellness Toolbox</h3>'
        + '<p>The wellness toolbox is the foundation for your WRAP. You will use these lists of wellness tools to build the action plans in each section of your WRAP. You can add to these lists at any time.</p>';
      this.database.executeReader(constant.SELECT_WELLNESS_LIST).then((result) => {
        this.itemsWellNess = <Array<Object>>result;


        // let counter = this.itemsWellNess.length;
        // templateData += '<p>What things do I already do to help myself feel well,stay well,and  live the way I want to live?</p>'
        // templateData += '<p> What things would I like to try in the future?</p>'
        let test1 = 1;
        let test2 = 1;
        this.itemsWellNess.forEach(element => {
          switch (element['QId']) {
            case 1:
              if (test1 == 1) {
                templateData1 += '<p>What things do I already do to help myself feel well, stay well, and  live the way I want to live?</p>'
                test1 = 0;
              }
              let asset = element["IconId"] == null ? "" : Icon.ICONS.find(x => x.id == element["IconId"]).asset;
              console.log("asset", asset);
              this.GetImageData(asset, 24, 23).then((data) => {
                templateData1 += data != "" ? '<img src="' + data + '"/>' : "";
                console.log("image data templateData1", templateData1);
                templateData1 += '<span style="margin-left: 1.2rem">' + this.NF(element["Content"]) + '</span>';
                templateData1 += '</br>';
                // counter--;
              });
              break;
            case 2:
              if (test2 == 1) {
                templateData2 += '<p> What things would I like to try in the future?</p>'
                test2 = 0;
              }
              let assetS = element["IconId"] == null ? "" : Icon.ICONS.find(x => x.id == element["IconId"]).asset;
              this.GetImageData(assetS, 24, 23).then((data) => {
                templateData2 += data != "" ? '<img src="' + data + '"/>' : "";
                templateData2 += '<span style="margin-left: 1.2rem">' + this.NF(element["Content"]) + '</span>';
                templateData2 += '</br>';
                // counter--;
              });
              break;
          }
        });
        console.log("templateData1;", templateData1);
        console.log("templateData2;", templateData2);

        let loading = this.loadingCtrl.create({
          content: 'Loading...'
        });

        loading.present();

        setTimeout(() => {
          templateData += templateData1;
          templateData += templateData2;
          console.log("templateData;", templateData);
          resolve(templateData);
          loading.dismiss();
        }, 5000);
        // }
        // setTimeout(() => {
        //   templateData += templateData1;
        //   templateData += templateData2;
        //   console.log("templateData;", templateData);
        //   resolve(templateData);
        // }, 5000);
        // if (counter == 0) {
        //   resolve(templateData);
        // }
      });
    });
  }
  // daily plan template
  GetDailyMaintenanceTemplate(): any {
    let maintenanceTemplate = "";
    return new Promise((resolve, reject) => {
      maintenanceTemplate += '<h3>Daily Plan</h3>'
        + '<p>What am I like on my best day?</p>'
      maintenanceTemplate += '<p>How would other people describe me, or how would I describe myself, when I'+"'"+'m well or when I'+"'"+'m doing the things I want to do with my life?</p>'
      this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.DailyItem]).then((result) => {
        let displayItem = <Array<Object>>result;
        displayItem.forEach(element => {
          if (element["QId"] == 1)
            maintenanceTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        maintenanceTemplate += '<p>What do I need to do every day to stay well or stay on track with my goals?</p>'
        let displayItemsone = <Array<Object>>result;
        displayItemsone.forEach(element => {
          if (element["QId"] == 2)
            maintenanceTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        maintenanceTemplate += '<p>What things might I need to do on some days to stay well? When or how often do I need to do them?</p>'
        let displayItemsec = <Array<Object>>result;
        displayItemsec.forEach(element => {
          if (element["QId"] == 3)
            maintenanceTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        maintenanceTemplate += '<p>What does a typical day look like when I am taking care of my wellness or staying focused on my goals? What things would I do and when would I do them?</p>'
        let displayItemsecs = <Array<Object>>result;
        displayItemsecs.forEach(element => {
          if (element["QId"] == 4)
            maintenanceTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        resolve(maintenanceTemplate);
      });
    });
  }
  // To get template for Triggers
  GetTriggersTemplate(): any {
    let triggerstemplate = "";
    return new Promise((resolve, reject) => {
      triggerstemplate += '<h3>Stressors</h3>'
        + '<p>Stressors are things that happen that can cause a reaction,  such as reminders of specific events, anniversaries of losses, or personal interactions or situations that make us feel scared, helpless or out of control.</p>'
      triggerstemplate += '<p>What things might make me feel unwell or throw me off track if they happened?</p>'
      this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.Triggers]).then((result) => {
        let displayItems1 = <Array<Object>>result;
        displayItems1.forEach(element => {
          if (element["QId"] == 1)
            triggerstemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        triggerstemplate += '<p><strong>Action Plan for Stressors</strong></p>'
          + '<p>What actions will I take and what wellness tools will I use to respond to stressors that come up?</p>'
        let displayItems2 = <Array<Object>>result;
        displayItems2.forEach(element => {
          if (element["QId"] == 2)
            triggerstemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        triggerstemplate += '<p>What can I do to limit my exposure to stressors?</p>'
        let displayItems3 = <Array<Object>>result;
        displayItems3.forEach(element => {
          if (element["QId"] == 3)
            triggerstemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        resolve(triggerstemplate);
      });
    });
  }

  // To get template for Early Warning Signs
  GetEarlySignsTemplate(): any {
    let EarlySignsTemplate = "";
    return new Promise((resolve, reject) => {
      EarlySignsTemplate += '<h3>Early Warning Signs</h3>'
        + '<div></div>'
        + '<p>Early warning signs are changes in the way you think, act, or feel. They are signs that you need to take action before things get worse.</p>';
      EarlySignsTemplate += '<p>What are my early warning signs?</p>'
      this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.WarningSigns]).then((result) => {
        let displayItems = <Array<Object>>result;
        displayItems.forEach(element => {
          if (element["QId"] == 1)
            EarlySignsTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        EarlySignsTemplate += '<p><strong>Action Plan for Early Warning Signs</strong></p>' +
          ' <p>What actions will I take and what wellness tools will I use to respond when I notice my early warning signs?</p>';
        let Itemsq1 = <Array<Object>>result;
        Itemsq1.forEach(element => {
          if (element["QId"] == 21)
            EarlySignsTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        EarlySignsTemplate += '<p>What additional actions or tools might I use to respond to my early warning signs if I feel like they will help?</p>'
        let Items = <Array<Object>>result;
        Items.forEach(element => {
          if (element["QId"] == 2)
            EarlySignsTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        resolve(EarlySignsTemplate);
      });
    });
  }

  // To get template for Breaking Down Template
  GetBreakingDownTemplate(): any {
    let BreakingDownTemplate = "";
    return new Promise((resolve, reject) => {
      BreakingDownTemplate += '<h3>When Things Are Breaking Down or Getting Much Worse</h3>'
        + '<p>When things are breaking down or getting much worse, a crisis may be in our near future.</p>'
        + '<p>What are my signs that things are breaking down or getting much worse?</p>'
      this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.BreakingDown]).then((data) => {
        let displayItem = <Array<Object>>data;
        displayItem.forEach(element => {
          if (element["QId"] == 1)
            BreakingDownTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        BreakingDownTemplate += '<p><strong>Action Plan for When Things Are Breaking Down</strong></p>' +
        '<p>What actions will I take and what wellness tools will I use to respond when things are breaking down or getting much worse?</p>';
      let displayItemsq1 = <Array<Object>>data;
      displayItemsq1.forEach(element => {
        if (element["QId"] == 20)
          BreakingDownTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
      });
        BreakingDownTemplate += '<p>What additional actions or tools might I use to respond to signs that things are breaking down or getting much worse if I feel like they will help?</p>'
        let displayItems = <Array<Object>>data;
        displayItems.forEach(element => {
          if (element["QId"] == 2)
            BreakingDownTemplate += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        resolve(BreakingDownTemplate);
      });
    });
  }

  GetWhenWellTemplate(): any {
    let templateData = "";
    templateData = template.WhenWellTemplate;
    return new Promise((resolve, reject) => {
      this.database.executeReader(constant.SELECT_WHENWELL, []).then((data) => {
        let dataWhenWell = <Array<Object>>data;
        if (dataWhenWell.length > 0) {
          templateData += '<p>This plan was created on:</p>';
          let date = (data[0]["WhenWellDate"] != null && data[0]["WhenWellDate"] != undefined) ? new Date(data[0]["WhenWellDate"]).getFullYear() + "-" + (new Date(data[0]["WhenWellDate"]).getMonth() + 1) + "-" + new Date(data[0]["WhenWellDate"]).getDate() : "";
          templateData += '<p>' + date + '</p>';
        }
        let dynamicQuery = constant.SELECT_CRISIS_LOOKUP_MULTI + "('" + enums.CrisisColumns.WhenWell + "','" +
          enums.CrisisColumns.WhenNotWell + "') AND CrisisPageType =" + enums.Crisis.WhenWell;
        this.database.executeReader(dynamicQuery, []).then((result) => {
          let data = <Array<Object>>result;
          data.forEach(element => {
            switch (element["ColumnName"]) {
              case "1":
                templateData += '<p>This is what it looks like when I am well:</p>';
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
                break;
              case "15":
                templateData += '<p>This is what it looks like when I am not well:</p>';
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
                break;
            }
          });
          resolve(templateData);
        });
      });
    });
  }

  // To get Crisis Column
  GetCrisisColumn(ColumnName) {
    let columnName;
    let Content;
    let pageType
    switch (ColumnName) {
      case "Mysupporter":
        pageType = enums.CrisisColumns.MySupporters;
        columnName = enums.Crisis.MySupporters;
        Content = template.MySupporters;
        break;
      case "PlanNotRequired":
        pageType = enums.CrisisColumns.PlanNoLonger;
        columnName = enums.Crisis.PlanNoLonger;
        Content = template.PlanNoLonger;
    }
    return { columnName, Content, pageType };
  }

  //Crisis Single list Template Method for When Well & My Supporter & Plan No Longer
  GetCrisisItemTemplate(ColumnName): any {
    let templateData = "";
    let CrisisColumn = this.GetCrisisColumn(ColumnName);
    let columnName = CrisisColumn["columnName"];
    let pageType = CrisisColumn["pageType"];
    let params = [pageType, columnName];
    let Content = CrisisColumn["Content"];
    return new Promise((resolve, reject) => {
      this.database.executeReader(constant.SELECT_CRISIS_LOOKUP, params).then((result) => {
        let displayItems = <Array<Object>>result;
        displayItems.forEach((element) => {
          templateData += '<li>' + this.NF(element["Content"]) + '</li>';
        });
        resolve(Content + templateData);
      });
    });
  }

  // To get template for Home Community
  GetHomeCommunityTemplate(): any {
    let templateData = "";
    return new Promise((resolve, reject) => {
      templateData += '<p>Many people are setting up plans so that they can stay at home and still get the care they need if'
        + ' they are in a crisis by having around the clock care from supporters and regular visits with health care providers.'
        + ' Many community care and respite centers are being setup as an alternative to hospitalization where you can be'
        + ' supported by peers until you feel better and can take care of yourself. Set up a plan so'
        + ' that you can stay at home or in the community and still get the care and support you need.</p>'
      this.database.executeReader(constant.SELECT_HOME_COMMUNITY, []).then((result) => {
        let data = <Array<Object>>result;
        if (data.length > 0) {
          templateData += '<label>' + this.NF(data[0]["HomeCommunity"]) + '</label>';
        }
        resolve(templateData);
      });
    });
  }

  // To get template for Medical Care
  GetMedicalCareTemplate(): any {
    let templateData = "";
    return new Promise((resolve, reject) => {
      templateData += '<p>The following are the medical care form for supporters to reference in a crisis.</p>'
      templateData += '<p><strong>Doctor</strong></p>';
      this.database.executeReader(constant.SELECT_LOOKUP_DOCTOR, []).then((result) => {
        let lookUpDoctor = <Array<Object>>result;
        lookUpDoctor.forEach((element) => {
          templateData += '<label>Name : ' + this.NF(element["DoctorName"]) + '</label>';
          templateData += '</br>'
          templateData += '<label>Phone : ' + this.NF(element["DoctorPhone"]) + '</label>';
          templateData += '</br>'
          templateData += '<label>Speciality : ' + this.NF(element["DoctorSpeciality"]) + '</label>';
          templateData += '<hr>';
        });
        templateData += '<p><strong>Counselor/Sponsor/Case Manager</strong></p>';
        this.database.executeReader(constant.SELECT_LOOKUP_CASE, []).then((result) => {
          let lookUpCase = <Array<Object>>result;
          lookUpCase.forEach((element) => {
            templateData += '<label>Name : ' + this.NF(element["CaseName"]) + '</label>';
            templateData += '</br>'
            templateData += '<label>Phone : ' + this.NF(element["CasePhone"]) + '</label>';
            templateData += '<hr>';
          });
          templateData += '<p><strong>Pharmacy</strong></p>';
          this.database.executeReader(constant.SELECT_MEDICAL_CARE, []).then((result) => {
            let data = <Array<Object>>result;
            if (data.length > 0) {
              templateData += '<label>Pharmacy Name : ' + this.NF(data[0]["PharmacyName"]) + '</label>';
              templateData += '</br>'
              templateData += '<label>Pharmacy Phone : ' + this.NF(data[0]["PharmacyPhone"]) + '</label>';
            }
            templateData += '<p><strong>Current Medications</strong></p>'
            this.database.executeReader(constant.SELECT_LOOKUP_MEDICATIONS, []).then((result) => {
              let lookUpMedi = <Array<Object>>result;
              lookUpMedi.forEach((element) => {
                templateData += '<label>Name : ' + this.NF(element["MediName"]) + '</label>';
                templateData += '</br>'
                templateData += '<label>Dosage : ' + this.NF(element["MediDosage"]) + '</label>';
                templateData += '</br>'
                templateData += '<label>When Taken : ' + this.NF(element["MediWhen"]) + '</label>';
                templateData += '<hr>';
              });
              let dynamicQuery = constant.SELECT_CRISIS_LOOKUP_MULTI + "('" + enums.CrisisColumns.AcceptableMedi + "','" + enums.CrisisColumns.AvoidMedi + "','" +
                enums.CrisisColumns.Allergy + "') AND CrisisPageType =" + enums.Crisis.MedicalCare;
              this.database.executeReader(dynamicQuery, []).then((result) => {
                let data = <Array<Object>>result;
                data.forEach(element => {
                  switch (element["ColumnName"]) {
                    case "6":
                      templateData += '<p><strong>Acceptable Medications </strong></p>';
                      templateData += '<li>' + this.NF(element["Content"]) + '</li>';
                      break;
                    case "7":
                      templateData += '<p><strong>Medications to Avoid</strong></p>';
                      templateData += '<li>' + this.NF(element["Content"]) + '</li>';
                      break;
                    case "5":
                      templateData += '<p><strong>Allergies</strong></p>';
                      templateData += '<li>' + this.NF(element["Content"]) + '</li>';
                      break;
                  }
                });
                resolve(templateData);
              });
            });
          });
        });
      });
    });
  }

  // To get template for Who Takes care

  GetWhoTakesCareTemplate(): any {
    let templateData = "";
    return new Promise((resolve, reject) => {
      templateData += '<p><h3><strong>Who Takes care</strong></h3></p>'
      templateData += '<p>List at least five people (if possible) that you trust to take responsibiliity for your care'
        + ' when you notice the signs in the previous section. They should be mostly friends and family because'
        + ' healthcare providers may not be available when you need them.</p>';
      this.database.executeReader(constant.SELECT_LOOKUP_TAKESCARE, []).then((result) => {
        let careItems = <Array<Object>>result;
        careItems.forEach((element) => {
          templateData += '<label><strong>Who (name) : </strong>' + this.NF(element["CareName"]) + '</label>';
          templateData += '</br>'
          templateData += '<label>Phone : ' + this.NF(element["CarePhone"]) + '</label>';
          templateData += '</br>'
          templateData += '<label>Email : ' + this.NF(element["CareMail"]) + '</label>';
          templateData += '</br>'
          templateData += '<hr>';
        });
        templateData += '<h3><strong>Who Does Not take over</strong></h3>';
        this.database.executeReader(constant.SELECT_LOOKUP_NOT_TAKESCARE, []).then((result) => {
          let displayItems = <Array<Object>>result;
          displayItems.forEach((element) => {
            templateData += '<label><strong>Who (name) : </strong>' + this.NF(element["NoCareName"]) + '</label>';
            templateData += '</br>'
            templateData += '<label>Phone : ' + this.NF(element["NoCarePhone"]) + '</label>';
            templateData += '</br>'
            templateData += '<label>Email : ' + this.NF(element["NoCareMail"]) + '</label>';
            templateData += '</br>'
            templateData += '<hr>';
          });
          resolve(templateData);
        });
      });
    });
  }

  // To get template for Acceptable Treatment
  GetAcceptableTreatment(): any {
    let templateData = "";
    return new Promise((resolve, reject) => {
      let dynamicQuery = constant.SELECT_CRISIS_LOOKUP_MULTI + "('" + enums.CrisisColumns.AcceptableTreatment + "','" + enums.CrisisColumns.UnacceptableTreatment
        + "') AND CrisisPageType =" + enums.Crisis.Treatment;
      this.database.executeReader(dynamicQuery, []).then((result) => {
        let data = <Array<Object>>result;
        data.forEach(element => {
          switch (element["ColumnName"]) {
            case "11":
              templateData += '<p><strong>List the treatments that make you feel better</strong></p>';
              templateData += '<li>' + this.NF(element["Content"]) + '</li>';
              break;
            case "12":
              templateData += '<p><strong>List the treatments that should be avoided</strong></p>';
              templateData += '<li>' + this.NF(element["Content"]) + '</li>';
              break;
          }
        });
        resolve(templateData);
      });
    });
  }

  // To get template for Acceptable Hospital
  GetAcceptableHospital(): any {
    let templateData = "";
    return new Promise((resolve, reject) => {
      templateData += '<p>Enter information about the hospital(s) and/or treatment facilities which are acceptable and'
        + ' unacceptable for you when there is a crisis. </p>';
      let dynamicQuery = constant.SELECT_CRISIS_LOOKUP_MULTI + "('" + enums.CrisisColumns.AcceptableHospital + "','" + enums.CrisisColumns.UnacceptableHospital
        + "') AND CrisisPageType =" + enums.Crisis.Hospital;
      this.database.executeReader(dynamicQuery, []).then((result) => {
        let data = <Array<Object>>result;
        data.forEach(element => {
          switch (element["ColumnName"]) {
            case "13":
              templateData += '<p><strong>Acceptable hospital or treatment facilities</strong></p>';
              templateData += '<li>' + this.NF(element["Content"]) + '</li>';
              break;
            case "14":
              templateData += '<p><strong>Unacceptable hospital or treatment facilities</strong></p>';
              templateData += '<li>' + this.NF(element["Content"]) + '</li>';
              break;
          }
        });
        resolve(templateData);
      });
    });
  }

  //To get Crisis Template for Help others 
  GetHelpOthersTemplate(): any {
    let templateData = "";
    return new Promise((resolve, reject) => {
      templateData += '<p><h3><strong>When I' + "'" + 'm in a Crisis</strong></h3></p>';
      templateData += '  <p><strong>Things that Help</strong></p>';
      this.database.executeReader(constant.SELECT_LOOKUP_THINGSHELP, []).then((result) => {
        let careItems = <Array<Object>>result;
        careItems.forEach((element) => {
          templateData += '<label><strong>Name: </strong>' + this.NF(element["HelpName"]) + '</label>';
          templateData += '</br>'
          templateData += '<label>Phone : ' + this.NF(element["HelpPhone"]) + '</label>';
          templateData += '</br>'
          templateData += '<label>Email : ' + this.NF(element["HelpEmail"]) + '</label>';
          templateData += '</br>'
          templateData += '<hr>';
        });
        templateData += '<p><strong>Things that Dont Help</strong></p>';
        this.database.executeReader(constant.SELECT_LOOKUP_THINGSDONTHELP, []).then((result) => {
          let displayItems = <Array<Object>>result;
          displayItems.forEach((element) => {
            templateData += '<label><strong>Name: </strong>' + this.NF(element["NoHelpName"]) + '</label>';
            templateData += '</br>'
            templateData += '<label>Phone : ' + this.NF(element["NoHelpPhone"]) + '</label>';
            templateData += '</br>'
            templateData += '<label>Email : ' + this.NF(element["NoHelpEmail"]) + '</label>';
            templateData += '</br>'
            templateData += '<hr>';
          });
          templateData += '<p><strong>Tasks for others</strong></p>';
          this.database.executeReader(constant.SELECT_LOOKUP_OTHERS, []).then((result) => {
            let displayItems = <Array<Object>>result;
            displayItems.forEach((element) => {
              templateData += '<label><strong>Name: </strong>' + this.NF(element["TaskName"]) + '</label>';
              templateData += '</br>'
              templateData += '<label>Phone : ' + this.NF(element["TaskPhone"]) + '</label>';
              templateData += '</br>'
              templateData += '<label>Email : ' + this.NF(element["TaskEmail"]) + '</label>';
              templateData += '</br>'
              templateData += '<hr>';
            });
            resolve(templateData);
          });
        });
      });
    });
  }

  //Get options Method in Post Crisis

  GetYesOrNo(data): any {
    let isYesOrNo;
    switch (data) {
      case "1":
        isYesOrNo = "Yes";
        break;
      case "2":
        isYesOrNo = "No";
        break;
      default:
        isYesOrNo = "-";
        break;
    }
    return isYesOrNo;
  }

  //Get tools Template Method

  GetToolListTemplate(params): any {
    let templateData = "";
    return new Promise((resolve, reject) => {
      this.database.executeReader(constant.SELECT_REFERENCE, params).then((result) => {
        let data = <Array<Object>>result;
        let masterCounter = data.length;
        if (data.length > 0) {
          masterCounter = 0;
          let refe = data[0]['ReferenceId'];
          let selectToolQuery = constant.SELECT_TOOL + "(" + refe + ")";
          this.database.executeReader(selectToolQuery, []).then((result) => {
            let toolData = <Array<Object>>result;
            let counter = toolData.length;
            toolData.forEach(element => {
              let asset = element["IconId"] == null ? "" : Icon.ICONS.find(x => x.id == element["IconId"]).asset;
              this.GetImageData(asset, 24, 23).then((imageData) => {
                templateData += imageData != "" ? '<img src="' + imageData + '"/>' : "";
                templateData += '<span style="margin-left: 1.2rem">' + element["Content"] + '</span>';
                templateData += '</br>'
                counter--;
                if (masterCounter == 0 && counter == 0)
                  resolve(templateData);
              });
            });
          });
        } else {
          resolve(templateData);
        }
      });
    });
  }



  //Post Crisis Template Method - Start
  GetPostCrisisTemplate(): any {
    let templateData = "";
    return new Promise((resolve, reject) => {
      //page 1
          templateData += '<h3>Post-Crisis Plan </h3>'
            + '<p text-wrap> After a crisis, it can take time to get back to "normal." Use your post-crisis plan to develop your plan for easing back into your responsibilities, dealing with any consequences resulting from the crisis, and showing appreciation for the people who supported you during the crisis.</p>';
          templateData += '<p>1. This is what I look like when I'+"'"+'m out of the crisis and ready to use this post-crisis plan: </p>';
          this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.DailyItem]).then((result) => {
            let displayIt = <Array<Object>>result;
            displayIt.forEach(element => {
              if (element["QId"] == 5)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            templateData += '<p>2. This is how I want to feel when I'+"'"+'m fully recovered from this crisis: </p>';
            let displayon = <Array<Object>>result;
            displayon.forEach(element => {
              if (element["QId"] == 6)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            templateData += '<p>3. What are choices I made or things I did that contributed to this crisis?</p>';
            this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
              let feel = <Array<Object>>result;
              if(feel.length > 0)
              {
            templateData += '<p style="margin-left:5px">' + this.NF(feel[0]["FeelRecovered"]) + '</p>';
              }
         
            templateData += '<p>4. What did I learn from this crisis? </p>';
            this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
              let data = <Array<Object>>result;
              if(data.length > 0){
            templateData += '<p style="margin-left:5px">' + this.NF(data[0]["LearnInCrisis"]) + '</p>';
              }
           
            templateData += '<p>5. What are changes I want to make in my lifestyle and life goals? When and how will I make these changes?  </p>';
            this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
              let data = <Array<Object>>result;
              if(data.length > 0){
            templateData += '<p style="margin-left:5px">' + this.NF(data[0]["LifeStyle"]) + '</p>';
              }
           
            //page 2 

            templateData += '<p>6. What help do I want or need to make these changes? </p>';
            this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
              let data = <Array<Object>>result;
              if(data.length > 0){
            templateData += '<p style="margin-left:5px">' + this.NF(data[0]["OutOfCrisis"]) + '</p>';
              }
            this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.DailyItem]).then((result) => {
            templateData += '<p>7. These are changes in my WRAP that might help prevent a crisis in the future:  </p>';
            let displayItemq1 = <Array<Object>>result;
            displayItemq1.forEach(element => {
              if (element["QId"] == 7)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            templateData += '<p>8. These are things that will ease my transition back to everyday life if they are taken care of:  </p>';
            let displayItemq2 = <Array<Object>>result;
            displayItemq2.forEach(element => {
              if (element["QId"] == 8)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            templateData += '<p>9. These are things I can ask someone else to do for me: </p>';
            let displayItemq3 = <Array<Object>>result;
            displayItemq3.forEach(element => {
              if (element["QId"] == 9)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            templateData += '<p>10. These are things that can wait until I' + "'" + 've successfully transitioned out of the crisis and into recovery:</p>';
            let displayItemq4 = <Array<Object>>result;
            displayItemq4.forEach(element => {
              if (element["QId"] == 10)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            templateData += '<p>11. When I'+"'"+'m recovering from a crisis, I want the following people to support me in these ways (list name, phone number, roles or tasks, and any additional details for each person): </p>';
            this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
              let data = <Array<Object>>result;
              if(data.length > 0){
            templateData += '<p style="margin-left:5px">' + this.NF(data[0]["PreventRepercussion"]) + '</p>';
              }
           
            templateData += '<p>12. These are things I need to do for myself every day:  </p>';
            this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.DailyItem]).then((result) => {
            let displayItemq5 = <Array<Object>>result;
            displayItemq5.forEach(element => {
              if (element["QId"] == 11)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            templateData += '<p>13. These are other things I might need to do every day:  </p>';
            let displayItemq6 = <Array<Object>>result;
            displayItemq6.forEach(element => {
              if (element["QId"] == 12)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            templateData += '<p>14. These are people, places, and things I need to avoid:  </p>';
            let displayItemq7 = <Array<Object>>result;
            displayItemq7.forEach(element => {
              if (element["QId"] == 13)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            templateData += '<p>15. These are things I need to do to prevent more negative effects from this crisis:</p>';
            let displayItemq8 = <Array<Object>>result;
            displayItemq8.forEach(element => {
              if (element["QId"] == 14)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            //page 4
            templateData += '<p>16. These are the people I need to thank (include name, phone number, and why you'+"'"+'re thankful for each person): </p>';
            this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
              let data = <Array<Object>>result;
              if(data.length > 0){
            templateData += '<p style="margin-left:5px">' + this.NF(data[0]["thank"]) + '</p>';
              }
           
            templateData += '<p>17. These are people I need to apologize to or make amends with and when I will do it (include name, phone number, and when and how you'+"'"+'ll make things right for each person): </p>';
            this.database.executeReader(constant.SELECT_POST_CRISIS, []).then((result) => {
              let data = <Array<Object>>result;
              if(data.length > 0){
            templateData += '<p style="margin-left:5px">' + this.NF(data[0]["apologize"]) + '</p>';
              }
 
            resolve(templateData);
          });
        });
        });
        });
      }); 
    });
   });
    });
   }); 
  });
    });
  }
  GetCrisisTemplate(): any {
    let templateData = "";
    return new Promise((resolve, reject) => {
      //page 1
      templateData += '<h3> Crisis Plan </h3>'
        + '<p text-wrap> Your crisis plan is a tool to plan for the support you may need when you face a crisis. This plan can be the basis for an advance directive, but it is not a legal document. Use your crisis plan to document your needs and preferences and explain to others how you want to be supported through a crisis.</p>';
        templateData += '<p>1. This plan was created on this date and replaces any plan with earlier dates:</p>';
        this.database.executeReader(constant.SELECT_WHENWELL, []).then((data) => {
          let dataWhenWell = <Array<Object>>data;
          console.log("datawhendate",dataWhenWell);
          if(dataWhenWell.length > 0){
            let date = (dataWhenWell[0]["WhenWellDate"]) != null && (dataWhenWell[0]["WhenWellDate"]) != undefined ? new Date(dataWhenWell[0]["WhenWellDate"]).getFullYear() + "-" + new Date(dataWhenWell[0]["WhenWellDate"]).getMonth() + 1 + "-" + new Date(dataWhenWell[0]["WhenWellDate"]).getDate() : "";
          templateData += '<p>' + date + '</p>';
          }
      console.log("q1",templateData);
          templateData += '<p>2. This is what I look like when I'+"'"+'m well:  </p>';
          this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.DailyItem]).then((result) => {
            if(result){
            let displayq9 = <Array<Object>>result;
            displayq9.forEach(element => {
              if (element["QId"] == 15)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });
            console.log("q2",templateData);
            templateData += '<p>3. This is what I look like when it gets too bad for me to handle on my own: </p>';
            let displayq10 = <Array<Object>>result;
            displayq10.forEach(element => {
              if (element["QId"] == 16)
                templateData += '<li>' + this.NF(element["Content"]) + '</li>';
            });}
            console.log("q3",templateData);
                templateData += '<p>4. If my behavior endangers or has negative effects on me or others I want my supporters to: </p>';
                this.database.executeReader(constant.SELECT_WHATISWRAP, []).then((result) => {
                  let data = <Array<Object>>result;
                  if(data.length > 0){
                  console.log("data",data);
                templateData += '<p style="margin-left:5px">' + (data[0]["endangers"]) + '</p>';
                  }
                templateData += '<p>5. If my supporters disagree on a course of action, I want them to settle the dispute in this way: </p>';
                this.database.executeReader(constant.SELECT_WHATISWRAP, []).then((result) => {
                  let data = <Array<Object>>result;
                  console.log("data",data);
                  if(data.length > 0){
                templateData += '<p style="margin-left:5px">' + (data[0]["disagree"]) + '</p>';
                  }
                templateData += '<p>6. When I'+"'"+'m in a crisis, I want the following people to support me in these ways (list name, role, phone number, and any other notes for each person): </p>';
                this.database.executeReader(constant.SELECT_WHATISWRAP, []).then((result) => {
                  let data = <Array<Object>>result;
                  if(data.length > 0){
                  console.log("data",data);
                templateData += '<p style="margin-left:5px">' + (data[0]["following"]) + '</p>';
                  }
                templateData += '<p>7. When I'+"'"+'m in a crisis, the following people should not be involved in supporting me or making decisions on my behalf (list name, relationship, and any details for each person): </p>';
                this.database.executeReader(constant.SELECT_WHATISWRAP, []).then((result) => {
                  let data = <Array<Object>>result;
                  if(data.length > 0){
                  console.log("data",data);
                templateData += '<p style="margin-left:5px">' + (data[0]["decisions"]) + '</p>';
                  }
              console.log("q4,5,6,7",templateData);
                templateData += '<p>8. When I'+"'"+'m in a crisis, please do these things to help me feel better and get back to wellness: </p>';
                this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.DailyItem]).then((result) => {
                  if(result){
                  let displayq11 = <Array<Object>>result;
                  displayq11.forEach(element => {
                    if (element["QId"] == 17)
                      templateData += '<li>' + this.NF(element["Content"]) + '</li>';
                  });
                }
                  console.log("q8",templateData);
                  //page 3 
                  templateData += '<p>9. When I'+"'"+'m in a crisis, please do not do these things, which do not help and would make things much worse: </p>';
                  this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.DailyItem]).then((result) => {
                    if(result){
                  let displayq12 = <Array<Object>>result;
                  displayq12.forEach(element => {
                    if (element["QId"] == 18)
                      templateData += '<li>' + this.NF(element["Content"]) + '</li>';
                  });
                }
                  console.log("q9",templateData);
                  templateData += '<p>10. When I'+"'"+'m in a crisis, these tasks need to be taken care of, and here'+"'"+'s who I want to do them until I can take over responsibility for them again (list the task or responsibility, the person you want to handle it, their phone number, and any notes or instructions for each task): </p>';
                  this.database.executeReader(constant.SELECT_WHATISWRAP, []).then((result) => {
                    let data = <Array<Object>>result;
                    console.log("data",data);
                    if(data.length > 0){
                  templateData += '<p style="margin-left:5px">' + (data[0]["careof"]) + '</p>';
                    }
                  templateData += '<p>11. These are the signs that will let my supporters know it'+"'"+'s safe to stop using this crisis plan:</p>';
                  this.database.executeReader(constant.SELECT_DISPLAYITEM, [enums.Page.DailyItem]).then((result) => {
                    if(result){
                    let displayq15 = <Array<Object>>result;
                    displayq15.forEach(element => {
                      if (element["QId"] == 19)
                        templateData += '<li>' + this.NF(element["Content"]) + '</li>';
                    });
                  }
                    console.log("q11",templateData);
                    resolve(templateData);
                 
                });
              });
          });
        });
      });
    });});
        });
      });
    });
    });
  }
  //Post Crisis Template Method - End

  // To get template for Resume Responsibility
  GetResponsibilityTemplate(): any {
    let templateData = "";
    templateData += '<p>Develop your plan for resuming responsibilities by defining the responsibility,'
      + ' who helped with the responsibility, and plans to resume responsibility.</p>';
    return new Promise((resolve, reject) => {
      this.database.executeReader(constant.SELECT_RESUME_RESPONSIBILITY, []).then(result => {
        let resumeItems = <Array<Object>>result;
        let masterCounter = resumeItems.length;
        if (resumeItems.length > 0) {
          resumeItems.forEach(element => {
            templateData += '<p>Responsibility</p><br/>';
            templateData += this.NF(element["Responsibility"]);
            templateData += '<p>Who has been doing this while I was in crisis</p><br/>';
            templateData += this.NF(element["DoingCrisis"]);
            templateData += '<p>While I am resuming this responsibility, I need</p><br/>';
            templateData += this.NF(element["WhileResuming"]);
            templateData += '<p>to</p><br/>';
            templateData += this.NF(element["ToResponsibility"]);
            templateData += '<p>Plan for resuming</p>'
            let resumeId = this.NF(element["Id"]);
            masterCounter--;
            this.database.executeReader(constant.SELECT_LOOKUP_RESPONSIBILITY, [resumeId]).then(result => {
              let lookUpData = <Array<Object>>result;
              let counter = lookUpData.length;
              lookUpData.forEach(lookup => {
                templateData += '<li>' + this.NF(lookup["Content"]) + '<li>';
                counter--;
                if (counter == 0 && masterCounter == 0)
                  resolve(templateData);
              });
              if (masterCounter == 0 && counter == 0)
                resolve(templateData);
            });
          });
        } else {
          resolve(templateData);
        }
      });
    });
    
  }

}
