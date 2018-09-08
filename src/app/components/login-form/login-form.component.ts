import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
      this.authService.login(this.username, this.password).subscribe(res => {
         if (res.code === 200) {
             this.authService.storeJWT(res.jwt);
             this.flashMessage.show(res.message, {
                 cssClass: 'alert-success',
                 timeout: 3000
             });
            this.router.navigate(['/admin/dashboard']);
         } else {
             this.flashMessage.show(res.error, {
                cssClass: 'alert-danger',
                 timeout: 5000
             });
         }
      });
  }

}
