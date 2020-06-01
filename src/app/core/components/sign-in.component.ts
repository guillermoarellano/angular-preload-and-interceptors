import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { SessionService, SessionState } from '../session.service';
import { UserInfo } from '../model/user-info';

@Component({
  template: `
    <div class="card signin">
      <header class="card-header">
        <p class="card-header-title">
          Sign In
        </p>
      </header>
      <div class="card-content">
        <ng-container *ngIf="sessionState$ | async as sessionState">
          <div class="content">
            <div class="menu-list auth">
              <ng-container *ngIf="!sessionState.userInfo">
                <div class="field">
                  <label class="label" for="provider">
                    auth provider
                  </label>
                  <select [(ngModel)]="selectedProvider" class="select" name="provider">
                    <option *ngFor="let p of providers" [value]="p">{{ p }}</option>
                  </select>
                </div>
                <ng-container *ngFor="let provider of providers">
                  <app-auth-login [provider]="provider"></app-auth-login>
                </ng-container>
              </ng-container>
              <app-auth-logout *ngIf="sessionState.userInfo"></app-auth-logout>
            </div>
            <div class="user" *ngIf="sessionState.userInfo">
              <p>Welcome</p>
              <p>{{ sessionState.userInfo?.userDetails }}</p>
              <p>{{ sessionState.userInfo?.identityProvider }}</p>
            </div>
          </div>
        </ng-container>
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
          class="card-footer-item"
          [className]="'save-button'"
          [iconClasses]="'fa fa-sign-in'"
          (clicked)="login()"
          label="Login"
        ></app-button-footer>
      </footer>
    </div>
  `,
})
export class SignInComponent implements OnInit {
  // private subs = new Subscription();
  public sessionState$: Observable<SessionState>;
  // email: string = 'john@contoso.com';
  // password: string = '1234';
  providers = ['twitter', 'github', 'aad', 'google', 'facebook'];
  selectedProvider = this.providers[0];
  // userInfo: UserInfo;

  constructor(private sessionService: SessionService) {
    this.sessionState$ = this.sessionService.sessionState$;
    // this.sessionState$.pipe(
    //   // mergeMap((result) => this.route.queryParams),
    //   map((ui) => this.userInfo = ui)
    // );
  }

  ngOnInit(): void {}

  login() {
    this.goAuth();
  }

  cancel() {
    window.history.back();
  }

  goAuth() {
    if (this.selectedProvider) {
      const { pathname } = window.location;
      const redirect = `post_login_redirect_uri=${pathname}`;
      const url = `/.auth/login/${this.selectedProvider}?${redirect}`;
      window.location.href = url;
    }
  }

  // private route: ActivatedRoute,
  // private router: Router

  // async ngOnInit() {
  //   this.userInfo = await this.getUserInfo();
  // }

  // public get isLoggedIn(): boolean {
  //   return this.sessionService.isLoggedIn;
  // }

  // signin() {
  //   this.subs.add(
  //     this.sessionService
  //       .signin(this.email, this.password)
  //       .pipe(
  //         mergeMap((result) => this.route.queryParams),
  //         map((qp) => qp['redirectTo'])
  //       )
  //       .subscribe((redirectTo) => {
  //         if (this.sessionService.isLoggedIn) {
  //           console.info(`Successfully logged in`);
  //           const url = redirectTo ? [redirectTo] : ['/heroes'];
  //           this.router.navigate(url);
  //         }
  //       })
  //   );
  // }

  // logout() {
  //   this.sessionService.logout();
  //   console.info(`Successfully logged out`);
  // }

  // ngOnDestroy() {
  //   this.subs.unsubscribe();
  // }
}
