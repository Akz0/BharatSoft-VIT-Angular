import { SharedState } from './components/shared/state/shared.model';
import { AuthState } from './components/auth/state/auth.model';
import { authReducer } from './components/auth/state/auth.reducer';
import { sharedReducer } from './components/shared/state/shared.reducers';
import { CourseState } from './components/courses/state/courses.state';
import { CourseReducer } from './components/courses/state/courses.reducer';

export interface AppState {
  auth: AuthState;
  shared: SharedState;
  course: CourseState;
}

export const AppReducer = {
  auth: authReducer,
  shared: sharedReducer,
  theory: CourseReducer,
};
