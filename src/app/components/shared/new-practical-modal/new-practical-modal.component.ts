import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-new-practical-modal',
  templateUrl: './new-practical-modal.component.html',
  styleUrls: ['./new-practical-modal.component.css'],
})
export class NewPracticalModalComponent implements OnInit {
  practicalCourse: FormGroup | any;
  isLoading$: Observable<boolean>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    //   this.isLoading$ = this.store.select(getTheoryCoursesLoading);
    this.practicalCourse = new FormGroup({
      courseCode: new FormControl(null, [Validators.required]),
      courseName: new FormControl(null, [Validators.required]),
      academicYear: new FormControl(null, [Validators.required]),
      pattern: new FormControl(null, [Validators.required]),
      faculty: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      programme: new FormControl(null, [Validators.required]),
      credits: new FormControl(null, [Validators.required]),
      semester: new FormControl(null, [Validators.required]),
      division: new FormControl(null, [Validators.required]),
      batch: new FormControl(null, [Validators.required]),
      dateWEF: new FormControl(null, [Validators.required]),
      LTP: new FormControl(null, [Validators.required]),
    });
  }
  addpracticalCourse() {}
}
