import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Skill } from '../../../models/Skill';
import { SkillsService } from '../../../services/skills.service';

import { Response } from '../../../models/Response';

@Component({
  selector: 'app-skill-add',
  templateUrl: './skill-add.component.html',
  styleUrls: ['./skill-add.component.css']
})
export class SkillAddComponent implements OnInit {
  typesArray = [
    {typeValue: 'web', userFriendly: 'Web'},
    {typeValue: 'application', userFriendly: 'Application'},
    {typeValue: 'other', userFriendly: 'Other'}
  ];

  name: string = '';
  type: string = '';

  constructor(private skillService: SkillsService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit() {
    // Call Service to add new Skill
    const newSkill: Skill = {
      name: this.name,
      type: this.type
    };
    this.skillService.addSkill(newSkill).subscribe(res => {
      if (res.code === 200) {
        this.flashMessage.show('Skill added successfully.', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        // Reset skill variable to be empty
        this.name = '';
        this.type = '';
      } else {
        this.flashMessage.show('An error occured while adding the skill.', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }
}
