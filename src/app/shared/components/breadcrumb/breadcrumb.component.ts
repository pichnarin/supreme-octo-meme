import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        // Don't show breadcrumbs on dashboard page
        if (this.router.url === '/dashboard') {
          this.breadcrumbs = [];
        }
      });

    // Initial breadcrumbs
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    // Don't show breadcrumbs on dashboard page
    if (this.router.url === '/dashboard') {
      this.breadcrumbs = [];
    }
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');

      if (routeURL !== '') {
        // Split the route to handle flat paths like 'organization/sections'
        const segments = routeURL.split('/');

        // Build breadcrumbs for each segment
        for (const segment of segments) {
          url += `/${segment}`;

          const label = this.getLabelForRoute(url);
          if (label) {
            breadcrumbs.push({ label, url });
          }
        }
      }

      // Recursively process child routes
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private getLabelForRoute(url: string): string {
    const routeMap: { [key: string]: string } = {
      '/dashboard': 'menu.dashboard',
      '/employees': 'menu.employees',
      '/organization': 'menu.organization',
      '/organization/departments': 'menu.departments',
      '/organization/sections': 'menu.sections',
      '/organization/positions': 'menu.positions',
      '/organization/groups': 'menu.groups',
      '/attendance': 'menu.attendance',
      '/attendance/daily': 'menu.daily',
      '/attendance/weekly': 'menu.weekly',
      '/attendance/monthly': 'menu.monthly',
      '/attendance/summary': 'menu.summary',
      '/time-schedule': 'menu.timeSchedule',
      '/time-schedule/time-tables': 'menu.timeTables',
      '/time-schedule/shifts': 'menu.shifts',
      '/time-schedule/shift-assignment': 'menu.shiftAssignment',
      '/time-schedule/shift-change': 'menu.shiftChange',
      '/leave-holiday': 'menu.leaveHoliday',
      '/leave-holiday/holidays': 'menu.holidays',
      '/leave-holiday/leave-types': 'menu.leaveTypes',
      '/leave-holiday/leave-requests': 'menu.leaveRequests',
      '/leave-holiday/leave-balance': 'menu.leaveBalance',
      '/allowance-deduction': 'menu.allowanceDeduction',
      '/allowance-deduction/allowance-types': 'menu.allowanceTypes',
      '/allowance-deduction/deduction-types': 'menu.deductionTypes',
      '/allowance-deduction/advances': 'menu.advances',
      '/payroll': 'menu.payroll',
      '/payroll/list': 'menu.payrollList',
      '/payroll/calculate': 'menu.calculate',
      '/payroll/payslips': 'menu.payslips',
      '/reports': 'menu.reports',
      '/reports/attendance': 'menu.attendanceReport',
      '/reports/payroll': 'menu.payrollReport',
      '/reports/tax': 'menu.taxReport',
      '/reports/nssf': 'menu.nssfReport',
      '/reports/bank': 'menu.bankReport',
      '/settings': 'menu.settings',
      '/settings/company-info': 'menu.companyInfo',
      '/settings/payroll-settings': 'menu.payrollSettings',
      '/settings/tax-settings': 'menu.taxSettings',
      '/settings/nssf-settings': 'menu.nssfSettings',
      '/settings/users': 'menu.users',
      '/settings/audit-log': 'menu.auditLog'
    };

    return routeMap[url] || '';
  }
}
