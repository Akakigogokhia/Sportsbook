import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as FromApp from '../../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Subscription } from 'rxjs';
import { User } from './auth.models';
import * as BetslipSelectors from '../betslip/store/betslip.selectors';
import * as BetslipActions from '../betslip/store/betslip.actions';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  storeSub: Subscription;
  error: string;
  user: User | null;
  balance: number;
  balanceSub: Subscription;
  auth: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<FromApp.AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      (this.error = authState.authError!),
        (this.isLoading = authState.loading!),
        (this.user = authState.user);
    });
    this.balanceSub = this.store
      .select(BetslipSelectors.balanceSelector)
      .subscribe((balance) => (this.balance = balance));
  }

  addBalance = () => {
    this.store.dispatch(BetslipActions.AddBalance({ amount: 100 }));
  };

  showAuth = () => {
    this.auth = !this.auth;
  };

  goHome = () => {
    this.router.navigate(['/']);
  };

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
    this.balanceSub.unsubscribe();
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

  logout = () => {
    this.authService.logout();
  };
}
