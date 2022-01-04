import {
  PracticalCourse,
  PracticalCourseRow,
  TheoryCourse,
  TheoryCourseRow,
} from './courses.model';

export interface CourseState {
  courses: (TheoryCourse | PracticalCourse)[];
  currentCourse?: TheoryCourse | PracticalCourse;
  currentCourseRows?: (TheoryCourseRow | PracticalCourseRow)[];
  isLoading: boolean;
  error: string;
}
export const initCourseState: CourseState = {
  courses: [],
  currentCourse: null,
  currentCourseRows: [],
  isLoading: false,
  error: '',
};
