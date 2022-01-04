import { logout } from './../../auth/state/auth.actions';
import {
  getAuthStatus,
  getUser,
  getUserName,
} from './../../auth/state/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}
  isLoggedIn$: Observable<boolean>;
  name$: Observable<string>;
  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(getAuthStatus);
    this.name$ = this.store.select(getUserName);
  }
  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/auth/login']);
  }
}
