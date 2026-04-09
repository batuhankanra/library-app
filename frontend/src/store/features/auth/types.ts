import type { User } from "../../../types";

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: any;
}
export interface LoginResponse{
   message:string,
  token:string,
  user:User;
}

export interface LoginPayload {
  email: string;
  password: string;
}