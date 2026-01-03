import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  DashboardStats,
  AttendanceTrend,
  PayrollTrend,
  RecentActivity,
  QuickAction,
  DepartmentStats
} from '../models/dashboard-stats.model';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_ATTENDANCE_TRENDS,
  MOCK_PAYROLL_TRENDS,
  MOCK_RECENT_ACTIVITIES,
  MOCK_QUICK_ACTIONS,
  MOCK_DEPARTMENT_STATS
} from '../data/dashboard-mock.data';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private stats: DashboardStats = { ...MOCK_DASHBOARD_STATS };
  private attendanceTrends: AttendanceTrend[] = [...MOCK_ATTENDANCE_TRENDS];
  private payrollTrends: PayrollTrend[] = [...MOCK_PAYROLL_TRENDS];
  private recentActivities: RecentActivity[] = [...MOCK_RECENT_ACTIVITIES];
  private quickActions: QuickAction[] = [...MOCK_QUICK_ACTIONS];
  private departmentStats: DepartmentStats[] = [...MOCK_DEPARTMENT_STATS];

  constructor() {}

  getDashboardStats(): Observable<DashboardStats> {
    return of({ ...this.stats }).pipe(delay(500));
  }

  getAttendanceTrends(days: number = 14): Observable<AttendanceTrend[]> {
    const trends = this.attendanceTrends.slice(0, days);
    return of([...trends]).pipe(delay(400));
  }

  getPayrollTrends(months: number = 6): Observable<PayrollTrend[]> {
    const trends = this.payrollTrends.slice(0, months);
    return of([...trends]).pipe(delay(400));
  }

  getRecentActivities(limit: number = 8): Observable<RecentActivity[]> {
    const activities = this.recentActivities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
    return of([...activities]).pipe(delay(300));
  }

  getQuickActions(userRole?: string): Observable<QuickAction[]> {
    let actions = [...this.quickActions];

    // Filter actions based on user role if provided
    if (userRole && userRole !== 'admin') {
      actions = actions.filter(action =>
        !action.permission || action.permission === userRole || userRole === 'hr_manager'
      );
    }

    return of(actions).pipe(delay(200));
  }

  getDepartmentStats(): Observable<DepartmentStats[]> {
    return of([...this.departmentStats]).pipe(delay(400));
  }

  // Simulate real-time stats update (could be called by a polling mechanism)
  refreshStats(): Observable<DashboardStats> {
    // In a real app, this would fetch fresh data from the backend
    // For now, we'll just add some random variation to simulate changes
    const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1

    this.stats = {
      ...this.stats,
      presentToday: Math.max(0, this.stats.presentToday + variation),
      onLeave: Math.max(0, this.stats.onLeave - variation)
    };

    return of({ ...this.stats }).pipe(delay(300));
  }
}
