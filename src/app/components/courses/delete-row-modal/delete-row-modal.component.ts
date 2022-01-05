import { CourseRowSuccess } from './../state/courses.action';
import { Store } from '@ngrx/store';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppState } from 'src/app/app.state';
import { Observable, Subscription } from 'rxjs';
import { getCourseLoadingSelector } from '../state/courses.selecrors';
import { CourseRowStart } from '../state/courses.action';

@Component({
  selector: 'app-delete-row-modal',
  templateUrl: './delete-row-modal.component.html',
  styleUrls: ['./delete-row-modal.component.css'],
})
export class DeleteRowModalComponent implements OnInit {
  isLoading$: Observable<boolean>;
  topic: string;
  deleteResponse: boolean = false;
  deleteMessage: string;
  deleteStatus: boolean;
  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      courseCode: string;
      _id: string;
      topic: string;
      type: string;
      token: string;
    }
  ) {}

  ngOnInit(): void {
    this.topic = this.data.topic;
    this.isLoading$ = this.store.select(getCourseLoadingSelector);
  }

  deletePlan() {
    let type = this.data.type.toLowerCase();
    const body = {
      courseCode: this.data.courseCode,
      _id: this.data._id,
    };
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.data.token}`,
      },
      body: JSON.stringify(body),
    };
    this.store.dispatch(CourseRowStart());
    fetch(
      `http://localhost:2000/api/${type}-course/plan/delete`,
      config
    )
      .then(response => response.json())
      .then(data => {
        if (!data.failed) {
          this.deleteResponse = true;
          this.deleteMessage = data.message;
          this.deleteStatus = true;
          this.store.dispatch(
            CourseRowSuccess({
              newCoursePlan: data.updatedCoursePlan,
            })
          );
        } else {
          this.deleteResponse = true;
          this.deleteMessage = data.message;
          this.deleteStatus = false;
        }
      })
      .catch(error => {});
  }

  ResetResponse() {
    this.deleteMessage = '';
    this.deleteResponse = false;
  }

  ngOnDestroy(): void {
    this.ResetResponse();
  }
}
