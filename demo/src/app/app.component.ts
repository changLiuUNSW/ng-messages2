import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  formGroup: FormGroup;
  ngOnInit() {
    this.createForm();
  }


  constructor(
    private fb: FormBuilder) {
  }

  createForm() {
    this.formGroup = this.fb.group({
      phoneNumber: ['', [Validators.required,
      Validators.pattern('^[0-9]*$')]]
    });
  }
}
