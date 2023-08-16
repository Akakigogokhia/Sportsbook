import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, take } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthSelectors from '../../components/auth/store/auth.selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(AuthSelectors.userSelector).pipe(
      take(1),
      exhaustMap((user) => {
        if (
          !req.url.includes('tickets.json') &&
          !req.url.includes('balance.json')
        )
          return next.handle(req);
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user!.token!),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
