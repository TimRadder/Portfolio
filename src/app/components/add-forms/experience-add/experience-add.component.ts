import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ExperienceService } from '../../../services/experience.service';
import { Experience } from '../../../models/Experience';
import { Response } from '../../../models/Response';

@Component({
  selector: 'app-experience-add',
  templateUrl: './experience-add.component.html',
  styleUrls: ['./experience-add.component.css']
})
export class ExperienceAddComponent implements OnInit {
  experience: Experience = {
    employer: '',
    startDate: '',
    endDate: '',
    description: ''
  };

  constructor(private experienceService: ExperienceService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit() {
    // Call Add function in the Service
    this.experienceService.addExperience(this.experience).subscribe(res => {
      if (res.code === 200) {
        this.flashMessage.show('Experience added successfully.', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        // Reset skill variable to be empty
        this.experience = {
          employer: '',
          startDate: '',
          endDate: '',
          description: ''
        };
      } else {
        this.flashMessage.show('An error occurred while adding the Experience.', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }
}
