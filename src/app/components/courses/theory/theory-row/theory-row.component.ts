import { EditRowModalComponent } from './edit-row-modal/edit-row-modal.component';
import {
  COURSE_STATE_NAME,
  getCourseLoadingSelector,
} from './../../state/courses.selecrors';
import {
  PracticalCourseRow,
  TheoryCourse,
  TheoryCourseRow,
} from './../../state/courses.model';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Observable, Subscription } from 'rxjs';
import { getAuthToken } from 'src/app/components/auth/state/auth.selectors';
import { NewRowModalComponent } from './new-row-modal/new-row-modal.component';
import { CourseSetCurrentRow } from '../../state/courses.action';
import { DeleteRowModalComponent } from '../../delete-row-modal/delete-row-modal.component';

@Component({
  selector: 'app-theory-row',
  templateUrl: './theory-row.component.html',
  styleUrls: ['./theory-row.component.css'],
})
export class TheoryRowComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  authToken: string;
  courseSub: Subscription;
  currentCourse: TheoryCourse | any;
  isLoading$: Observable<boolean>;

  currentCourseRows: (TheoryCourseRow | PracticalCourseRow)[];
  columnIds: string[] = [
    'edit',
    'delete',
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

  openTheoryRowEditDialog(id: any) {
    const currentRow = this.currentCourseRows.filter(
      (item: any) => item._id === id
    )[0];
    this.store.dispatch(CourseSetCurrentRow({ currentRow }));
    this.dialog.open(EditRowModalComponent, {
      id: 'theory row edit modal',
      data: {
        courseCode: this.currentCourse.courseCode,
      },
    });
  }
  openTheoryRowNewDialog() {
    this.dialog.open(NewRowModalComponent, {
      id: 'theory row new modal',
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.courseSub) this.courseSub.unsubscribe();
  }
}
