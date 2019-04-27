import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Education } from '../../../models/Education';
import { EducationService } from '../../../services/education.service';
import { Response } from '../../../models/Response';

@Component({
  selector: 'app-education-add',
  templateUrl: './education-add.component.html',
  styleUrls: ['./education-add.component.css']
})
export class EducationAddComponent implements OnInit {

  education: Education = {
    school: 'Institute',
    course: 'Programming',
    gradDate: new Date().toISOString().split('T')[0].toString()
  };

  constructor(private _flash: FlashMessagesService,
              private _educationService: EducationService) { }

  ngOnInit() {
  }

  addEducation() {
    this._educationService.addExperience(this.education).subscribe(res => {
      if (res.code === 200) {
        this._flash.show('Education added successfully.', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        // Reset education variable to be empty
        this.education = {
          school: 'Institute',
          course: 'Programming',
          gradDate: new Date().toISOString().split('T')[0].toString()
        };
      } else {
        this._flash.show('An error occured while adding the Education.', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }
}
