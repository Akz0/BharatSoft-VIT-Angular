import {
  CourseAddStart,
  CourseGetFail,
  CourseGetSuccess,
  CourseGetStart,
  CourseAddFail,
  CourseAddSuccess,
  CourseEditStart,
  CourseEditSuccess,
  CourseEditFail,
  CourseDeleteStart,
  CourseDeleteSuccess,
  CourseDeleteFail,
  CourseReset,
  CourseSetCurrentCourse,
  CourseSetCurrentCourseRow,
} from './courses.action';
import { initCourseState } from './courses.state';
import { createReducer, on } from '@ngrx/store';

const _CourseReducer = createReducer(
  initCourseState,
  on(CourseAddStart, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CourseAddSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: '',
      courses: [...state.courses, action.newCourse],
    };
  }),
  on(CourseAddFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(CourseGetStart, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CourseGetSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: '',
      courses: [...state.courses, ...action.courses],
    };
  }),
  on(CourseGetFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(CourseEditStart, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CourseEditSuccess, (state, action) => {
    const newCourse = action.updatedCourse;
    const updatedCourses = state.courses.map((course: any) => {
      if (
        course.courseCode === newCourse.courseCode &&
        course.type === newCourse.type
      ) {
        return newCourse;
      } else {
        return course;
      }
    });
    return {
      ...state,
      isLoading: false,
      error: '',
      courses: updatedCourses,
    };
  }),
  on(CourseEditFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(CourseDeleteStart, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CourseDeleteSuccess, (state, action) => {
    const updatedCourses = state.courses.filter((course: any) => {
      return course.courseCode !== action.courseCode;
    });
    return {
      ...state,
      courses: updatedCourses,
      isLoading: false,
      error: '',
    };
  }),
  on(CourseDeleteFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(CourseReset, (state, action) => {
    return {
      ...state,
      ...initCourseState,
    };
  }),
  on(CourseSetCurrentCourse, (state, action) => {
    return {
      ...state,
      currentCourse: action.currentCourse,
    };
  }),
  on(CourseSetCurrentCourseRow, (state, action) => {
    return {
      ...state,
      currentCourseRows: [...action.currentCourseRows],
    };
  })
);

export function CourseReducer(state: any, action: any) {
  return _CourseReducer(state, action);
}
