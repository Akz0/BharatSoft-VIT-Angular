import { PracticalCourseRow } from './../../../state/courses.model';
import { Store } from '@ngrx/store';
import {
  CourseRowFail,
  CourseRowSuccess,
  CourseRowStart,
} from './../../../state/courses.action';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  COURSE_STATE_NAME,
  getCourseLoadingSelector,
} from '../../../state/courses.selecrors';
import { AppState } from 'src/app/app.state';
import { getAuthToken } from 'src/app/components/auth/state/auth.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-practical-row-modal',
  templateUrl: './edit-practical-row-modal.component.html',
  styleUrls: ['./edit-practical-row-modal.component.css'],
})
export class EditPracticalRowModalComponent implements OnInit {
  practicalCourseRow: FormGroup | any;
  isLoading$: Observable<boolean>;

  authToken: string;
  authSub: Subscription;

  courseSub: Subscription;
  courseCode: string;
  currentRow: PracticalCourseRow | any;
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

    this.practicalCourseRow = new FormGroup({
      practicalNo: new FormControl(this.currentRow.practicalNo, [
        Validators.required,
      ]),
      nameOfExperiment: new FormControl(
        this.currentRow.nameOfExperiment,
        [Validators.required]
      ),
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

  addPracticalCourseRow() {
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
    fetch(
      'http://localhost:2000/api/practical-course/plan/edit',
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
