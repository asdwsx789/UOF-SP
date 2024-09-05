import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private router: Router) { }

    ngOnInit() {
        this.primengConfig.ripple = true;

        // localStorage.removeItem('authToken');
        // localStorage.removeItem('tokenExpiration');
        // this.router.navigate(['auth/login']);

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.checkAuth();
            }
        });
    }

    checkAuth() {
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const currentTime = Date.now();

        if (tokenExpiration && currentTime > parseInt(tokenExpiration, 10)) {
            // localStorage.removeItem('authToken');
            // localStorage.removeItem('tokenExpiration');
            // this.router.navigate(['auth/login']);
        }
    }
}
