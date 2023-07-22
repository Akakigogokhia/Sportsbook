import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as FromApp from '../../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  isLoading = false;
  storeSub: Subscription;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<FromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      (this.error = authState.authError!),
        (this.isLoading = authState.loading!);
    });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  authForm = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(6)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (!this.authForm.valid) return;

    const email = this.authForm.get('email')!.value!;
    const password = this.authForm.get('password')!.value!;

    if (this.isLoginMode) {
      this.store.dispatch(
        AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        AuthActions.SignupStart({ email: email, password: password })
      );
    }

    this.isLoading = true;
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
