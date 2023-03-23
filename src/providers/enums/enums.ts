import { WellnessTemplate } from './../email-template/email-template';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EnumsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export enum Page {
  WhatisWrap = 0,
  Wellness = 1,
  DailyItem = 2,
  Triggers = 3,
  WarningSigns = 4,
  BreakingDown = 5,
  CrisisPlan = 6,
  PostCrisis = 7,
  DailyItemSub = 8
}

export enum Crisis {
  WhenWell = 9,
  MySupporters = 10,
  WhoTakesOver = 11,
  MedicalCare = 12,
  Treatment = 13,
  HomeCommuity = 14,
  Hospital = 15,
  HelpOthers = 16,
  PlanNoLonger = 17
}

export enum CrisisColumns {
  WhenWell = 1,
  WhenNotWell = 15,
  MySupporters = 2,
  WhoTakesOver = 3,
  PlanNoLonger = 4,
  Allergy = 5,
  AcceptableMedi = 6,
  AvoidMedi = 7,
  HelpOthers = 8,
  NoHelpOthers = 9,
  OthersTask = 10,
  AcceptableTreatment = 11,
  UnacceptableTreatment = 12,
  AcceptableHospital = 13,
  UnacceptableHospital = 14
}

@Injectable()
export class Enums {

  constructor(public http: HttpClient) {
  }

}
