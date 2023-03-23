import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//Table constants
export const WHATIS_WRAP = "CREATE TABLE IF NOT EXISTS WHATISWRAP(Id INTEGER PRIMARY KEY, whatisWrap TEXT, PageType INTEGER, hopemean TEXT, increasehope TEXT,"
  + "responsibility TEXT, mywellness TEXT, education TEXT,learnmore TEXT,selfad TEXT, advocate TEXT, support TEXT,build TEXT,endangers TEXT,following TEXT,careof TEXT,decisions TEXT,disagree TEXT)"; 
export const ITEM_DISPLAY = "CREATE TABLE IF NOT EXISTS DISPLAYITEM (Id INTEGER PRIMARY KEY, Content TEXT, PageType INTEGER, QId INTEGER)";
export const WELLNESS_TOOL = "CREATE TABLE IF NOT EXISTS WELLNESSTOOL(Id INTEGER PRIMARY KEY, ReferenceId TEXT, PageType INTEGER)"
export const ITEM_CRISIS = "CREATE TABLE IF NOT EXISTS CrisisItem (Id INTEGER PRIMARY KEY, WhenWellDate TEXT)";
export const CRISIS_LOOKUP = "CREATE TABLE IF NOT EXISTS CrisisLookup (Id INTEGER PRIMARY KEY, Content TEXT, ColumnName TEXT, CrisisPageType INTEGER)";
export const LOOKUP_CASE = "CREATE TABLE IF NOT EXISTS LookUpCase (Id INTEGER PRIMARY KEY,CaseName TEXT,CasePhone TEXT)";
export const LOOKUP_DOCTOR = "CREATE TABLE IF NOT EXISTS LookUpDoctor (Id INTEGER PRIMARY KEY,DoctorName TEXT,DoctorPhone TEXT,DoctorSpeciality TEXT)";
export const LOOKUP_MEDICATIONS = "CREATE TABLE IF NOT EXISTS LookUpMedications (Id INTEGER PRIMARY KEY,MediName TEXT,MediDosage TEXT,MediWhen TEXT)";
export const LOOKUP_TAKESCARE = "CREATE TABLE IF NOT EXISTS LookUpTakesCare (Id INTEGER PRIMARY KEY, CareName TEXT, CarePhone TEXT, CareMail TEXT)";
export const RESUMING_RESPONSIBILITY = "CREATE TABLE IF NOT EXISTS ResumeResponsible (Id INTEGER PRIMARY KEY, Responsibility TEXT,"
  + "DoingCrisis TEXT, WhileResuming TEXT, ToResponsibility TEXT)";
export const LOOKUP_RESUMING = "CREATE TABLE IF NOT EXISTS LookUpResume (Id INTEGER PRIMARY KEY,ResumeId INTEGER, Content TEXT)";
export const ITEM_POST_CRISIS = "CREATE TABLE IF NOT EXISTS PostCrisis (Id INTEGER PRIMARY KEY, OutOfCrisis TEXT, FeelRecovered TEXT,"
  + "LifeStyle TEXT, LearnInCrisis TEXT, PreventRepercussion TEXT, thank TEXT, apologize TEXT)";
