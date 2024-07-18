import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const currentTime = Date.now();

        if (tokenExpiration && currentTime > parseInt(tokenExpiration, 10)) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenExpiration');
            this.router.navigate(['auth/login']);
            return false;
        }

        return true;
    }
}

// class PermissionsService {

//     constructor(private router: Router) { }

//     canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//         const token = localStorage.getItem('authToken');
//         const expiration = localStorage.getItem('tokenExpiration');

//         if (token && expiration && Date.now() < +expiration) {
//             return true;
//         } else {
//             localStorage.removeItem('authToken');
//             localStorage.removeItem('tokenExpiration');
//             this.router.navigate(['auth/login']);
//             return false;
//         }
//     }
// }

// export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
//     return inject(PermissionsService).canActivate(next, state);
// }
