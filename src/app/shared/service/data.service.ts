import { Injectable } from '@angular/core';
import {ApplicationForm} from "../types/application-form.type";

/**
 * For simplicity purposes, I am using this service to communicate across pages.
 * We can even use a state  management tool like NGRX or of Observables Service or via route state (not the best way for forms)
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private applicationFormData: ApplicationForm = {} as ApplicationForm;
  constructor() { }

  setApplicationFormData(data: ApplicationForm) {
    this.applicationFormData = data;
  }

  getApplicationFormData(): ApplicationForm {
    return this.applicationFormData;
  }
}
