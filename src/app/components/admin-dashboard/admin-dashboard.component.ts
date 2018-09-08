import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

// Import requires Services
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { SkillsService } from '../../services/skills.service';
// Import Models
import { Skill } from '../../models/Skill';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  skills: Skill[];

  constructor(private _flash: FlashMessagesService,
              private _adminDashboard: AdminDashboardService,
              private _skillDashboard: SkillsService) { }

  ngOnInit() {
    this._adminDashboard.getDashboard().subscribe(data => {
      this.skills = data['jsonData']['skills'];
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
}
