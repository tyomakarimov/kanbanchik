export interface AuthState {
  user: string | null;
  authenticated: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

export interface LogInData {
  userName: string;
  password: string;
}
