import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Interest } from '../../../models/Interest';


@Component({
  selector: 'app-interest-add',
  templateUrl: './interest-add.component.html',
  styleUrls: ['./interest-add.component.css']
})
export class InterestAddComponent implements OnInit {

  interest: Interest = {
    activity: '',
    type: 'hobby'
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close(this.interest);
  }
}
