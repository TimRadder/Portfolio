import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import components to route to
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkillAddComponent } from './components/add-forms/skill-add/skill-add.component';
import { SkillEditComponent } from './components/edit-forms/skill-edit/skill-edit.component';
import { ExperienceAddComponent } from './components/add-forms/experience-add/experience-add.component';
import { ExperienceEditComponent } from './components/edit-forms/experience-edit/experience-edit.component';
import { EducationEditComponent } from './components/edit-forms/education-edit/education-edit.component';
import { EducationAddComponent } from './components/add-forms/education-add/education-add.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


//  Import Route Guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'skills/add', component: SkillAddComponent, canActivate: [AuthGuard] },
  { path: 'skills/edit/:id', component: SkillEditComponent, canActivate: [AuthGuard] },
  { path: 'exp/add', component: ExperienceAddComponent, canActivate: [AuthGuard] },
  { path: 'exp/edit/:id', component: ExperienceEditComponent, canActivate: [AuthGuard] },
  { path: 'education/edit/:id', component: EducationEditComponent, canActivate: [AuthGuard]},
  { path: 'education/add', component: EducationAddComponent, canActivate: [AuthGuard]},
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
