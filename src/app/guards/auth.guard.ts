import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements  CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            if (localStorage.getItem('portfolioJWT') === null) {
                this.router.navigate(['/']);
                resolve(false);
            } else {
                const token = JSON.parse(localStorage.getItem('portfolioJWT'));

                this.authService.isAuth(token).pipe(first()).subscribe(res => {
                    if (!res) {
                        this.router.navigate(['/']);
                        console.log('NOT Authorized');
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            }
        });
    }
}
