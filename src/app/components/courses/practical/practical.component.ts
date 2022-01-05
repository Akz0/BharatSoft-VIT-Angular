import {
  CourseRowSuccess,
  CourseRowFail,
} from './../state/courses.action';
import { AUTH_STATE_NAME } from './../../auth/state/auth.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PracticalCourse } from '../state/courses.model';
import { AppState } from 'src/app/app.state';
import { COURSE_STATE_NAME } from '../state/courses.selecrors';
import { CourseRowStart } from '../state/courses.action';

@Component({
  selector: 'app-practical',
  templateUrl: './practical.component.html',
  styleUrls: ['./practical.component.css'],
})
export class PracticalComponent implements OnInit {
  authSub: Subscription;
  authToken: string;
  authStatus: boolean;

  coursesSub: Subscription;
  currentCourse: PracticalCourse | any;
  isLoading: boolean;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSub = this.store
      .select(AUTH_STATE_NAME)
      .subscribe(data => {
        this.authToken = data.token;
        this.authStatus = data.isLoggedIn;
        if (!data.isLoggedIn) {
          this.router.navigate(['/auth/login']);
        } else {
          this.coursesSub = this.store
            .select(COURSE_STATE_NAME)
            .subscribe(data => {
              this.currentCourse = data.currentCourse;
              this.isLoading = data.isLoading;
            });
          if (this.currentCourse) {
            this.getCurrentCourseRows(this.currentCourse.courseCode);
          }
        }
      });
  }

  async getCurrentCourseRows(courseCode: string | any) {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
    };
    this.store.dispatch(CourseRowStart());
    await fetch(
      'http://localhost:2000/api/practical-course/plan/' + courseCode,
      config
    )
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const currentCourseRows = data.coursePlanRows;
          this.store.dispatch(
            CourseRowSuccess({ newCoursePlan: currentCourseRows })
          );
        } else {
          const error = data.message;
          this.store.dispatch(CourseRowFail(error));
        }
      })
      .catch(error => {});
  }
}
