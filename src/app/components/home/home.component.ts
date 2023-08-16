import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthSelectors from '../auth/store/auth.selectors';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User | null;
  menu: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select(AuthSelectors.userSelector)
      .subscribe((user) => (this.user = user));
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  showMenu = () => {
    this.menu = !this.menu;
  };
}
