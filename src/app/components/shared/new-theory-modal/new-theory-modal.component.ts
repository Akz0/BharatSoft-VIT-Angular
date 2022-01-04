import {
  CourseAddSuccess,
  CourseAddFail,
} from './../../courses/state/courses.action';
import { getAuthToken } from './../../auth/state/auth.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getCourseLoadingSelector } from '../../courses/state/courses.selecrors';
import { CourseAddStart } from '../../courses/state/courses.action';
@Component({
  selector: 'app-new-theory-modal',
  templateUrl: './new-theory-modal.component.html',
  styleUrls: ['./new-theory-modal.component.css'],
})
export class NewTheoryModalComponent implements OnInit, OnDestroy {
  theoryCourse: FormGroup | any;
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

    this.theoryCourse = new FormGroup({
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
      courseTeacher: new FormControl(null, [Validators.required]),
      dateWEF: new FormControl(null, [Validators.required]),
      LTP: new FormControl(null, [Validators.required]),
    });
  }

  addTheoryCourse() {
    const theoryCourse = {
      courseCode: this.theoryCourse.value.courseCode,
      courseName: this.theoryCourse.value.courseName,
      academicYear: this.theoryCourse.value.academicYear,
      pattern: this.theoryCourse.value.pattern,
      faculty: this.theoryCourse.value.faculty,
      department: this.theoryCourse.value.department,
      programme: this.theoryCourse.value.programme,
      credits: this.theoryCourse.value.credits,
      semester: this.theoryCourse.value.semester,
      division: this.theoryCourse.value.division,
      courseTeacher: this.theoryCourse.value.courseTeacher,
      dateWEF: this.theoryCourse.value.dateWEF,
      LTP: this.theoryCourse.value.LTP,
    };

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

    console.log(this.authSub);

    this.store.dispatch(CourseAddStart());
    fetch('http://localhost:2000/api/theory-course/create', config)
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const newCourse = data.newCourse;
          newCourse['type'] = 'Theory';
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
