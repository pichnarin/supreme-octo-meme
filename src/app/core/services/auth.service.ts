import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  // Mock users for authentication
  private readonly mockUsers = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@7tech.com',
      fullName: 'Admin User',
      role: 'admin' as const,
      status: 'active' as const,
      createdAt: new Date('2024-01-01')
    },
    {
      id: 2,
      username: 'hrmanager',
      password: 'hrmanager123',
      email: 'hrmanager@7tech.com',
      fullName: 'HR Manager',
      role: 'hr_manager' as const,
      status: 'active' as const,
      createdAt: new Date('2024-01-01')
    },
    {
      id: 3,
      username: 'hrstaff',
      password: 'hrstaff123',
      email: 'hrstaff@7tech.com',
      fullName: 'HR Staff',
      role: 'hr_staff' as const,
      status: 'active' as const,
      createdAt: new Date('2024-01-01')
    },
    {
      id: 4,
      username: 'viewer',
      password: 'viewer123',
      email: 'viewer@7tech.com',
      fullName: 'Viewer User',
      role: 'viewer' as const,
      status: 'active' as const,
      createdAt: new Date('2024-01-01')
    }
  ];

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    const user = this.storageService.getUser();
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Simulate API call with delay
    return of(credentials).pipe(
      delay(800),
      map(cred => {
        const user = this.mockUsers.find(
          u => u.username === cred.username && u.password === cred.password
        );

        if (!user) {
          throw new Error('Invalid username or password');
        }

        if (user.status !== 'active') {
          throw new Error('User account is inactive');
        }

        // Create user object without password
        const { password, ...userWithoutPassword } = user;
        const authenticatedUser: User = {
          ...userWithoutPassword,
          lastLogin: new Date()
        };

        // Generate mock token
        const token = this.generateMockToken(authenticatedUser.id);

        return {
          user: authenticatedUser,
          token
        };
      }),
      tap(response => {
        // Store token and user
        this.storageService.setToken(response.token);
        this.storageService.setUser(response.user);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    this.storageService.removeToken();
    this.storageService.removeUser();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.storageService.getToken();
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.includes(user.role) : false;
  }

  private generateMockToken(userId: number): string {
    const randomString = Math.random().toString(36).substring(2);
    return `mock_token_${userId}_${randomString}_${Date.now()}`;
  }

  // Get all mock users (for development/testing purposes)
  getMockUsers(): Array<{username: string, password: string, role: string}> {
    return this.mockUsers.map(u => ({
      username: u.username,
      password: u.password,
      role: u.role
    }));
  }
}