export const LOOKUP_SUPPORTERS = "CREATE TABLE IF NOT EXISTS LookUpSupporters(Id INTEGER PRIMARY KEY, WhoName TEXT, Phone TEXT, Email TEXT, NeedThem TEXT)";
export const LOOKUP_PEOPLETHANK = "CREATE TABLE IF NOT EXISTS LookupPeopleThank (Id INTEGER PRIMARY KEY, PeopleName TEXT, WhenThank TEXT, HowThank TEXT)";
export const LOOKUP_APOLOGIZE = "CREATE TABLE IF NOT EXISTS LookUpApologize (Id INTEGER PRIMARY KEY, ApologizeName TEXT, WhenApologize TEXT, HowApologize TEXT)";
export const LOOKUP_AMENDS = "CREATE TABLE IF NOT EXISTS LookUpAmends (Id INTEGER PRIMARY KEY,AmendsName TEXT, WhenAmends TEXT, HowAmends TEXT)"
export const LOOKUP_NOT_TAKESCARE = "CREATE TABLE IF NOT EXISTS LookUpNotTakesCare (Id INTEGER PRIMARY KEY, NoCareName TEXT, NoCarePhone TEXT, NoCareMail TEXT)";
export const LOOKUP_THINGSHELP = "CREATE TABLE IF NOT EXISTS LookUpHelpThings (Id INTEGER PRIMARY KEY,HelpName TEXT,HelpPhone TEXT,HelpEmail TEXT)";
export const LOOKUP_DONT_HELP = "CREATE TABLE IF NOT EXISTS LookUpDontHelp (Id INTEGER PRIMARY KEY,NoHelpName TEXT,NoHelpPhone TEXT,NoHelpEmail TEXT)";
export const LOOKUP_OTHERS_TASK = "CREATE TABLE IF NOT EXISTS LookUpOthersTask (Id INTEGER PRIMARY KEY,TaskName TEXT,TaskPhone TEXT,TaskEmail TEXT)";
//what is wrap query constants
export const INSERT_WHATISWRAP = "INSERT INTO WHATISWRAP DEFAULT VALUES";
export const DELETE_WHATISWRAP = "DELETE FROM WHATISWRAP  WHERE Id = ?";
export const SELECT_WHATISWRAP = "SELECT * FROM WHATISWRAP";
//ToolBox query constants
export const INSERT_WELLNESS = "INSERT INTO Tool (Content,IconId,QId) VALUES (?,?,?)";
export const UPDATE_WELLNESS = "UPDATE Tool SET Content=?, IconId=? WHERE Id = ?";
export const DELETE_WELLNESS = "DELETE FROM Tool WHERE Id = ?";
export const SELECT_WELLNESS_LIST = "SELECT * FROM Tool ";
export const SELECT_WELLNESS = "SELECT * FROM Tool WHERE Id=?";

//DISPLAYITEM query constants
export const INSERT_DISPLAYITEM = "INSERT INTO DISPLAYITEM (Content,PageType,QId) VALUES (?,?,?)";
export const UPDATE_DISPLAYITEM = "UPDATE DISPLAYITEM SET Content=? WHERE Id=? AND PageType=?";
export const DELETE_DISPLAYITEM = "DELETE FROM DISPLAYITEM WHERE Id = ?";
export const SELECT_DISPLAYITEM = "SELECT * FROM DISPLAYITEM WHERE PageType=?";

// WellnessTool Tool
export const INSERT_TOOL = "INSERT INTO WELLNESSTOOL (ReferenceId,PageType) VALUES (?,?)";
export const UPDATE_TOOL = "UPDATE WELLNESSTOOL SET ReferenceId=? WHERE PageType=?";
export const SELECT_REFERENCE = "SELECT ReferenceId from WELLNESSTOOL WHERE PageType=? LIMIT 1";
export const SELECT_TOOL = "SELECT * FROM TOOL WHERE Id IN ";
export const DELETE_TOOL = "DELETE FROM WELLNESSTOOL WHERE PageType =?";

//Crisis item query constants
export const SELECT_CRISISITEM = "SELECT * FROM CrisisItem";
export const INSERT_LOOKUP_DEFAULT = "INSERT INTO CrisisItem (WhenWellDate) VALUES (?)";
export const DELETE_LOOKUP_EXTRAROW = "DELETE FROM CrisisItem WHERE Id NOT IN (1)"; //deleting all rows except 1

