import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';
import { switchMap, map, of, catchError, tap } from 'rxjs';
import { AuthResponse, User } from '../auth.models';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
              return this.authService.handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return this.authService.handleError(errorRes);
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
              return this.authService.handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return this.authService.handleError(errorRes);
            })
          )
      )
    )
  );

  AutoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AutoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData')!);
        if (userData) {
          return AuthActions.Login({
            email: userData.email,
            userId: userData.id,
            token: userData._token!,
            expirationDate: new Date(userData._tokenExpirationDate),
          });
        } else return { type: 'DUMMY' };
      })
    )
  );

  AuthLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.Logout),
        tap(() => {
          localStorage.removeItem('userData');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
}
