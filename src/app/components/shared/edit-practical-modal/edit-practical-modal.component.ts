import {
  CourseEditStart,
  CourseEditSuccess,
  CourseEditFail,
} from './../../courses/state/courses.action';
import {
  getCourseLoadingSelector,
  getCurretCourseSelector,
} from './../../courses/state/courses.selecrors';
import { Store } from '@ngrx/store';
import { PracticalCourse } from './../../courses/state/courses.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getAuthToken } from '../../auth/state/auth.selectors';

@Component({
  selector: 'app-edit-practical-modal',
  templateUrl: './edit-practical-modal.component.html',
  styleUrls: ['./edit-practical-modal.component.css'],
})
export class EditPracticalModalComponent
  implements OnInit, OnDestroy
{
  practicalCourse: FormGroup | any;
  isLoading$: Observable<boolean>;

  authToken: string;
  authSub: Subscription;
  courseSub: Subscription;
  currentCourse: PracticalCourse | any;

  createResponse: boolean = false;
  createMessage: string;
  createStatus: boolean;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getCourseLoadingSelector);
    this.authSub = this.store.select(getAuthToken).subscribe(data => {
      this.authToken = data;
    });

    this.courseSub = this.store
      .select(getCurretCourseSelector)
      .subscribe(data => {
        this.currentCourse = data.currentCourse;
        console.log(data);
      });

    this.practicalCourse = new FormGroup({
      courseCode: new FormControl(this.currentCourse.courseCode, [
        Validators.required,
      ]),
      courseName: new FormControl(this.currentCourse.courseName, [
        Validators.required,
      ]),
      academicYear: new FormControl(this.currentCourse.academicYear, [
        Validators.required,
      ]),
      pattern: new FormControl(this.currentCourse.pattern, [
        Validators.required,
      ]),
      faculty: new FormControl(this.currentCourse.faculty, [
        Validators.required,
      ]),
      department: new FormControl(this.currentCourse.department, [
        Validators.required,
      ]),
      programme: new FormControl(this.currentCourse.programme, [
        Validators.required,
      ]),
      credits: new FormControl(this.currentCourse.credits, [
        Validators.required,
      ]),
      semester: new FormControl(this.currentCourse.semester, [
        Validators.required,
      ]),
      division: new FormControl(this.currentCourse.division, [
        Validators.required,
      ]),
      batch: new FormControl(this.currentCourse.batch, [
        Validators.required,
      ]),
      dateWEF: new FormControl(this.currentCourse.dateWEF, [
        Validators.required,
      ]),
      LTP: new FormControl(this.currentCourse.LTP, [
        Validators.required,
      ]),
    });
  }
  EditPracticalCourse() {
    const updatedCourse: any = {
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

    let changedParts: any = {};
    const keys = Object.keys(updatedCourse);
    keys.forEach(item => {
      if (updatedCourse[item] !== this.currentCourse[item]) {
        changedParts[item] = updatedCourse[item];
      }
    });
    if (JSON.stringify(changedParts) === '{}') {
      return;
    }
    const body = {
      newDetails: {
        ...changedParts,
      },
      courseCode: this.currentCourse.courseCode,
    };
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
      body: JSON.stringify(body),
    };

    this.store.dispatch(CourseEditStart());
    fetch('http://localhost:2000/api/practical-course/edit', config)
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const updatedCourse = data.updatedCourse;
          updatedCourse['type'] = 'Practical';
          this.createResponse = true;
          this.createMessage = data.message;
          this.createStatus = true;
          this.store.dispatch(CourseEditSuccess({ updatedCourse }));
        } else {
          this.createResponse = true;
          this.createMessage = data.message;
          this.createStatus = false;
          const error = data.message;
          this.store.dispatch(CourseEditFail(error));
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
    if (this.courseSub) {
      this.courseSub.unsubscribe();
    }
    this.ResetResponse();
  }
}
