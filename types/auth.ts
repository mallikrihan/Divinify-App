export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  name: string;
  phone: string;
}

export interface OTPVerification {
  phone: string;
  otp: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: AuthTokens;
}
export type UserData = {
  id?: string;
  name: string;
  phone: string;
  email?: string;
};
