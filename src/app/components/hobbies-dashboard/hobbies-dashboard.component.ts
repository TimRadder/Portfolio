import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Interest } from '../../models/Interest';
import { InterestService } from '../../services/interest.service';

@Component({
  selector: 'app-hobbies-dashboard',
  templateUrl: './hobbies-dashboard.component.html',
  styleUrls: ['./hobbies-dashboard.component.css']
})
export class HobbiesDashboardComponent implements OnInit {
  interests: Interest[];

  constructor(private iService: InterestService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.iService.getInterests().subscribe(data => {
      this.interests = data;
    });
  }

}
