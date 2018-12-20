import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Experience } from '../../../models/Experience';
import { ExperienceService } from '../../../services/experience.service';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent implements OnInit {

  exp: Experience = {
    employer: '',
    jobTitle: '',
    endDate: new Date(),
    startDate: new Date(),
    description: ''
  };

  constructor(private _flash: FlashMessagesService,
              private _experienceService: ExperienceService,
              private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const routeparams = this._activeRoute.snapshot.params;
    this._experienceService.getExperience(routeparams.id).subscribe(data => {
      this.exp.id = data[0].id;
      this.exp.employer = data[0].employer;
      this.exp.jobTitle = data[0].jobTitle;
      this.exp.startDate = moment(new Date(data[0].startDate)).format('YYYY-MM');
      this.exp.endDate = moment(new Date(data[0].endDate)).format('YYYY-MM');
      this.exp.description = data[0].description;
    });
  }

  onSubmit() {
    this._experienceService.updateExperience(this.exp).subscribe(data => {
      if (data.code === 200) {
        this._flash.show(data.message, {
          cssClass: 'alert-success',
          timeout: 3000
        });
      } else {
        this._flash.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }
}
