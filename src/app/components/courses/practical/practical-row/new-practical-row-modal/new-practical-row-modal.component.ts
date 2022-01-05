import {
  CourseRowSuccess,
  CourseRowFail,
} from './../../../state/courses.action';
import { getCurretCourseSelector } from './../../../state/courses.selecrors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getCourseLoadingSelector } from '../../../state/courses.selecrors';
import { getAuthToken } from 'src/app/components/auth/state/auth.selectors';
import { CourseRowStart } from '../../../state/courses.action';

@Component({
  selector: 'app-new-practical-row-modal',
  templateUrl: './new-practical-row-modal.component.html',
  styleUrls: ['./new-practical-row-modal.component.css'],
})
export class NewPracticalRowModalComponent implements OnInit {
  practicalCourseRow: FormGroup | any;
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

    this.practicalCourseRow = new FormGroup({
      practicalNo: new FormControl(null, [Validators.required]),
      nameOfExperiment: new FormControl(null, [Validators.required]),
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

  addpracticalCourseRow() {
    const practicalCourseRowRow = {
      practicalNo: this.practicalCourseRow.value.practicalNumber,
      nameOfExperiment:
        this.practicalCourseRow.value.nameOfExperiment,
      CO: this.practicalCourseRow.value.CO,
      coThreshold: this.practicalCourseRow.value.coThreshold,
      BTL: this.practicalCourseRow.value.BTL,
      teachingMethod: this.practicalCourseRow.value.teachingMethod,
      studentActivity: this.practicalCourseRow.value.studentActivity,
      assessmentTool: this.practicalCourseRow.value.assessmentTool,
      scheduleA: this.practicalCourseRow.value.scheduleA,
      scheduleB: this.practicalCourseRow.value.scheduleB,
      scheduleC: this.practicalCourseRow.value.scheduleC,
      conductionA: this.practicalCourseRow.value.conductionA,
      conductionB: this.practicalCourseRow.value.conductionB,
      conductionC: this.practicalCourseRow.value.conductionC,
      deviationReason: this.practicalCourseRow.value.deviationReason,
    };

    const body = {
      row: {
        ...practicalCourseRowRow,
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
      'http://localhost:2000/api/practical-course/plan/create',
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
