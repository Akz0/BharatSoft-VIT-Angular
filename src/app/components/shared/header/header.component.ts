import { logout } from './../../auth/state/auth.actions';
import {
  getAuthStatus,
  getUser,
  getUserName,
} from './../../auth/state/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CourseReset } from '../../courses/state/courses.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  routeValid: boolean = true;
  routerSub: Subscription;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}
  isLoggedIn$: Observable<boolean>;
  name$: Observable<string>;
  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(getAuthStatus);
    this.name$ = this.store.select(getUserName);
    this.routerSub = this.router.events.subscribe(data => {
      if (this.router.url === '/courses/details/print') {
        this.routeValid = false;
      } else {
        this.routeValid = true;
      }
    });
  }
  logout() {
    this.store.dispatch(logout());
    this.store.dispatch(CourseReset());
    this.router.navigate(['/auth/login']);
  }
}
