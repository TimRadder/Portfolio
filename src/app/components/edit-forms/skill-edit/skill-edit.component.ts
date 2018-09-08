import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';

import { Skill } from '../../../models/Skill';
import { SkillsService } from '../../../services/skills.service';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent implements OnInit {
  skill: Skill = {
    id: -1,
    name: '',
    type: ''
  };

  typesArray = [
    {typeValue: 'web', userFriendly: 'Web'},
    {typeValue: 'application', userFriendly: 'Application'},
    {typeValue: 'other', userFriendly: 'Other'}
  ];

  constructor(private _flash: FlashMessagesService,
              private _skillService: SkillsService,
              private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const routeparams = this._activeRoute.snapshot.params;
    this._skillService.getSkill(routeparams.id).subscribe(data => {
      this.skill.id = data['jsonData'][0].id;
      this.skill.name = data['jsonData'][0].name;
      this.skill.type = data['jsonData'][0].type;
    });
  }

  onSubmit() {
    this._skillService.updateSkill(this.skill).subscribe(data => {
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
