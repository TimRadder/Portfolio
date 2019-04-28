import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Interest } from '../../../models/Interest';

@Component({
  selector: 'app-interest-edit',
  templateUrl: './interest-edit.component.html',
  styleUrls: ['./interest-edit.component.css']
})
export class InterestEditComponent implements OnInit {

  @Input() interest: Interest;

  editInterest: Interest = {
    id: -1,
    activity: '',
    type: ''
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.editInterest = this.interest;
  }

  closeModal() {
    this.activeModal.close(this.editInterest);
  }
}
