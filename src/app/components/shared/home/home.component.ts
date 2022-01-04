import {
  CourseAddFail,
  CourseAddSuccess,
  CourseAddStart,
} from './../../courses/state/courses.action';
import {
  PracticalCourse,
  TheoryCourse,
} from './../../courses/state/courses.model';
import {
  getAuthStatus,
  getAuthToken,
} from './../../auth/state/auth.selectors';

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

  authStatus: boolean;
  authToken: string;
  coursesList: any[];

  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQwMDBiODhhMDNlMTJkMjdjYzkzNWEiLCJlbWFpbCI6Im9tbGFjaGFrZTAyQGdtYWlsLmNvbSIsIm5hbWUiOiJPbSAiLCJyb2xlIjoiSGVhZCBvZiBEZXBhcnRtZW50IiwiaWF0IjoxNjQxMjEyNjcxLCJleHAiOjE2NDEzODU0NzF9.--J3RDbKia9DuFo8az4tB54dv_jvdiQyVUyKGBGMPY8';
  ngOnInit(): void {
    this.coursesSub = this.store
      .select(getCoursesSelector)
      .subscribe(data => {
        this.coursesList = data;
      });
    this.authSub = this.store.select('auth').subscribe(data => {
      this.authToken = data.token;
      this.authStatus = data.isLoggedIn;
      if (!data.isLoggedIn) {
        this.router.navigate(['/auth/login']);
      }
    });
    setTimeout(() => {
      this.getTheoryCourses();
      this.getPracticalCourses();
    }, 2);
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

  async addPracticalCourse(practicalCourse: PracticalCourse) {
    const body = {
      courseDetails: {
        ...practicalCourse,
      },
    };
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
      body: JSON.stringify(body),
    };

    this.store.dispatch(CourseAddStart());
    await fetch(
      'http://localhost:2000/api/practical-course/create',
      config
    )
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const newCourse = data.newCourse;
          newCourse['type'] = 'Practical';
          this.store.dispatch(CourseAddSuccess({ newCourse }));
        } else {
          const error = data.message;
          this.store.dispatch(CourseAddFail(error));
        }
      })
      .catch(error => {});
  }

  async addTheoryCourse(theoryCourse: TheoryCourse) {
    const body = {
      courseDetails: {
        ...theoryCourse,
      },
    };
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
      body: JSON.stringify(body),
    };

    this.store.dispatch(CourseAddStart());
    await fetch(
      'http://localhost:2000/api/theory-course/create',
      config
    )
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const newCourse = data.newCourse;
          newCourse['type'] = 'Theory';
          this.store.dispatch(CourseAddSuccess({ newCourse }));
        } else {
          const error = data.message;
          this.store.dispatch(CourseAddFail(error));
        }
      })
      .catch(error => {});
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
