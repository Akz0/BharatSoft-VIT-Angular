import {
  CourseRowSuccess,
  CourseRowFail,
  CourseRowStart,
} from './../../../state/courses.action';
import {
  getCourseLoadingSelector,
  getCurretCourseSelector,
} from './../../../state/courses.selecrors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getAuthToken } from 'src/app/components/auth/state/auth.selectors';

@Component({
  selector: 'app-new-row-modal',
  templateUrl: './new-row-modal.component.html',
  styleUrls: ['./new-row-modal.component.css'],
})
export class NewRowModalComponent implements OnInit {
  theoryCourseRow: FormGroup | any;
  isLoading$: Observable<boolean>;

  authToken: string;
  authSub: Subscription;

  courseSub: Subscription;
  courseCode: string;

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
        this.courseCode = data.currentCourse.courseCode;
      });

    this.theoryCourseRow = new FormGroup({
      unitNo: new FormControl(null, [Validators.required]),
      lectureNo: new FormControl(null, [Validators.required]),
      topic: new FormControl(null, [Validators.required]),
      CO: new FormControl(null, [Validators.required]),
      coThreshold: new FormControl(null, [Validators.required]),
      BTL: new FormControl(null, [Validators.required]),
      teachingMethod: new FormControl(null, [Validators.required]),
      studentActivity: new FormControl(null, [Validators.required]),
      assessmentTool: new FormControl(null, [Validators.required]),
      scheduleA: new FormControl(null),
      scheduleB: new FormControl(null),
      scheduleC: new FormControl(null),
      conductionA: new FormControl(null),
      conductionB: new FormControl(null),
      conductionC: new FormControl(null),
      deviationReason: new FormControl(null),
    });
  }

  addTheoryCourseRow() {
    const theoryCourseRowRow = {
      unitNo: this.theoryCourseRow.value.unitNo,
      lectureNo: this.theoryCourseRow.value.lectureNo,
      topic: this.theoryCourseRow.value.topic,
      CO: this.theoryCourseRow.value.CO,
      coThreshold: this.theoryCourseRow.value.coThreshold,
      BTL: this.theoryCourseRow.value.BTL,
      teachingMethod: this.theoryCourseRow.value.teachingMethod,
      studentActivity: this.theoryCourseRow.value.studentActivity,
      assessmentTool: this.theoryCourseRow.value.assessmentTool,
      scheduleA: this.theoryCourseRow.value.scheduleA,
      scheduleB: this.theoryCourseRow.value.scheduleB,
      scheduleC: this.theoryCourseRow.value.scheduleC,
      conductionA: this.theoryCourseRow.value.conductionA,
      conductionB: this.theoryCourseRow.value.conductionB,
      conductionC: this.theoryCourseRow.value.conductionC,
      deviationReason: this.theoryCourseRow.value.deviationReason,
    };

    const body = {
      row: {
        ...theoryCourseRowRow,
      },
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

    console.log(this.authSub);

    this.store.dispatch(CourseRowStart());
    fetch(
      'http://localhost:2000/api/theory-course/plan/create',
      config
    )
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          this.createResponse = true;
          this.createMessage = data.message;
          this.createStatus = true;
          this.store.dispatch(
            CourseRowSuccess({
              newCoursePlan: data.updatedCoursePlan,
            })
          );
        } else {
          this.createResponse = true;
          this.createMessage = data.message;
          this.createStatus = false;
          const error = data.message;
          this.store.dispatch(CourseRowFail(error));
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
