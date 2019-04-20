import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SkillsService } from './services/skills.service';
import { SkillFilterPipe } from './pipes/skill-filter.pipe';
import { SkillsDashboardComponent } from './components/skills-dashboard/skills-dashboard.component';
import { ExperienceDashboardComponent } from './components/experience-dashboard/experience-dashboard.component';
import { ExperienceService } from './services/experience.service';
import { SkillAddComponent } from './components/add-forms/skill-add/skill-add.component';
import { AppRoutingModule } from './app-routing.module';
import { ExperienceAddComponent } from './components/add-forms/experience-add/experience-add.component';
import { EducationDashboardComponent } from './components/education-dashboard/education-dashboard.component';
import { HobbiesDashboardComponent } from './components/hobbies-dashboard/hobbies-dashboard.component';
import { EducationService } from './services/education.service';
import { InterestService } from './services/interest.service';
import { InterestFilterPipe } from './pipes/interest-filter.pipe';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDashboardService } from './services/admin-dashboard.service';
import { SkillEditComponent } from './components/edit-forms/skill-edit/skill-edit.component';
import { ExperienceEditComponent } from './components/edit-forms/experience-edit/experience-edit.component';
import { EducationEditComponent } from './components/edit-forms/education-edit/education-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SkillFilterPipe,
    SkillsDashboardComponent,
    ExperienceDashboardComponent,
    SkillAddComponent,
    ExperienceAddComponent,
    EducationDashboardComponent,
    HobbiesDashboardComponent,
    InterestFilterPipe,
    LoginFormComponent,
    AdminDashboardComponent,
    SkillEditComponent,
    ExperienceEditComponent,
    EducationEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [SkillsService, ExperienceService, EducationService, InterestService, AuthService, AuthGuard, AdminDashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
