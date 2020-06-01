import { Component, Input } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-auth-login',
  template: ` <div class="auth-link" (click)="goAuth()">{{ provider }}</div> `,
})
export class AuthLoginComponent {
  @Input() provider = '';

  constructor(private sessionService: SessionService) {}

  goAuth() {
    const { pathname } = window.location;
    const redirect = `post_login_redirect_uri=${pathname}`;
    const url = `/.auth/login/${this.provider}?${redirect}`;
    window.location.href = url;
  }

  go() {
    this.sessionService
  }
}
