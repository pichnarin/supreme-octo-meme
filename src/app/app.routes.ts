import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      // Employee Management
      {
        path: 'employees',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      // Organization Management
      {
        path: 'organization/sections',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'organization/departments',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'organization/positions',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'organization/groups',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      // Attendance Management
      {
        path: 'attendance/daily',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      // Organization Management
      {
        path: 'attendance/weekly',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'attendance/monthly',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'attendance/summary',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      //Time and Scheduling Management
      {
        path: 'time-schedule/time-tables',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'time-schedule/shifts',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'time-schedule/shift-assignment',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'time-schedule/shift-change',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      //Leave and Holiday Management
      {
        path: 'leave-holiday/holidays',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'leave-holiday/leave-types',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'leave-holiday/leave-requests',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'leave-holiday/leave-balance',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },

      //Allowances and Deductions Management
      {
        path: 'allowance-deduction/allowance-types',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'allowance-deduction/deduction-types',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'allowance-deduction/advances',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },

      //Payroll Management
      {
        path: 'payroll/list',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'payroll/calculate',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'payroll/payslips',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },

      //Report Management
      {
        path: 'reports/attendance',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'reports/payroll',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'reports/tax',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'reports/nssf',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'reports/bank',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      //Setting management
      {
        path: 'settings/company-info',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'settings/payroll-settings',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'settings/tax-settings',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'settings/nssf-settings',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'settings/users',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'settings/audit-log',
        loadComponent: () => import('./features/employees/pages/dashboard/employee.component').then(m => m.EmployeeComponent)
      },


      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