//Crisis Medical Care Query Constants   
export const SELECT_LOOKUP_CASE = "SELECT * FROM LookUpCase";
export const INSERT_LOOKUP_CASE = "INSERT INTO LookUpCase DEFAULT VALUES";
export const UPDATE_LOOKUP_CASE = "UPDATE LookUpCase SET ";
export const DELETE_LOOKUP_CASE = "DELETE FROM LookUpCase WHERE Id=?";
export const SELECT_MEDICAL_CARE = "SELECT PharmacyName,PharmacyPhone FROM CrisisItem";
export const SELECT_LOOKUP_DOCTOR = "SELECT * FROM LookUpDoctor";
export const INSERT_LOOKUP_DOCTOR = "INSERT INTO LookUpDoctor DEFAULT VALUES";
export const UPDATE_LOOKUP_DOCTOR = "UPDATE LookUpDoctor SET ";
export const DELETE_LOOKUP_DOCTOR = "DELETE FROM LookUpDoctor WHERE Id=?";
export const SELECT_LOOKUP_MEDICATIONS = "SELECT * FROM LookUpMedications";
export const INSERT_LOOKUP_MEDICATIONS = "INSERT INTO LookUpMedications DEFAULT VALUES";
export const UPDATE_LOOKUP_MEDICATIONS = "UPDATE LookUpMedications SET ";
export const DELETE_LOOKUP_MEDICATIONS = "DELETE FROM LookUpMedications WHERE Id=?";
export const SELECT_HOME_COMMUNITY = "SELECT HomeCommunity FROM CrisisItem";

// Crisis Who Takes Care Query Constants
export const SELECT_LOOKUP_TAKESCARE = "SELECT * FROM LookUpTakesCare";
export const INSERT_LOOKUP_TAKESCARE = "INSERT INTO LookUpTakesCare DEFAULT VALUES";
export const UPDATE_LOOKUP_TAKESCARE = "UPDATE LookUpTakesCare SET ";
export const DELETE_LOOKUP_TAKESCARE = "DELETE FROM LookUpTakesCare WHERE Id=?";

export const SELECT_LOOKUP_NOT_TAKESCARE = "SELECT * FROM LookUpNotTakesCare";
export const INSERT_LOOKUP_NOT_TAKESCARE = "INSERT INTO LookUpNotTakesCare DEFAULT VALUES";
export const UPDATE_LOOKUP_NOT_TAKESCARE = "UPDATE LookUpNotTakesCare SET ";
export const DELETE_LOOKUP_NOT_TAKESCARE = "DELETE FROM LookUpNotTakesCare WHERE Id=?";

//Crisis single list quey constants
export const INSERT_CRISIS_LOOKUP = "INSERT INTO CrisisLookup (Content,ColumnName,CrisisPageType) VALUES (?,?,?)";
export const UPDATE_CRISIS_LOOKUP = "UPDATE CrisisLookup SET Content=? WHERE Id=? ";
export const SELECT_CRISIS_LOOKUP = "SELECT Id,Content FROM CrisisLookup WHERE ColumnName=? AND CrisisPageType=?";
export const SELECT_CRISIS_LOOKUP_MULTI = "SELECT Id,Content,ColumnName FROM CrisisLookup WHERE ColumnName IN ";
export const DELETE_CRISIS_LOOKUP = "DELETE FROM CrisisLookup WHERE Id=?";

// resume Resposibility list query
export const SELECT_RESUME_RESPONSIBILITY = "SELECT * FROM ResumeResponsible";
export const INSERT_RESUME_RESPONSIBILITY = "INSERT INTO ResumeResponsible DEFAULT VALUES";
export const UPDATE_RESUME_RESPONSIBILITY = "UPDATE ResumeResponsible SET ";
export const DELETE_RESUME_RESPONSIBILITY = "DELETE FROM ResumeResponsible WHERE Id=?";

// resume Responsibility LookUp query
export const SELECT_LOOKUP_RESPONSIBILITY = "SELECT * FROM LookUpResume WHERE ResumeId=?";
export const INSERT_LOOKUP_RESPONSIBILITY = "INSERT INTO LookUpResume (Content,ResumeId) VALUES (?,?)";
export const UPDATE_LOOKUP_RESPONSIBILITY = "UPDATE LookUpResume SET Content=? WHERE Id=?";
export const DELTE_LOOKUP_RESPONSIBILITY = "DELETE FROM LookUpResume WHERE Id=?";

