import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { EducationAwardEditComponent } from '../../../Modals/EditModals/education-award-edit/education-award-edit.component';
import { EducationAwardAddComponent } from '../../../Modals/AddModals/education-award-add/education-award-add.component';

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
    schoolID: '',
    awards: []
  };

  modalOptions: NgbModalOptions = {
  backdrop: 'static',
  keyboard: false,
  centered: false
};

  constructor(
      private _flash: FlashMessagesService,
      private _educationService: EducationService,
      private _activeRoute: ActivatedRoute,
      private _modalService: NgbModal) { }

  ngOnInit() {
    const routeparams = this._activeRoute.snapshot.params;
    this._educationService.getOneEducation(routeparams.id).subscribe(data => {
      this.education.school = data[0][0].school;
      this.education.course = data[0][0].course;
      this.education.gradDate = data[0][0].gradDate;
      this.education.schoolID = data[0][0].schoolID;
      this.education.awards = data[1];
    });
  }

  deleteAward(id) {
    this._educationService.deleteAward(id).subscribe(data => {
      if (data['code'] === 200) {
        const index: number = this.education.awards.findIndex(x => x.id === id);
        this.education.awards.splice(index, 1);

        this._flash.show(data.message, {
          cssClass: 'alert-success',
          timeout: 3000
        });
      } else {
        this._flash.show('Award could not be deleted', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }

  openAddModal() {
    const schoolID: string = this.education.schoolID;

    const modalRef = this._modalService.open(EducationAwardAddComponent, this.modalOptions);
    modalRef.componentInstance.schoolID = schoolID;
    modalRef.result.then((result) => {
      const newAward = result;
      this._educationService.addAward(newAward). subscribe(data => {
        if (data.code === 200) {
          this.education.awards.push(newAward);
          this._flash.show(data.message, {
            cssClass: 'alert-success',
            timeout: 3000
          });
        } else {
          this._flash.show('Failed to Add Award', {
            cssClass: 'alert-danger',
            timeout: 3000
          });
        }
      });
    }).catch((error) => {

    });
  }

  openEditModal(awardID: number) {
    const i = this.education.awards.findIndex(x => x.id === awardID);
    const award: Award = {
      description: this.education.awards[i].description,
      type: this.education.awards[i].type,
      id: this.education.awards[i].id
    };

    const modalRef = this._modalService.open(EducationAwardEditComponent, this.modalOptions);
    modalRef.componentInstance.awardID = awardID;
    modalRef.componentInstance.award = award;
    modalRef.result.then((result) => {
      this._educationService.updateAward(award).subscribe(data => {
        if (data.code === 200) {
          this.education.awards[i] = result;
          this._flash.show(data.message, {
            cssClass: 'alert-success',
            timeout: 3000
          });
        } else {
          this._flash.show('Failed to Save changes to Award', {
            cssClass: 'alert-danger',
            timeout: 3000
          });
        }
      });
    }).catch((error) => {});
  }
}
