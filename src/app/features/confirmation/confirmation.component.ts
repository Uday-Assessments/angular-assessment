import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataService} from "../../shared/service/data.service";
import {ApplicationForm} from "../../shared/types/application-form.type";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  applicationForm!: ApplicationForm;

  constructor(private readonly dataService: DataService, private readonly router: Router) { }

  ngOnInit(): void {
    this.applicationForm = this.dataService.getApplicationFormData();
  }

  submitForm(): void {
    this.router.navigate(['/thankyou'])
  }

}
