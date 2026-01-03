export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'admin' | 'hr_manager' | 'hr_staff' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin?: Date;
  createdAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
