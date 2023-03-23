import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import * as enums from '../../providers/enums/enums';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineFormComponent),
  multi: true
};

@Component({
  selector: 'inline-form',
  templateUrl: 'inline-form.html',
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR]
})

export class InlineFormComponent implements ControlValueAccessor, OnInit {
  @ViewChild('inlineEditControl') inlineEditControl: ElementRef;
  @Input() type: string = 'text'; // The type of input element
  @Input() required: boolean = false; // Is input requried?
  @Input() Id: Number = 0;
  @Input() PageType: any;
  @Input() ColumnName: any;
  @Input() QId: any;
  @Input() ListName: any;
  @Input() group: FormGroup;
  @Input() disabled: boolean = false; // Is input disabled?
  private _value: string = ''; // Private variable for input value
  private preValue: string = ''; // The value before clicking to edit
  private editing: boolean = false; // Is Component in edit mode?
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  constructor(private _renderer: Renderer, private event: Events) {

  }
  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
    }
  }

  // Required for ControlValueAccessor interface
  writeValue(value: any) {
    this._value = value;
  }

  // Required forControlValueAccessor interface
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  // Required forControlValueAccessor interface
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  // Do stuff when the input element loses focus
  onBlur(content: any, Id: any, ListName: any, ColumnName: any, PageType: any, QId: any) {
    let data = { "Content": content, "Id": Id, "ListName": ListName, "ColumnName": ColumnName,"QId":QId };
    switch (parseInt(PageType)) {
      case enums.Page.DailyItem:
        this.event.publish("Update:DailyItem", data);
        break;
      case enums.Page.Triggers:
        this.event.publish("Update:Triggers", data);
        break;
      case enums.Page.WarningSigns:
        this.event.publish("Update:WarningSigns", data);
        break;
      case enums.Page.BreakingDown:
        this.event.publish("Update:BreakingDown", data);
        break;
      case enums.Crisis.WhenWell:
        this.event.publish("Update:Crisis:WhenWell", data);
        this.event.publish("Update:Crisis:WhenNotWell", data);
        break;
      case enums.Crisis.MySupporters:
        this.event.publish("Update:Crisis:MySupporters", data);
        break;
      case enums.Crisis.MedicalCare:
        this.event.publish("Update:Crisis:Medicare", data);
        break;
      case enums.Crisis.PlanNoLonger:
        this.event.publish("Update:Crisis:PlanNoLonger", data);
        break;
      case enums.Crisis.Hospital:
        this.event.publish("Update:Crisis:AcceptableHospital", data);
        this.event.publish("Update:Crisis:UnacceptableHospital", data);
        break;
      case enums.Crisis.Treatment:
        this.event.publish("Update:Crisis:AcceptTreatment", data);
        this.event.publish("Update:Crisis:UnacceptTreatment", data);
        break;
      case enums.Page.PostCrisis:
        this.event.publish("Update:PostCrisis", data);
        break;
    }
    this.editing = false;
  }

  // Start the editting process for the input element
  edit(value) {
    if (this.disabled) {
      return;
    }

    this.preValue = value;
    this.editing = true;
    // Focus on the input element just as the editing begins
    setTimeout(_ => this._renderer.invokeElementMethod(this.inlineEditControl.nativeElement,
      'focus', []));
  }

  ngOnInit() {

  }
}
