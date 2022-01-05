import {
  CourseRowSuccess,
  CourseRowFail,
} from './../../../state/courses.action';
import { TheoryCourseRow } from './../../../state/courses.model';
import {
  getCourseLoadingSelector,
  COURSE_STATE_NAME,
} from './../../../state/courses.selecrors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getAuthToken } from 'src/app/components/auth/state/auth.selectors';
import { CourseRowStart } from '../../../state/courses.action';

@Component({
  selector: 'app-edit-row-modal',
  templateUrl: './edit-row-modal.component.html',
  styleUrls: ['./edit-row-modal.component.css'],
})
export class EditRowModalComponent implements OnInit {
  theoryCourseRow: FormGroup | any;
  isLoading$: Observable<boolean>;

  authToken: string;
  authSub: Subscription;

  courseSub: Subscription;
  courseCode: string;
  currentRow: TheoryCourseRow | any;
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
      .select(COURSE_STATE_NAME)
      .subscribe(data => {
        this.courseCode = data.currentCourse.courseCode;
        this.currentRow = data.currentRow;
      });

    this.theoryCourseRow = new FormGroup({
      unitNo: new FormControl(this.currentRow.unitNo, [
        Validators.required,
      ]),
      lectureNo: new FormControl(this.currentRow.lectureNo, [
        Validators.required,
      ]),
      topic: new FormControl(this.currentRow.topic, [
        Validators.required,
      ]),
      CO: new FormControl(this.currentRow.CO, [Validators.required]),
      coThreshold: new FormControl(this.currentRow.coThreshold, [
        Validators.required,
      ]),
      BTL: new FormControl(this.currentRow.BTL, [
        Validators.required,
      ]),
      teachingMethod: new FormControl(
        this.currentRow.teachingMethod,
        [Validators.required]
      ),
      studentActivity: new FormControl(
        this.currentRow.studentActivity,
        [Validators.required]
      ),
      assessmentTool: new FormControl(
        this.currentRow.assessmentTool,
        [Validators.required]
      ),
      scheduleA: new FormControl(this.currentRow.scheduleA),
      scheduleB: new FormControl(this.currentRow.scheduleB),
      scheduleC: new FormControl(this.currentRow.scheduleC),
      conductionA: new FormControl(this.currentRow.conductionA),
      conductionB: new FormControl(this.currentRow.conductionB),
      conductionC: new FormControl(this.currentRow.conductionC),
      deviationReason: new FormControl(
        this.currentRow.deviationReason
      ),
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
      _id: this.currentRow._id,
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
    fetch('http://localhost:2000/api/theory-course/plan/edit', config)
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
