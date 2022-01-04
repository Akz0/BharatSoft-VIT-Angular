import { getAuthToken } from './../../auth/state/auth.selectors';
import { getCourseLoadingSelector } from './../../courses/state/courses.selecrors';
import { Store } from '@ngrx/store';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CourseDeleteStart,
  CourseDeleteSuccess,
} from '../../courses/state/courses.action';

@Component({
  selector: 'app-delete-course-modal',
  templateUrl: './delete-course-modal.component.html',
  styleUrls: ['./delete-course-modal.component.css'],
})
export class DeleteCourseModalComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  courseCode: string;
  courseName: string;

  authToken: string;
  authSub: Subscription;

  deleteResponse: boolean = false;
  deleteMessage: string;
  deleteStatus: boolean;
  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      courseCode: string;
      courseName: string;
      type: string;
    }
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getCourseLoadingSelector);
    this.authSub = this.store.select(getAuthToken).subscribe(data => {
      this.authToken = data;
    });

    this.courseCode = this.data.courseCode;
    this.courseName = this.data.courseName;
  }

  deleteCourse() {
    let type = this.data.type.toLowerCase();
    const body = {
      courseCode: this.courseCode,
    };
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
      body: JSON.stringify(body),
    };
    this.store.dispatch(CourseDeleteStart());
    fetch(`http://localhost:2000/api/${type}-course/delete`, config)
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          this.deleteResponse = true;
          this.deleteMessage = data.message;
          this.deleteStatus = true;
          this.store.dispatch(
            CourseDeleteSuccess({ courseCode: data.courseCode })
          );
        } else {
          this.deleteResponse = true;
          this.deleteMessage = data.message;
          this.deleteStatus = false;
        }
      })
      .catch(error => {});
  }

  ResetResponse() {
    this.deleteMessage = '';
    this.deleteResponse = false;
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }

    this.ResetResponse();
  }
}
