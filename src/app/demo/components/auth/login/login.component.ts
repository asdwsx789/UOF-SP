import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService, private AuthService: AuthService, private router: Router) { }

    getTokn() {
        const postData = {
            Username: "test",
            Password: "test"
        };

        this.AuthService.uofLogin(postData)
            .subscribe({
                next: (date) => {
                    const token = date.token;
                    const expiration = this.getTokenExpiration(token);

                    console.log(`Token expiration time (milliseconds): ${expiration}`);
                    console.log(`Token expiration time (Date): ${new Date(expiration)}`);

                    localStorage.setItem('authToken', token);
                    localStorage.setItem('tokenExpiration', expiration.toString());

                    this.router.navigate(['']);
                },
                error: (response) => {
                    console.log(response);
                }
            });
    }

    getTokenExpiration(token: string): number {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000; // Convert expiration to milliseconds
    }
}
