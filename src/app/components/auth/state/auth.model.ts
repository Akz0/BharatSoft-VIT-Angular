export interface AuthState {
  user?: {
    name?: string;
    email?: string;
    role?: string;
  };
  token?: string;
  isLoggedIn: boolean;
  error?: string;
  isLoading: boolean;
}
