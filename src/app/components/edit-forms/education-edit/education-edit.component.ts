import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Education } from '../../../models/Education';
import { Award } from '../../../models/Awards';
import { EducationService } from '../../../services/education.service';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {

  education: Education = {
    school: '',
    course: '',
    gradDate: new Date().toString(),
    awards: []
  };

  constructor(
      private _flash: FlashMessagesService,
      private _educationService: EducationService,
      private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const routeparams = this._activeRoute.snapshot.params;
    this._educationService.getOneEducation(routeparams.id).subscribe(data => {
      this.education.school = data[0][0].school;
      this.education.course = data[0][0].course;
      this.education.gradDate = data[0][0].gradDate;
      this.education.awards = data[1];
    });
  }

}
