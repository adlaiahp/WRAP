import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export const WellnessTemplate = '<h2>Wellness Tool</h2>' +
  '<p> Define the tools that help you feel better and stay well.Try adding tools like petting your dog, meditating,' +
  ' talking to a friend, drawing or exercise.These tools will be available to help you throughout your wellness recovery.</p>';
export const WhenWellTemplate = '<h2>What I am Like When I am Well</h2>' +
  ' <p>Create a list of signs that would indicate to others that you are feeling well.This may be the same'
  + ' list you included in your Daily Plan.This is helpful to people who do not know you,'
  + ' but who may be providing you with care.</p>'
export const MySupporters = '<h2>Signs My Supporters Need To Take Over</h2>' +
  '<p>List signs that would let others know that you are no longer capable of taking care of yourself and need your'
  + ' supporters to take care of you, things like not recognizing family members, being unable to stop repetitve'
  + ' behaviours for long periods, violent or suicidal behaviour.</p>'
export const PlanNoLonger = '<p>List ways that supporters can tell that you are able to care for yourself and '
  + 'that they no longer need to follow this plan, things like preparing your own food, caring for your pets, recognizing '
  + 'people you know, sleeping through the night.</p>'

@Injectable()
export class EmailTemplate {

  constructor(public http: HttpClient) {
    console.log('Hello EmailTemplateProvider Provider');
  }

}
