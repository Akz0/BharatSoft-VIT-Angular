import { Router } from '@angular/router';
import { AUTH_STATE_NAME } from './../../auth/state/auth.selectors';
import { Store } from '@ngrx/store';
import {
  TheoryCourse,
  PracticalCourse,
  TheoryCourseRow,
  PracticalCourseRow,
} from './../state/courses.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { COURSE_STATE_NAME } from '../state/courses.selecrors';

@Component({
  selector: 'app-print-window',
  templateUrl: './print-window.component.html',
  styleUrls: ['./print-window.component.css'],
})
export class PrintWindowComponent implements OnInit, OnDestroy {
  currentCourse: TheoryCourse | PracticalCourse | any;
  currentCourseRows: (TheoryCourseRow | PracticalCourseRow)[];
  type: string = 'Theory';

  authSub: Subscription;
  courseSub: Subscription;

  columnIdsTheory: string[] = [
    'unitNo',
    'lectureNo',
    'topic',
    'CO',
    'coThreshold',
    'BTL',
    'teachingMethod',
    'studentActivity',
    'assessmentTool',
    'scheduleA',
    'scheduleB',
    'scheduleC',
    'conductionA',
    'conductionB',
    'conductionC',
    'deviationReason',
  ];

  columnIdsPractical: string[] = [
    'practicalNo',
    'nameOfExperiment',
    'CO',
    'coThreshold',
    'BTL',
    'teachingMethod',
    'studentActivity',
    'assessmentTool',
    'scheduleA',
    'scheduleB',
    'scheduleC',
    'conductionA',
    'conductionB',
    'conductionC',
    'deviationReason',
  ];

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.authSub = this.store
      .select(AUTH_STATE_NAME)
      .subscribe(data => {
        if (!data.isLoggedIn) {
          this.router.navigate(['/auth/login']);
        } else {
          this.courseSub = this.store
            .select(COURSE_STATE_NAME)
            .subscribe(data => {
              if (!data.currentCourse) {
                this.router.navigate(['']);
                return;
              }
              this.currentCourse = data.currentCourse;
              this.currentCourseRows = data.currentCourseRows;
              this.type = data.currentCourse.type;
            });
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
