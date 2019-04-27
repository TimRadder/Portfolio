import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Award} from '../../../models/Awards';
import { EducationService } from '../../../services/education.service';

@Component({
  selector: 'app-education-award-edit',
  templateUrl: './education-award-edit.component.html',
  styleUrls: ['./education-award-edit.component.css']
})
export class EducationAwardEditComponent implements OnInit {
  @Input() awardID: number;
  @Input() award: Award;

  editAward: Award = {
    description: '',
    type: ''
  };
  constructor(
      public activeModal: NgbActiveModal,
      private _educationService: EducationService
  ) {}

  ngOnInit() {
    this.editAward = this.award;
  }

  closeModal() {
    this.activeModal.close(this.editAward);
  }

}
