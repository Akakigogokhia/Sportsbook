import { Injectable } from '@angular/core';
import { User } from './auth.models';
import * as AuthActions from './store/auth.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenTimer: any;
  constructor(private store: Store<AppState>) {}

  handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string
  ) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+expiresIn * 1000);
    return AuthActions.Login({
      email: email,
      userId: userId,
      token: token,
      expirationDate: expirationDate,
    });
  };

  handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(AuthActions.LoginFail({ error: errorMessage }));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return of(AuthActions.LoginFail({ error: errorMessage }));
  };

  logout = () => {
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
    this.store.dispatch(AuthActions.Logout());
    location.reload();
  };

  autoLogout = (expirationDuration: number) => {
    setTimeout(() => {
      this.tokenTimer = this.logout();
    }, expirationDuration);
  };
}