// Post Crisis List query
export const SELECT_POST_CRISIS = "SELECT * FROM PostCrisis";
export const INSERT_POST_CRISIS = "INSERT INTO PostCrisis DEFAULT VALUES";
export const DELETE_POST_CRISIS = "DELETE FROM PostCrisis WHERE Id NOT IN (1)";

// Post Crisis LookUp LookUp Supporters
export const SELECT_LOOKUP_SUPPORTERS = "SELECT * FROM LookUpSupporters";
export const INSERT_LOOKUP_SUPPORTERS = "INSERT INTO LookUpSupporters DEFAULT VALUES";
export const UPDATE_LOOKUP_SUPPORTERS = "UPDATE LookUpSupporters SET ";
export const DELETE_LOOKUP_SUPPORTERS = "DELETE FROM LookUpSupporters WHERE Id=?";

// Post Crisis LookUp Lookup PeopleThink
export const SELECT_LOOKUP_PEOPLE_THANK = "SELECT * FROM LookupPeopleThank";
export const INSERT_LOOKUP_PEOPLE_THANK = "INSERT INTO LookupPeopleThank DEFAULT VALUES";
export const UPDATE_LOOKUP_PEOPLE_THANK = "UPDATE LookupPeopleThank SET ";
export const DELETE_LOOKUP_PEOPLE_THANK = "DELETE FROM LookupPeopleThank WHERE Id=?";

// Post Crisis LookUp Apologize
export const SELECT_LOOKUP_APOLOGIZE = "SELECT * FROM LookUpApologize";
export const INSERT_LOOKUP_APOLOGIZE = "INSERT INTO LookUpApologize DEFAULT VALUES";
export const UPDATE_LOOKUP_APOLOGIZE = "UPDATE LookUpApologize SET ";
export const DELETE_LOOKUP_APOLOGIZE = "DELETE FROM LookUpApologize WHERE Id=?";

// Post Crisis LookUp Amends LookUpAmends
export const SELECT_LOOKUP_AMENDS = "SELECT * FROM LookUpAmends";
export const INSERT_LOOKUP_AMENDS = "INSERT INTO LookUpAmends DEFAULT VALUES";
export const UPDATE_LOOKUP_AMENDS = "UPDATE LookUpAmends SET ";
export const DELETE_LOOKUP_AMENDS = "DELETE FROM LookUpAmends WHERE Id=?";

//when Well
export const SELECT_WHENWELL = "SELECT WhenWellDate FROM CrisisItem";

// LookUp HelpOthers
export const SELECT_LOOKUP_THINGSHELP = "SELECT * FROM LookUpHelpThings";
export const INSERT_LOOKUP_THINGSHELP = "INSERT INTO LookUpHelpThings DEFAULT VALUES";
export const UPDATE_LOOKUP_THINGSHELP = "UPDATE LookUpHelpThings SET ";
export const DELETE_LOOKUP_THINGSHELP = "DELETE FROM LookUpHelpThings WHERE Id=?";
export const SELECT_LOOKUP_THINGSDONTHELP = "SELECT * FROM LookUpDontHelp";
export const INSERT_LOOKUP_THINGSDONTHELP = "INSERT INTO LookUpDontHelp DEFAULT VALUES";
export const UPDATE_LOOKUP_THINGSDONTHELP = "UPDATE LookUpDontHelp SET ";
export const DELETE_LOOKUP_THINGSDONTHELP = "DELETE FROM LookUpDontHelp WHERE Id=?";
export const SELECT_LOOKUP_OTHERS = "SELECT * FROM LookUpOthersTask";
export const INSERT_LOOKUP_OTHERS = "INSERT INTO LookUpOthersTask DEFAULT VALUES";
export const UPDATE_LOOKUP_OTHERS = "UPDATE LookUpOthersTask SET ";
export const DELETE_LOOKUP_OTHERS = "DELETE FROM LookUpOthersTask WHERE Id=?";

@Injectable()

export class Constants {

  constructor(public http: HttpClient) {
  }
}
