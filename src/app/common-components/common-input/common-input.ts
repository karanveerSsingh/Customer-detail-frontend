// import {Component} from '@angular/core';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {FormsModule} from '@angular/forms';
// @Component({
//   selector: 'app-common-input',
//   imports: [FormsModule, MatFormFieldModule, MatInputModule],
//   templateUrl: './common-input.html',
//   styleUrl: './common-input.scss',
// })
// export class CommonInput {

// }
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from "@angular/material/input";

@Component({
  selector: 'app-common-input',
  templateUrl: './common-input.html',
  styleUrls: ['./common-input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonInputComponent),
      multi: true
    }
  ],
  imports: [MatFormField, MatLabel, MatError]
})
export class CommonInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() errorMessage: string = '';

  value: any = '';
  
  private onChange = (value: any) => {};
  private onTouched = () => {};

  onInput(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}