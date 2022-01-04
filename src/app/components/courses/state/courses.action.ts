import { createAction, props } from '@ngrx/store';
import { PracticalCourse, TheoryCourse } from './courses.model';
export const COURSE_ADD_START = '[COURSE] add start';
export const COURSE_ADD_SUCCESS = '[COURSE] add success';
export const COURSE_ADD_FAIL = '[COURSE] add fail';

export const COURSE_EDIT_START = '[COURSE] edit start';
export const COURSE_EDIT_SUCCESS = '[COURSE] edit success';
export const COURSE_EDIT_FAIL = '[COURSE] edit fail';

export const COURSE_DELETE_START = '[COURSE] delete start';
export const COURSE_DELETE_SUCCESS = '[COURSE] delete success';
export const COURSE_DELETE_FAIL = '[COURSE] delete fail';

export const COURSE_GET_START = '[COURSE] get start';
export const COURSE_GET_SUCCESS = '[COURSE] get success';
export const COURSE_GET_FAIL = '[COURSE] get fail';

// Add Courses
export const CourseAddStart = createAction(COURSE_ADD_START);
export const CourseAddSuccess = createAction(
  COURSE_ADD_SUCCESS,
  props<{ newCourse: TheoryCourse | PracticalCourse }>()
);
export const CourseAddFail = createAction(
  COURSE_ADD_FAIL,
  props<{ error: string }>()
);

// Edit Courses
export const CourseEditStart = createAction(COURSE_EDIT_START);
export const CourseEditSuccess = createAction(
  COURSE_EDIT_SUCCESS,
  props<{ updatedCourse: TheoryCourse | PracticalCourse }>()
);
export const CourseEditFail = createAction(
  COURSE_EDIT_FAIL,
  props<{ error: string }>()
);

// Delete Courses
export const CourseDeleteStart = createAction(COURSE_DELETE_START);
export const CourseDeleteSuccess = createAction(
  COURSE_DELETE_SUCCESS,
  props<{ courseCode: string }>()
);
export const CourseDeleteFail = createAction(
  COURSE_DELETE_FAIL,
  props<{ error: string }>()
);

// Get Courses
export const CourseGetStart = createAction(COURSE_GET_START);
export const CourseGetSuccess = createAction(
  COURSE_GET_SUCCESS,
  props<{ courses: (TheoryCourse | PracticalCourse)[] }>()
);
export const CourseGetFail = createAction(
  COURSE_GET_FAIL,
  props<{ error: string }>()
);
