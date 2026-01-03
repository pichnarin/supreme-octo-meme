import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil, forkJoin } from 'rxjs';

// PrimeNG imports
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';
import { DashboardService } from '../../services/dashboard.service';
import {
  DashboardStats,
  AttendanceTrend,
  PayrollTrend,
  RecentActivity,
  QuickAction,
  DepartmentStats
} from '../../models/dashboard-stats.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ChartModule,
    CardModule,
    ButtonModule,
    SkeletonModule,
    AvatarModule,
    TagModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  loading = true;

  // Dashboard data
  stats: DashboardStats | null = null;
  attendanceTrends: AttendanceTrend[] = [];
  payrollTrends: PayrollTrend[] = [];
  recentActivities: RecentActivity[] = [];
  quickActions: QuickAction[] = [];
  departmentStats: DepartmentStats[] = [];

  // Chart data
  attendanceChartData: any;
  attendanceChartOptions: any;
  payrollChartData: any;
  payrollChartOptions: any;

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadDashboardData();
    this.initChartOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData(): void {
    this.loading = true;

    forkJoin({
      stats: this.dashboardService.getDashboardStats(),
      attendanceTrends: this.dashboardService.getAttendanceTrends(14),
      payrollTrends: this.dashboardService.getPayrollTrends(6),
      recentActivities: this.dashboardService.getRecentActivities(8),
      quickActions: this.dashboardService.getQuickActions(this.currentUser?.role),
      departmentStats: this.dashboardService.getDepartmentStats()
    }).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.stats = data.stats;
        this.attendanceTrends = data.attendanceTrends;
        this.payrollTrends = data.payrollTrends;
        this.recentActivities = data.recentActivities;
        this.quickActions = data.quickActions;
        this.departmentStats = data.departmentStats;

        this.prepareChartData();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.loading = false;
      }
    });
  }

  prepareChartData(): void {
    // Attendance chart (line chart)
    const workDays = this.attendanceTrends.filter(t => t.present > 0).reverse();

    this.attendanceChartData = {
      labels: workDays.map(t => {
        const date = new Date(t.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      datasets: [
        {
          label: 'Present',
          data: workDays.map(t => t.present),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Absent',
          data: workDays.map(t => t.absent),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'On Leave',
          data: workDays.map(t => t.onLeave),
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };

    // Payroll chart (bar chart)
    this.payrollChartData = {
      labels: this.payrollTrends.map(t => t.month).reverse(),
      datasets: [
        {
          label: 'Payroll Amount ($)',
          data: this.payrollTrends.map(t => t.amount).reverse(),
          backgroundColor: [
            'rgba(79, 70, 229, 0.8)',
            'rgba(99, 102, 241, 0.8)',
            'rgba(124, 58, 237, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(192, 132, 252, 0.8)'
          ],
          borderColor: [
            'rgb(79, 70, 229)',
            'rgb(99, 102, 241)',
            'rgb(124, 58, 237)',
            'rgb(139, 92, 246)',
            'rgb(168, 85, 247)',
            'rgb(192, 132, 252)'
          ],
          borderWidth: 2
        }
      ]
    };
  }

  initChartOptions(): void {
    const textColor = '#64748b';
    const gridColor = '#e2e8f0';

    this.attendanceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            font: {
              size: 11
            }
          },
          grid: {
            color: gridColor
          }
        },
        y: {
          ticks: {
            color: textColor,
            font: {
              size: 11
            }
          },
          grid: {
            color: gridColor
          }
        }
      }
    };

    this.payrollChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return `$${context.parsed.y.toFixed(2).toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            font: {
              size: 11
            }
          },
          grid: {
            color: gridColor
          }
        },
        y: {
          ticks: {
            color: textColor,
            font: {
              size: 11
            },
            callback: function(value: any) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            }
          },
          grid: {
            color: gridColor
          }
        }
      }
    };
  }

  navigateToAction(action: QuickAction): void {
    this.router.navigate([action.route]);
  }

  getActivityTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }

  getUserInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getRoleSeverity(role: string): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' {
    const severityMap: { [key: string]: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' } = {
      'admin': 'warning',
      'hr_manager': 'info',
      'hr_staff': 'success',
      'viewer': 'secondary'
    };
    return severityMap[role] || 'secondary';
  }
}
