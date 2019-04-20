import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

// Import requires Services
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { SkillsService } from '../../services/skills.service';
import { ExperienceService } from '../../services/experience.service';
import { EducationService } from '../../services/education.service';
// Import Models
import { Skill } from '../../models/Skill';
import { Experience } from '../../models/Experience';
import { Education } from '../../models/Education';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  skills: Skill[];
  experiences: Experience[];
  education: Education[];

  constructor(private _flash: FlashMessagesService,
              private _adminDashboard: AdminDashboardService,
              private _skillDashboard: SkillsService,
              private _experienceDashboard: ExperienceService,
              private _educationDashboard: EducationService) { }

  ngOnInit() {
    this._adminDashboard.getDashboard().subscribe(data => {
      this.skills = data['jsonData']['skills'];
      this.experiences = data['jsonData']['experience'];
      this.education = data['jsonData']['education'];
    });
  }

  DeleteSkill(id) {
    this._skillDashboard.deleteSkill(id).subscribe(data => {
      if (data['code'] === 200) {
        const index: number = this.skills.findIndex(skill => skill.id === id);
        this.skills.splice(index, 1);

        this._flash.show('Skill has been deleted', {
          cssClass: 'alert-success',
          timeout: 3000
        });

      }
    });
  }

  DeleteExperience(id) {
    this._experienceDashboard.deleteExperience(id).subscribe(data => {
      if (data['code'] === 200) {
        const index: number = this.experiences.findIndex(exp => exp.id === id);
        this.experiences.splice(index, 1);

        this._flash.show('Experience has been deleted', {
          cssClass: 'alert-success',
          timeout: 3000
        });
      }
    });
  }

  DeleteEducation(id) {
    this._educationDashboard.deleteEducation(id).subscribe(data => {
      if (data['code'] === 200) {
        const index: number = this.education.findIndex(edu => edu.id === id);
        this.education.splice(index, 1);

        this._flash.show('Education has been deleted', {
          cssClass: 'alert-success',
          timeout: 3000
        });
      }
    });
  }
}
