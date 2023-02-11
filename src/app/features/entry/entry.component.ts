import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CUSTOM_REGEX, MAX_AGE, MIN_AGE} from "../../shared/constants/form-util";
import {DataService} from "../../shared/service/data.service";
import {ApplicationForm} from "../../shared/types/application-form.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  public applicationForm!: FormGroup;
  private applicationFormData!: ApplicationForm;
  constructor(private readonly fb: FormBuilder,
              private readonly dataService: DataService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.initEntryForm();
    this.applicationFormData = this.dataService.getApplicationFormData();
    if(Object.keys(this.applicationForm).length > 0) {
      this.patchApplicationFrom(this.applicationFormData);
    }
  }

  public handleSave(): void {
    const applicationFormData = this.applicationForm.value as ApplicationForm;
    this.dataService.setApplicationFormData(applicationFormData);
    this.router.navigate(['confirmation']);
  }

  private initEntryForm(): void {
    this.applicationForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required, this.validateDateOfBirth]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(CUSTOM_REGEX.CA_POSTAL_CODE)]),
    })
  }

  private patchApplicationFrom(data: ApplicationForm) {
    this.applicationForm.patchValue(data);
  }

  private validateDateOfBirth(control: FormControl) {
    const dob = control.value as Date;
    if(!dob) {
      return null;
    }
    const today = new Date();
    const ageInMS = today.getTime() - dob.getTime();
    const ageInYears = ageInMS/ (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears >= MIN_AGE && ageInYears <= MAX_AGE ? null :
      {invalidAge: `Date of birth must be between ${MIN_AGE} & ${MAX_AGE} years old`}
  }
}
