import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Award } from '../../../models/Awards';

@Component({
  selector: 'app-education-award-add',
  templateUrl: './education-award-add.component.html',
  styleUrls: ['./education-award-add.component.css']
})
export class EducationAwardAddComponent implements OnInit {

  @Input() schoolID;

  award: Award = {
    type: '',
    description: '',
    schoolID: ''
  };

  constructor(
      public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.award.schoolID = this.schoolID;
  }

  closeModal() {
    this.activeModal.close(this.award);
  }
}
