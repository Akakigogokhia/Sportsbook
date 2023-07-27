import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';
import { switchMap, map, of, catchError, tap } from 'rxjs';
import { AuthResponse, User } from '../auth.models';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private router: Router,
    private authService: AuthService
  ) {}
}
