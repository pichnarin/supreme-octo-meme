export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  items?: MenuItem[];
  badge?: string;
  badgeSeverity?: 'success' | 'info' | 'warning' | 'danger';
  visible?: boolean;
  roles?: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'menu.dashboard',
    icon: 'pi pi-home',
    route: '/dashboard'
  },
  {
    label: 'menu.employees',
    icon: 'pi pi-users',
    route: '/employees'
  },
  {
    label: 'menu.organization',
    icon: 'pi pi-sitemap',
    items: [
      {
        label: 'menu.departments',
        icon: 'pi pi-building',
        route: '/organization/departments'
      },
      {
        label: 'menu.sections',
        icon: 'pi pi-box',
        route: '/organization/sections'
      },
      {
        label: 'menu.positions',
        icon: 'pi pi-briefcase',
        route: '/organization/positions'
      },
      {
        label: 'menu.groups',
        icon: 'pi pi-objects-column',
        route: '/organization/groups'
      }
    ]
  },
  {
    label: 'menu.attendance',
    icon: 'pi pi-calendar-clock',
    items: [
      {
        label: 'menu.daily',
        icon: 'pi pi-calendar',
        route: '/attendance/daily'
      },
      {
        label: 'menu.weekly',
        icon: 'pi pi-calendar',
        route: '/attendance/weekly'
      },
      {
        label: 'menu.monthly',
        icon: 'pi pi-calendar',
        route: '/attendance/monthly'
      },
      {
        label: 'menu.summary',
        icon: 'pi pi-chart-bar',
        route: '/attendance/summary'
      }
    ]
  },
  {
    label: 'menu.timeSchedule',
    icon: 'pi pi-clock',
    items: [
      {
        label: 'menu.timeTables',
        icon: 'pi pi-table',
        route: '/time-schedule/time-tables'
      },
      {
        label: 'menu.shifts',
        icon: 'pi pi-sun',
        route: '/time-schedule/shifts'
      },
      {
        label: 'menu.shiftAssignment',
        icon: 'pi pi-user-edit',
        route: '/time-schedule/shift-assignment'
      },
      {
        label: 'menu.shiftChange',
        icon: 'pi pi-sync',
        route: '/time-schedule/shift-change'
      }
    ]
  },
  {
    label: 'menu.leaveHoliday',
    icon: 'pi pi-calendar-times',
    items: [
      {
        label: 'menu.holidays',
        icon: 'pi pi-star',
        route: '/leave-holiday/holidays'
      },
      {
        label: 'menu.leaveTypes',
        icon: 'pi pi-tags',
        route: '/leave-holiday/leave-types'
      },
      {
        label: 'menu.leaveRequests',
        icon: 'pi pi-file',
        route: '/leave-holiday/leave-requests'
      },
      {
        label: 'menu.leaveBalance',
        icon: 'pi pi-chart-pie',
        route: '/leave-holiday/leave-balance'
      }
    ]
  },
  {
    label: 'menu.allowanceDeduction',
    icon: 'pi pi-dollar',
    items: [
      {
        label: 'menu.allowanceTypes',
        icon: 'pi pi-plus-circle',
        route: '/allowance-deduction/allowance-types'
      },
      {
        label: 'menu.deductionTypes',
        icon: 'pi pi-minus-circle',
        route: '/allowance-deduction/deduction-types'
      },
      {
        label: 'menu.advances',
        icon: 'pi pi-wallet',
        route: '/allowance-deduction/advances'
      }
    ]
  },
  {
    label: 'menu.payroll',
    icon: 'pi pi-money-bill',
    items: [
      {
        label: 'menu.payrollList',
        icon: 'pi pi-list',
        route: '/payroll/list'
      },
      {
        label: 'menu.calculate',
        icon: 'pi pi-calculator',
        route: '/payroll/calculate'
      },
      {
        label: 'menu.payslips',
        icon: 'pi pi-file-pdf',
        route: '/payroll/payslips'
      }
    ]
  },
  {
    label: 'menu.reports',
    icon: 'pi pi-chart-line',
    items: [
      {
        label: 'menu.attendanceReport',
        icon: 'pi pi-file',
        route: '/reports/attendance'
      },
      {
        label: 'menu.payrollReport',
        icon: 'pi pi-file',
        route: '/reports/payroll'
      },
      {
        label: 'menu.taxReport',
        icon: 'pi pi-file',
        route: '/reports/tax'
      },
      {
        label: 'menu.nssfReport',
        icon: 'pi pi-file',
        route: '/reports/nssf'
      },
      {
        label: 'menu.bankReport',
        icon: 'pi pi-file',
        route: '/reports/bank'
      }
    ]
  },
  {
    label: 'menu.settings',
    icon: 'pi pi-cog',
    items: [
      {
        label: 'menu.companyInfo',
        icon: 'pi pi-building',
        route: '/settings/company-info'
      },
      {
        label: 'menu.payrollSettings',
        icon: 'pi pi-sliders-h',
        route: '/settings/payroll-settings'
      },
      {
        label: 'menu.taxSettings',
        icon: 'pi pi-percentage',
        route: '/settings/tax-settings'
      },
      {
        label: 'menu.nssfSettings',
        icon: 'pi pi-shield',
        route: '/settings/nssf-settings'
      },
      {
        label: 'menu.users',
        icon: 'pi pi-users',
        route: '/settings/users'
      },
      {
        label: 'menu.auditLog',
        icon: 'pi pi-history',
        route: '/settings/audit-log'
      }
    ]
  }
];
