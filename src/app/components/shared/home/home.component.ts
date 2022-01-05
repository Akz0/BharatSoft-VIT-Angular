import { AUTH_STATE_NAME } from './../../auth/state/auth.selectors';
import { CourseReset } from './../../courses/state/courses.action';
import {
  PracticalCourse,
  TheoryCourse,
} from './../../courses/state/courses.model';

import { Store } from '@ngrx/store';
import { NewTheoryModalComponent } from './../new-theory-modal/new-theory-modal.component';
import { NewPracticalModalComponent } from './../new-practical-modal/new-practical-modal.component';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/app.state';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { getCoursesSelector } from '../../courses/state/courses.selecrors';
import {
  CourseGetFail,
  CourseGetStart,
  CourseGetSuccess,
} from '../../courses/state/courses.action';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router
  ) {}
  coursesSub: Subscription;
  authSub: Subscription;
  isCourseLoading$: Observable<boolean>;

  authStatus: boolean;
  authToken: string;
  coursesList: any[];

  ngOnInit(): void {
    this.authSub = this.store
      .select(AUTH_STATE_NAME)
      .subscribe(data => {
        this.authToken = data.token;
        this.authStatus = data.isLoggedIn;
        if (!data.isLoggedIn) {
          this.router.navigate(['/auth/login']);
        } else {
          this.store.dispatch(CourseReset());
          this.coursesSub = this.store
            .select(getCoursesSelector)
            .subscribe(data => {
              this.coursesList = data;
            });
          this.getTheoryCourses();
          this.getPracticalCourses();
        }
      });
  }

  openNewPracticalDialog() {
    this.dialog.open(NewPracticalModalComponent, {
      id: 'new practical',
    });
  }

  openNewTheoryDialog() {
    this.dialog.open(NewTheoryModalComponent, {
      id: 'new theory',
    });
  }

  async getTheoryCourses() {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
    };
    this.store.dispatch(CourseGetStart());
    await fetch('http://localhost:2000/api/theory-course', config)
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const courses = data.courses.map((item: TheoryCourse) => {
            item['type'] = 'Theory';
            return item;
          });
          this.store.dispatch(CourseGetSuccess({ courses }));
        } else {
          const error = data.message;
          this.store.dispatch(CourseGetFail(error));
        }
      })
      .catch(error => {});
  }
  async getPracticalCourses() {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
    };
    this.store.dispatch(CourseGetStart());
    await fetch('http://localhost:2000/api/practical-course', config)
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const courses = data.courses.map(
            (item: PracticalCourse) => {
              item['type'] = 'Practical';
              return item;
            }
          );
          this.store.dispatch(CourseGetSuccess({ courses }));
        } else {
          const error = data.message;
          this.store.dispatch(CourseGetFail(error));
        }
      })
      .catch(error => {});
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
  }
}
