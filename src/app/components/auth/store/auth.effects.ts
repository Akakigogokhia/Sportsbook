import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';
import { switchMap, map, of, catchError, tap } from 'rxjs';
import { AuthResponse, User } from '../auth.models';
import { Router } from '@angular/router';

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return AuthActions.Login({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
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

@Injectable()
export class AuthEffects {
  apiKey = environment.firebaseApiKey;
  AuthSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignupStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  AuthLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginStart),
      switchMap((action) =>
        this.http
          .post<AuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          )
      )
    )
  );

  AuthRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.Login),
        tap(() => {
          this.router.navigate(['/sport']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
