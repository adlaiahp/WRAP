import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Baseclass } from '../../../../../../providers/baseclass/baseclass';
import { Database } from '../../../../../../providers/database/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as constant from '../../../../../../providers/constants/constants';
import * as enums from '../../../../../../providers/enums/enums';

/**
 * Generated class for the MedicalCarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medical-care',
  templateUrl: 'medical-care.html',
})
export class MedicalCarePage {

  isAddDoc = true;
  DoctorForm: FormGroup;
  isAddCase = true;
  isAddMedi = true;
  isAccMedi = false;
  isAvoidMedi = false;
  isAllergy = false;
  addCase = [];
  insertedId = 0;
  caseItems = [];
  doctorItems = [];
  mediItems = [];
  acceptItems = [];
  avoidItems = [];
  allergyItems = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public baseclass: Baseclass,
    public database: Database,
    public formBuilder: FormBuilder,
    private events: Events) {
    this.DoctorForm = formBuilder.group({
      "PharmacyName": [''],
      "PharmacyPhone": [''],
      "AcceptMedi": [''],
      "AvoidMedi": [''],
      "Allergy": ['']
    });
    events.subscribe("Update:Crisis:Medicare", (data) => {
      if (data.Content != null && data.Content != undefined && data.Content != "") {
        this.updateSingleItem(data.Content, data.Id);
      }
      else {
        this.GetMediCare();
      }
    });
  }

  ionViewDidEnter() {
    this.baseclass.CheckCrisisTableExists().then((result) => {
      if (result == false) {
        this.database.TableManipulation("Crisis");
      }
      this.GetMediCare();
    });
  }

  GetMediCare(event: any = 0) {
    this.caseItems = [];
    this.doctorItems = [];
    this.mediItems = [];
    this.acceptItems = [];
    this.allergyItems = [];
    this.avoidItems = [];
    this.database.executeReader(constant.SELECT_MEDICAL_CARE, []).then((result) => {
      let data = <Array<Object>>result;
      this.DoctorForm.patchValue({
        PharmacyName: data[0]["PharmacyName"],
        PharmacyPhone: data[0]["PharmacyPhone"]
      });
    });
    this.database.executeReader(constant.SELECT_LOOKUP_CASE, []).then((result) => {
      let data = <Array<Object>>result;
      this.caseItems = data;
      this.ShowActiveFields(event);
    });
    this.database.executeReader(constant.SELECT_LOOKUP_DOCTOR, []).then((result) => {
      let data = <Array<Object>>result;
      this.doctorItems = data;
      this.ShowActiveFields(event);
    });
    this.database.executeReader(constant.SELECT_LOOKUP_MEDICATIONS, []).then((result) => {
      let data = <Array<Object>>result;
      this.mediItems = data;
      this.ShowActiveFields(event);
    });
    let dynamicQuery = constant.SELECT_CRISIS_LOOKUP_MULTI + "('" + enums.CrisisColumns.AcceptableMedi + "','" + enums.CrisisColumns.AvoidMedi + "','" +
      enums.CrisisColumns.Allergy + "') AND CrisisPageType =" + enums.Crisis.MedicalCare;
    this.database.executeReader(dynamicQuery, []).then((result) => {
      let data = <Array<Object>>result;
      if (data.length > 0) {
        data.forEach(element => {
          switch (element["ColumnName"]) {
            case "6":
              this.acceptItems.push(element);
              break;
            case "7":
              this.avoidItems.push(element);
              break;
            case "5":
              this.allergyItems.push(element);
              break;
          }
        });
      }
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  InsertSingleList(columnName): void {
    let params;
    switch (columnName) {
      case "AcceptableMedi":
        let dataAccept = this.DoctorForm.value.AcceptMedi;
        let valueAccept;
        if (dataAccept == null) {
          dataAccept = "";
        }
        valueAccept = dataAccept.toString().trim();
        if (valueAccept != null && valueAccept != undefined && valueAccept != "") {
          params = [valueAccept, enums.CrisisColumns.AcceptableMedi, enums.Crisis.MedicalCare];
        } else {
          this.isAccMedi = false;
        }
        break;
      case "AvoidMedi":
        let dataAvoid = this.DoctorForm.value.AvoidMedi;
        let valueAvoid;
        if (dataAvoid == null) {
          dataAvoid = "";
        }
        valueAvoid = dataAvoid.toString().trim();
        if (valueAvoid != null && valueAvoid != undefined && valueAvoid != "") {
          params = [valueAvoid, enums.CrisisColumns.AvoidMedi, enums.Crisis.MedicalCare];
        } else {
          this.isAvoidMedi = false;
        }
        break;
      case "Allergy":
        let dataAllergy = this.DoctorForm.value.Allergy;
        let valueAllergy;
        if (dataAllergy == null) {
          dataAllergy = "";
        }
        valueAllergy = dataAllergy.toString().trim();
        if (valueAllergy != null && valueAllergy != undefined && valueAllergy != "") {
          params = [valueAllergy, enums.CrisisColumns.Allergy, enums.Crisis.MedicalCare];
        } else {
          this.isAllergy = false;
        }
        break;
    }
    this.database.executeNonQuery(constant.INSERT_CRISIS_LOOKUP, params).then((result) => {
      this.DoctorForm["controls"]["AcceptMedi"].reset();
      this.DoctorForm["controls"]["AvoidMedi"].reset();
      this.DoctorForm["controls"]["Allergy"].reset();
      this.GetMediCare();
    }, (error1) => {
      console.log("ERROR: ", error1);
    });
  }

  updateSingleItem(Data, Id) {
    if (Data != null && Data != undefined && Data != "") {
      let params = [Data, Id];
      this.database.executeNonQuery(constant.UPDATE_CRISIS_LOOKUP, params).then((result) => {
        this.GetMediCare();
      }, (error1) => {
        console.log("ERROR: ", error1);
      });
    }
  }

  deleteSingleItem(Id, ColumnName) {
    let dynamicQuery = constant.DELETE_CRISIS_LOOKUP;
    let params;
    if (Id == 0) {
      switch (ColumnName) {
        case 'AcceptableMedi':
          this.isAccMedi = false;
          break;
        case 'AvoidMedi':
          this.isAvoidMedi = false;
          break;
        case 'Allergy':
          this.isAllergy = false;
          break;
      }
      this.GetMediCare();
    } else {
      params = [Id];
      this.database.executeNonQuery(dynamicQuery, params).then((result) => {
        this.GetMediCare();
      }, (error) => {
        console.log("Error :Crisis :Medicare :DeleteSingleList :", error);
      });
    }
  }

  ToggleMultiInput(event) {
    event._elementRef.nativeElement.style.opacity = "1";
  }

  ToggleMultiUpdate(event: any, ListName: any, ColumnName: any, Id: any): void {
    let dynamicQuery;
    let params = [event.value, Id];
    event._elementRef.nativeElement.style.opacity = "0.4";
    switch (ListName) {
      case "AddCase":
        this.isAddCase = true;
        dynamicQuery = constant.UPDATE_LOOKUP_CASE + ColumnName + " = ? WHERE Id=?";
        break;
      case "AddDoc":
        this.isAddDoc = true;
        dynamicQuery = constant.UPDATE_LOOKUP_DOCTOR + ColumnName + " =? WHERE Id=?";
        break;
      case "AddMedi":
        this.isAddMedi = true;
        dynamicQuery = constant.UPDATE_LOOKUP_MEDICATIONS + ColumnName + " =? WHERE Id=?";
        break;
    }
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
    });
  }

  AddMultiListItem(ListName: any): void {
    let dynamicQuery;
    switch (ListName) {
      case "AddCase":
        this.isAddCase = false;
        dynamicQuery = constant.INSERT_LOOKUP_CASE;
        break;
      case "AddDoc":
        this.isAddDoc = false;
        dynamicQuery = constant.INSERT_LOOKUP_DOCTOR;
        break;
      case "AddMedi":
        this.isAddMedi = false;
        dynamicQuery = constant.INSERT_LOOKUP_MEDICATIONS;
        break;
    }
    this.database.executeNonQuery(dynamicQuery, []).then((result) => {
      let data = <Array<Object>>result;
      switch (ListName) {
        case "AddCase":
          let newCaseData = { "Id": data["insertId"], "CaseName": "", "CasePhone": "" };
          this.caseItems.push(newCaseData);
          break;
        case "AddDoc":
          let newDocData = { "Id": data["insertId"], "DoctorName": "", "DoctorPhone": "", "DoctorSpeciality": "" };
          this.doctorItems.push(newDocData);
          break;
        case "AddMedi":
          let newMediData = { "Id": data["insertId"], "MediName": "", "MediDosage": "", "MediWhen": "" };
          this.mediItems.push(newMediData);
          break;
      }
    });
    this.GetMediCare();
  }

  ShowActiveFields(event) {
    this.insertedId = 0;
    if (event != 0)
      switch (event.target.offsetParent.id) {
        case "doctorAdd":
          this.isAddDoc = true;
          break;
        case "caseAdd":
          break;
        case "CurrentMedi":
          this.isAddMedi = true;
          break;
      }
  }

  ToggleSingleInput(columnName) {
    switch (columnName) {
      case "AcceptableMedi":
        this.isAccMedi = true;
        break;
      case "AvoidMedi":
        this.isAvoidMedi = true;
        break;
      case "Allergies":
        this.isAllergy = true;
        break;
    }
  }

  ToggleRemove(event) {
    this.insertedId = 0;
    switch (event.currentTarget.id) {
      case "DeleteAvoid":
        this.isAvoidMedi = false;
        break;
      case "DeleteAllergy":
        this.isAllergy = false;
        break;
      case "MediRemove":
        this.isAddMedi = false;
        break;
    }
  }

  DeleteMultiList(ListName, Id): void {
    let dynamicQuery;
    let params = [Id];
    switch (ListName) {
      case "AddCase":
        this.isAddCase = true;
        dynamicQuery = constant.DELETE_LOOKUP_CASE;
        break;
      case "AddDoc":
        this.isAddDoc = true;
        dynamicQuery = constant.DELETE_LOOKUP_DOCTOR;
        break;
      case "AddMedi":
        this.isAddMedi = true;
        dynamicQuery = constant.DELETE_LOOKUP_MEDICATIONS;
        break;
    }
    this.database.executeNonQuery(dynamicQuery, params).then((result) => {
      this.GetMediCare();
    }, (error) => {
      console.log("Error :Crisis :Medicare :DeleteMultiList :" + ListName + ": ", error);
    });
  }

  //For updating individual form fields
  UpdateItem(event) {
    event._elementRef.nativeElement.style.opacity = "0.4";
    let dynamicQuery = "UPDATE CrisisItem SET ";
    let columnName = event._ngControl.name;
    dynamicQuery = dynamicQuery + columnName + "= ?";
    let value = event.value;
    if (value == null) {
      value = "";
    }
    value = value.toString().trim();
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
    this.navCtrl.push("WhoTakesOverPage");
  }

  navigateright() {
    this.navCtrl.push("AcceptableTreatmentPage");
  }

  sendpage(){
    this.baseclass.displayAlert(" ", "Please enter an email address below", "MedicalCare");
  }
}
