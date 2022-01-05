import { CourseGetFail } from './../state/courses.action';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  TheoryCourse,
  TheoryCourseRow,
} from './../state/courses.model';
import { COURSE_STATE_NAME } from './../state/courses.selecrors';
import { Router } from '@angular/router';
import { AUTH_STATE_NAME } from './../../auth/state/auth.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Subscription } from 'rxjs';
import {
  CourseRowFail,
  CourseRowStart,
  CourseRowSuccess,
} from '../state/courses.action';

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css'],
})
export class TheoryComponent implements OnInit {
  authSub: Subscription;
  authToken: string;
  authStatus: boolean;

  coursesSub: Subscription;
  currentCourse: TheoryCourse | any;
  currentCourseRows: TheoryCourseRow[] | any;
  isLoading: boolean;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authSub = this.store
      .select(AUTH_STATE_NAME)
      .subscribe(data => {
        this.authToken = data.token;
        this.authStatus = data.isLoggedIn;
        if (!data.isLoggedIn) {
          this.router.navigate(['/auth/login']);
        } else {
          this.coursesSub = this.store
            .select(COURSE_STATE_NAME)
            .subscribe(data => {
              this.currentCourse = data.currentCourse;
              this.isLoading = data.isLoading;
              this.currentCourseRows = data.currentCourseRows;
            });
          if (this.currentCourse.courseCode) {
            this.getCurrentCourseRows(this.currentCourse.courseCode);
          }
        }
      });
  }

  async getCurrentCourseRows(courseCode: string | any) {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
    };
    this.store.dispatch(CourseRowStart());
    await fetch(
      'http://localhost:2000/api/theory-course/plan/' + courseCode,
      config
    )
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          const currentCourseRows = data.coursePlanRows;
          this.store.dispatch(
            CourseRowSuccess({ newCoursePlan: currentCourseRows })
          );
        } else {
          const error = data.message;
          this.store.dispatch(CourseRowFail(error));
        }
      })
      .catch(error => {});
  }

  downloadTablePDF() {
    const dataHeads = [
      'Unit No.',
      'Lecure No.',
      'Topic',
      'CO',
      'CO Threshold',
      'BTL',
      'Teaching Method',
      'Student Activity',
      'Assessment Tool',
      'Schedule A',
      'Schedule B',
      'Schedule C',
      'Conduction A',
      'Conduction B',
      'Conduction C',
      'Deviation Reason',
    ];

    const data = this.currentCourseRows;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('My PDF Table', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    (doc as any).autoTable({
      html: '#theory-table',
      theme: 'grid',
      didDrawCell: (data: { column: { index: any } }) => {
        console.log(data.column.index);
      },
    });
    doc.output('dataurlnewwindow');
  }
}
