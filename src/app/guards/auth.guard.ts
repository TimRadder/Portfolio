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
                if (state.url === '/login') {
                    resolve(true);
                } else {
                    this.router.navigate(['/']);
                    resolve(false);
                }
            } else {
                const token = JSON.parse(localStorage.getItem('portfolioJWT'));

                this.authService.isAuth(token).pipe(first()).subscribe(res => {
                    if (!res) {
                        if (state.url === '/login') {
                           resolve(true);
                        } else {
                            this.router.navigate(['/']);
                            console.log('NOT Authorized');
                            resolve(false);
                        }
                    } else {
                        if (state.url === '/login') {
                            this.router.navigate(['admin/dashboard']);
                            resolve(false);
                        }
                        resolve(true);
                    }
                });
            }
        });
    }
}
