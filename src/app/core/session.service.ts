import { Injectable } from '@angular/core';
import { UserInfo } from './model';
import { BehaviorSubject } from 'rxjs';

export interface SessionState {
  userInfo: UserInfo;
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  providers = ['twitter', 'github', 'aad', 'google', 'facebook'];
  userInfo: UserInfo;
  private sessionStateSubject = new BehaviorSubject<SessionState>({
    userInfo: this.userInfo,
  });
  accessToken: string = 'fake access token';

  public get isLoggedIn(): boolean {
    return !!this.userInfo?.userId;
  }

  readOnly = false;
  sessionState$ = this.sessionStateSubject.asObservable();

  async checkAuth() {
    this.userInfo = await this.getUserInfo();
    this.sessionStateSubject.next({ userInfo: this.userInfo });
  }

  async getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }
}
