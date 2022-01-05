import { PrintWindowComponent } from './print-window/print-window.component';
import { AngularMaterialModule } from './../shared/material/material.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TheoryComponent } from './theory/theory.component';
import { TheoryRowComponent } from './theory/theory-row/theory-row.component';
import { StoreModule } from '@ngrx/store';
import { COURSE_STATE_NAME } from './state/courses.selecrors';
import { CourseReducer } from './state/courses.reducer';
import { PracticalComponent } from './practical/practical.component';
import { PracticalRowComponent } from './practical/practical-row/practical-row.component';
import { NewRowModalComponent } from './theory/theory-row/new-row-modal/new-row-modal.component';
import { EditRowModalComponent } from './theory/theory-row/edit-row-modal/edit-row-modal.component';
import { DeleteRowModalComponent } from './delete-row-modal/delete-row-modal.component';
import { NewPracticalRowModalComponent } from './practical/practical-row/new-practical-row-modal/new-practical-row-modal.component';
import { EditPracticalRowModalComponent } from './practical/practical-row/edit-practical-row-modal/edit-practical-row-modal.component';

const routes: Routes = [
  {
    path: 'details',
    children: [
      { path: 'theory', component: TheoryComponent },
      { path: 'practical', component: PracticalComponent },
      { path: 'print', component: PrintWindowComponent },
    ],
  },
];

@NgModule({
  declarations: [
    PrintWindowComponent,
    TheoryComponent,
    TheoryRowComponent,
    PracticalComponent,
    PracticalRowComponent,
    NewRowModalComponent,
    EditRowModalComponent,
    DeleteRowModalComponent,
    NewPracticalRowModalComponent,
    EditPracticalRowModalComponent,
  ],
  entryComponents: [NewRowModalComponent, EditRowModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(COURSE_STATE_NAME, CourseReducer),
    AngularMaterialModule,
  ],
})
export class CoursesModule {}
