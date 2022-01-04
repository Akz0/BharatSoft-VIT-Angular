import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './courses.state';

export const COURSE_STATE_NAME = 'theory';

const getCourseState =
  createFeatureSelector<CourseState>(COURSE_STATE_NAME);

export const getCoursesSelector = createSelector(
  getCourseState,
  state => state.courses
);

export const getCurretCourseSelector = createSelector(
  getCourseState,
  state => {
    state.currentCourse, state.currentCourseRows;
  }
);

export const getCourseLoadingSelector = createSelector(
  getCourseState,
  state => state.isLoading
);