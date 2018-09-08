import { Component, OnInit } from '@angular/core';
import {Skill} from '../../models/Skill';
import {SkillsService} from '../../services/skills.service';

@Component({
  selector: 'app-skills-dashboard',
  templateUrl: './skills-dashboard.component.html',
  styleUrls: ['./skills-dashboard.component.css']
})
export class SkillsDashboardComponent implements OnInit {
  skills: Skill[];

  constructor(private skillService: SkillsService) { }

  ngOnInit() {
    this.skillService.getSkills().subscribe((data) => {
      this.skills = data['jsonData'];
  });
  }

}
