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
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getAuthToken } from '../../auth/state/auth.selectors';
import { TheoryCourse } from '../../courses/state/courses.model';

@Component({
  selector: 'app-edit-theory-modal',
  templateUrl: './edit-theory-modal.component.html',
  styleUrls: ['./edit-theory-modal.component.css'],
})
export class EditTheoryModalComponent implements OnInit {
  theoryCourse: FormGroup | any;
  isLoading$: Observable<boolean>;

  authToken: string;
  authSub: Subscription;
  courseSub: Subscription;
  currentCourse: TheoryCourse | any;

  editResponse: boolean = false;
  editMessage: string;
  editStatus: boolean;

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

    this.theoryCourse = new FormGroup({
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
      courseTeacher: new FormControl(
        this.currentCourse.courseTeacher,
        [Validators.required]
      ),
      dateWEF: new FormControl(this.currentCourse.dateWEF, [
        Validators.required,
      ]),
      LTP: new FormControl(this.currentCourse.LTP, [
        Validators.required,
      ]),
    });
  }

  EditTheoryCourse() {
    const updatedCourse: any = {
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

    let changedParts: any = {};
    const keys = Object.keys(updatedCourse);
    keys.forEach(item => {
      if (updatedCourse[item] !== this.currentCourse[item]) {
        changedParts[item] = updatedCourse[item];
      }
    });

    console.log('Changed Parts : ', changedParts);

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

    console.log(this.authSub);

    this.store.dispatch(CourseEditStart());
    fetch('http://localhost:2000/api/theory-course/edit', config)
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const updatedCourse = data.updatedCourse;
          updatedCourse['type'] = 'Theory';
          this.editResponse = true;
          this.editMessage = data.message;
          this.editStatus = true;
          this.store.dispatch(CourseEditSuccess({ updatedCourse }));
        } else {
          this.editResponse = true;
          this.editMessage = data.message;
          this.editStatus = false;
          const error = data.message;
          this.store.dispatch(CourseEditFail(error));
        }
      })
      .catch(error => {});
  }

  ResetResponse() {
    this.editResponse = false;
    this.editMessage = '';
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
