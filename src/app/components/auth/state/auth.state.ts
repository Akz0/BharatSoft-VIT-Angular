import { AuthState } from './auth.model';

export const initAuthState: AuthState = {
  token: '',
  user: {
    name: '',
    role: '',
    email: '',
  },
  isLoggedIn: false,
  isLoading: false,
  error: '',
};
