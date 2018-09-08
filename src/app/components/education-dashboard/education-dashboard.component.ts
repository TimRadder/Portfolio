import { Component, OnInit } from '@angular/core';

import { EducationService } from '../../services/education.service';
import { Education } from '../../models/Education';

@Component({
  selector: 'app-education-dashboard',
  templateUrl: './education-dashboard.component.html',
  styleUrls: ['./education-dashboard.component.css']
})
export class EducationDashboardComponent implements OnInit {
  education: Education[];

  constructor(private educationService: EducationService) { }

  ngOnInit() {
    this.educationService.getEducation().subscribe(data => {
      this.education = data;
    });
  }

}
