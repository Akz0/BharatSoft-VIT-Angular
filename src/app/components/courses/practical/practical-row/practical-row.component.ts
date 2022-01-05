import { NewPracticalRowModalComponent } from './new-practical-row-modal/new-practical-row-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  TheoryCourseRow,
  PracticalCourseRow,
} from './../../state/courses.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PracticalCourse } from '../../state/courses.model';
import { AppState } from 'src/app/app.state';
import { getAuthToken } from 'src/app/components/auth/state/auth.selectors';
import {
  COURSE_STATE_NAME,
  getCourseLoadingSelector,
} from '../../state/courses.selecrors';
import { DeleteRowModalComponent } from '../../delete-row-modal/delete-row-modal.component';
import { CourseSetCurrentRow } from '../../state/courses.action';
import { EditPracticalRowModalComponent } from './edit-practical-row-modal/edit-practical-row-modal.component';

@Component({
  selector: 'app-practical-row',
  templateUrl: './practical-row.component.html',
  styleUrls: ['./practical-row.component.css'],
})
export class PracticalRowComponent implements OnInit {
  authSub: Subscription;
  authToken: string;
  courseSub: Subscription;
  currentCourse: PracticalCourse | any;
  isLoading$: Observable<boolean>;

  currentCourseRows: (TheoryCourseRow | PracticalCourseRow)[];
  columnIds: string[] = [
    'edit',
    'delete',
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
  testCourseRows: any[] = [
    {
      unitNo: '1',
      lectureNo: '2',
      topic: 'Steps to a Data Science Project',
      CO: '1',
      coThreshold: '2',
      BTL: 'Analyze',
      teachingMethod: 'Presentation',
      studentActivity: 'Participation',
      assessmentTool: 'CIE-1:MCQ Based',
      scheduleA: '02/01/2021',
      scheduleB: 'updated 2',
      scheduleC: '',
      conductionA: '',
      conductionB: '',
      conductionC: '',
      deviationReason: '',
      _id: '61d556fa7e3bb8455e94ee6c',
    },
    {
      unitNo: 'asd',
      lectureNo: '2',
      topic: '23',
      CO: 'asd',
      coThreshold: 'asd',
      BTL: 'asd',
      teachingMethod: 'asd',
      studentActivity: 'asdasd',
      assessmentTool: 'asdasd',
      scheduleA: 'asd',
      scheduleB: 'as',
      scheduleC: null,
      conductionA: null,
      conductionB: null,
      conductionC: null,
      deviationReason: null,
      _id: '61d55e937e3bb8455e94eeb4',
    },
    {
      unitNo: '3',
      lectureNo: 'asdasd',
      topic: 'asasd',
      CO: 'asda',
      coThreshold: 'asdasd',
      BTL: 'asdasd',
      teachingMethod: 'asda',
      studentActivity: 'asdasd',
      assessmentTool: 'asdasd',
      scheduleA: 'sdasd',
      scheduleB: 'dasd',
      scheduleC: 'asdasd',
      conductionA: 'asda',
      conductionB: 'asdasd',
      conductionC: 'asdasd',
      deviationReason: 'asdas',
      _id: '61d569ced567c05f49c3fbdc',
    },
  ];
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authSub = this.store.select(getAuthToken).subscribe(data => {
      this.authToken = data;
    });
    this.isLoading$ = this.store.select(getCourseLoadingSelector);
    this.courseSub = this.store
      .select(COURSE_STATE_NAME)
      .subscribe(data => {
        this.currentCourse = data.currentCourse;
        this.currentCourseRows = data.currentCourseRows;
      });
  }

  openDeleteDialog(id: any, topic: any) {
    this.dialog.open(DeleteRowModalComponent, {
      id: 'theory row delete modal',
      data: {
        token: this.authToken,
        _id: id,
        topic: topic,
        type: this.currentCourse.type,
        courseCode: this.currentCourse.courseCode,
      },
    });
  }

  openPracticalRowEditDialog(id: any) {
    const currentRow = this.currentCourseRows.filter(
      (item: any) => item._id === id
    )[0];
    this.store.dispatch(CourseSetCurrentRow({ currentRow }));
    this.dialog.open(EditPracticalRowModalComponent, {
      id: 'practical row edit modal',
      data: {
        courseCode: this.currentCourse.courseCode,
      },
    });
  }
  openTheoryRowNewDialog() {
    this.dialog.open(NewPracticalRowModalComponent, {
      id: 'practical row new modal',
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
