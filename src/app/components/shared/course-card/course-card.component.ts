import { EditPracticalModalComponent } from './../edit-practical-modal/edit-practical-modal.component';
import { EditTheoryModalComponent } from './../edit-theory-modal/edit-theory-modal.component';
import { Store } from '@ngrx/store';
import { DeleteCourseModalComponent } from './../delete-course-modal/delete-course-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PracticalCourse } from './../../courses/state/courses.model';
import { Component, Input, OnInit } from '@angular/core';
import { TheoryCourse } from '../../courses/state/courses.model';
import { AppState } from 'src/app/app.state';
import { CourseSetCurrentCourse } from '../../courses/state/courses.action';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: TheoryCourse | PracticalCourse;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {}

  openDeleteModel() {
    this.dialog.open(DeleteCourseModalComponent, {
      id: 'delete course',
      data: {
        courseCode: this.course.courseCode,
        courseName: this.course.courseName,
        type: this.course.type,
      },
    });
  }

  openEditModal() {
    this.store.dispatch(
      CourseSetCurrentCourse({ currentCourse: this.course })
    );
    if (this.course.type.toLowerCase() === 'theory') {
      this.dialog.open(EditTheoryModalComponent, {
        id: 'edit theory course',
      });
    }
    if (this.course.type.toLowerCase() === 'practical') {
      this.dialog.open(EditPracticalModalComponent, {
        id: 'edit pracical course',
      });
    }
  }
}
