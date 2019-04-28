import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';

import { Experience } from '../../models/Experience';

@Component({
  selector: 'app-experience-dashboard',
  templateUrl: './experience-dashboard.component.html',
  styleUrls: ['./experience-dashboard.component.css']
})
export class ExperienceDashboardComponent implements OnInit {
  experiences: Experience[];

  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
    this.experienceService.getExperiences().subscribe(experiences => {
      this.experiences = experiences;

      for (let i = 0; i < this.experiences.length; i++) {
        if (this.experiences[i].endDate === '1969-12') {
          this.experiences[i].endDate = 'Present';
        }
      }
    });
  }

}
