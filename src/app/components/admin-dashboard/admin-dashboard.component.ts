import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

// Import everything needed for Modals
import { NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { InterestAddComponent } from '../../Modals/AddModals/interest-add/interest-add.component';
import { InterestEditComponent } from '../../Modals/EditModals/interest-edit/interest-edit.component';

// Import requires Services
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { SkillsService } from '../../services/skills.service';
import { ExperienceService } from '../../services/experience.service';
import { EducationService } from '../../services/education.service';
import { InterestService } from '../../services/interest.service';
// Import Models
import { Skill } from '../../models/Skill';
import { Experience } from '../../models/Experience';
import { Education } from '../../models/Education';
import { AuthService } from '../../services/auth.service';
import { Interest } from '../../models/Interest';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  interests: Interest[];

  modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: false
  };

  constructor(private _flash: FlashMessagesService,
              private _adminDashboard: AdminDashboardService,
              private _skillDashboard: SkillsService,
              private _experienceDashboard: ExperienceService,
              private _educationDashboard: EducationService,
              private _interestService: InterestService,
              private _authService: AuthService,
              private _router: Router,
              private _modalService: NgbModal) { }

  ngOnInit() {
    this._adminDashboard.getDashboard().subscribe(data => {
      this.skills = data['jsonData']['skills'];
      this.experiences = data['jsonData']['experience'];
      this.education = data['jsonData']['education'];
      this.interests = data['jsonData']['interests'];
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

  DeleteInterest(id) {
    this._interestService.deleteInterest(id).subscribe(data => {
      if(data.code === 200){
        const i: number = this.interests.findIndex(x => x.id === id);
        this.interests.splice(i, 1);

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

  openInterestAddModal() {
    const modalref = this._modalService.open(InterestAddComponent, this.modalOptions);
    modalref.result.then((result) => {
      this._interestService.addInterest(result).subscribe(data => {
        if (data.code === 200) {
          this._flash.show(data.message, {
            cssClass: 'alert-success',
            timeout: 3000
          });
          const newInterest = result;
          this.interests.push(newInterest);
        } else {
          this._flash.show(data.message, {
            cssClass: 'alert-danger',
            timeout: 3000
          });
        }
      });
    }).catch((error) => {});
  }

  openInterestEditModal(id: number) {
    const i = this.interests.findIndex(x => x.id === id);
    const interest: Interest = {
      id: id,
      activity: this.interests[i].activity,
      type: this.interests[i].type
    };

    const modalref = this._modalService.open(InterestEditComponent, this.modalOptions);
    modalref.componentInstance.interest = interest;
    modalref.result.then((result) => {
      this._interestService.updateInterest(result).subscribe(data => {
        if (data.code === 200) {
          this.interests[i] = result;
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
      this.interests[i] = result;
    }).catch((error) => {});
  }

  Logout() {
    this._authService.deleteJWT();
    this._router.navigate(['/']);
  }
}
