import {
  CourseAddSuccess,
  CourseAddFail,
} from './../../courses/state/courses.action';
import { getCourseLoadingSelector } from './../../courses/state/courses.selecrors';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getAuthToken } from '../../auth/state/auth.selectors';
import { CourseAddStart } from '../../courses/state/courses.action';

@Component({
  selector: 'app-new-practical-modal',
  templateUrl: './new-practical-modal.component.html',
  styleUrls: ['./new-practical-modal.component.css'],
})
export class NewPracticalModalComponent implements OnInit, OnDestroy {
  practicalCourse: FormGroup | any;
  isLoading$: Observable<boolean>;

  authToken: string;
  authSub: Subscription;

  createResponse: boolean = false;
  createMessage: string;
  createStatus: boolean;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getCourseLoadingSelector);
    this.authSub = this.store.select(getAuthToken).subscribe(data => {
      this.authToken = data;
    });

    this.practicalCourse = new FormGroup({
      courseCode: new FormControl(null, [Validators.required]),
      courseName: new FormControl(null, [Validators.required]),
      academicYear: new FormControl(null, [Validators.required]),
      pattern: new FormControl(null, [Validators.required]),
      faculty: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      programme: new FormControl(null, [Validators.required]),
      credits: new FormControl(null, [Validators.required]),
      semester: new FormControl(null, [Validators.required]),
      division: new FormControl(null, [Validators.required]),
      batch: new FormControl(null, [Validators.required]),
      dateWEF: new FormControl(null, [Validators.required]),
      LTP: new FormControl(null, [Validators.required]),
    });
  }
  addPracticalCourse() {
    const practicalCourse = {
      courseCode: this.practicalCourse.value.courseCode,
      courseName: this.practicalCourse.value.courseName,
      academicYear: this.practicalCourse.value.academicYear,
      pattern: this.practicalCourse.value.pattern,
      faculty: this.practicalCourse.value.faculty,
      department: this.practicalCourse.value.department,
      programme: this.practicalCourse.value.programme,
      credits: this.practicalCourse.value.credits,
      semester: this.practicalCourse.value.semester,
      division: this.practicalCourse.value.division,
      batch: this.practicalCourse.value.batch,
      dateWEF: this.practicalCourse.value.dateWEF,
      LTP: this.practicalCourse.value.LTP,
    };

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
    fetch('http://localhost:2000/api/practical-course/create', config)
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const newCourse = data.newCourse;
          newCourse['type'] = 'Practical';
          this.createResponse = true;
          this.createMessage = data.message;
          this.createStatus = true;
          this.store.dispatch(CourseAddSuccess({ newCourse }));
        } else {
          this.createResponse = true;
          this.createMessage = data.message;
          this.createStatus = false;
          const error = data.message;
          this.store.dispatch(CourseAddFail(error));
        }
      })
      .catch(error => {});
  }

  ResetResponse() {
    this.createResponse = false;
    this.createMessage = '';
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    this.ResetResponse();
  }
}
