import { createAction, props } from '@ngrx/store';
import {
  PracticalCourse,
  PracticalCourseRow,
  TheoryCourse,
  TheoryCourseRow,
} from './courses.model';

// Add Courses
export const COURSE_ADD_START = '[COURSE] add start';
export const COURSE_ADD_SUCCESS = '[COURSE] add success';
export const COURSE_ADD_FAIL = '[COURSE] add fail';

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
export const COURSE_EDIT_START = '[COURSE] edit start';
export const COURSE_EDIT_SUCCESS = '[COURSE] edit success';
export const COURSE_EDIT_FAIL = '[COURSE] edit fail';

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
export const COURSE_DELETE_START = '[COURSE] delete start';
export const COURSE_DELETE_SUCCESS = '[COURSE] delete success';
export const COURSE_DELETE_FAIL = '[COURSE] delete fail';

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
export const COURSE_GET_START = '[COURSE] get start';
export const COURSE_GET_SUCCESS = '[COURSE] get success';
export const COURSE_GET_FAIL = '[COURSE] get fail';

export const CourseGetStart = createAction(COURSE_GET_START);
export const CourseGetSuccess = createAction(
  COURSE_GET_SUCCESS,
  props<{ courses: (TheoryCourse | PracticalCourse)[] }>()
);
export const CourseGetFail = createAction(
  COURSE_GET_FAIL,
  props<{ error: string }>()
);

// Resets
export const COURSE_RESET = '[COURSE] reset';
export const CourseReset = createAction(COURSE_RESET);

// Set Current Courses
export const COURSE_SET_CURRENT_COURSE =
  '[COURSE] set current course';
export const COURSE_SET_CURRENT_COURSE_ROW =
  '[COURSE] set current course row';
export const COURSE_RESET_CURRENT_COURSE =
  '[COURSE] reset current course';

export const CourseSetCurrentCourse = createAction(
  COURSE_SET_CURRENT_COURSE,
  props<{ currentCourse: TheoryCourse | PracticalCourse }>()
);

export const CourseSetCurrentCourseRow = createAction(
  COURSE_SET_CURRENT_COURSE_ROW,
  props<{
    currentCourseRows: (TheoryCourseRow | PracticalCourseRow)[];
  }>()
);

export const CourseResetCurrentCourse = createAction(
  COURSE_RESET_CURRENT_COURSE
);
