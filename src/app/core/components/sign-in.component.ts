import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService, SessionState } from '../session.service';

@Component({
  template: `
    <div class="card signin">
      <ng-container *ngIf="sessionState$ | async as sessionState">
        <header class="card-header">
          <p class="card-header-title" *ngIf="!sessionState.userInfo">
            SIGN IN
          </p>
          <p class="card-header-title" *ngIf="sessionState.userInfo">
            SIGN OUT
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <div>
              <ng-container *ngIf="!sessionState.userInfo">
                <app-auth-sign-in
                  [providers]="providers"
                  [selectedProvider]="selectedProvider"
                  (providerSelected)="providerSelected($event)"
                >
                </app-auth-sign-in>
              </ng-container>
            </div>
          </div>
        </div>
        <footer class="card-footer ">
          <app-button-footer
            class="card-footer-item"
            [className]="'cancel-button'"
            [iconClasses]="'fas fa-undo'"
            (clicked)="cancel()"
            label="Cancel"
          ></app-button-footer>
          <app-button-footer
            *ngIf="!sessionState.userInfo"
            class="card-footer-item"
            [className]="'save-button'"
            [iconClasses]="'fa fa-sign-in'"
            (clicked)="login()"
            label="Login"
          ></app-button-footer>
          <app-button-footer
            *ngIf="sessionState.userInfo"
            class="card-footer-item"
            [className]="'save-button'"
            [iconClasses]="'fa fa-sign-out'"
            (clicked)="logout()"
            label="Logout"
          ></app-button-footer>
        </footer>
      </ng-container>
    </div>
  `,
})
export class SignInComponent implements OnInit {
  public sessionState$: Observable<SessionState>;
  providers = ['twitter', 'github', 'aad', 'google', 'facebook'];
  selectedProvider: string;

  constructor(private sessionService: SessionService) {
    this.sessionState$ = this.sessionService.sessionState$;
  }

  ngOnInit(): void {
    this.selectedProvider = this.providers[0];
  }

  login() {
    if (this.selectedProvider) {
      const { pathname } = window.location;
      const redirect = `post_login_redirect_uri=${pathname}`;
      const url = `/.auth/login/${this.selectedProvider}?${redirect}`;
      window.location.href = url;
    }
  }

  logout() {
    const { pathname } = window.location;
    const redirect = `post_logout_redirect_uri=${pathname}`;
    const url = `/.auth/logout?${redirect}`;
    window.location.href = url;
  }

  cancel() {
    window.history.back();
  }

  providerSelected(value) {
    this.selectedProvider = value;
  }
}
