import {
  DashboardStats,
  AttendanceTrend,
  PayrollTrend,
  RecentActivity,
  QuickAction,
  DepartmentStats
} from '../models/dashboard-stats.model';

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalEmployees: 245,
  presentToday: 238,
  onLeave: 7,
  pendingPayroll: 12,
  monthlyAttendanceRate: 97.1,
  averageSalary: 850.50,
  totalDepartments: 8,
  activePositions: 24
};

export const MOCK_ATTENDANCE_TRENDS: AttendanceTrend[] = [
  { date: '2026-01-03', present: 238, absent: 0, onLeave: 7 },
  { date: '2026-01-02', present: 240, absent: 2, onLeave: 3 },
  { date: '2026-01-01', present: 0, absent: 0, onLeave: 0 }, // Holiday
  { date: '2025-12-31', present: 235, absent: 5, onLeave: 5 },
  { date: '2025-12-30', present: 242, absent: 1, onLeave: 2 },
  { date: '2025-12-29', present: 0, absent: 0, onLeave: 0 }, // Weekend
  { date: '2025-12-28', present: 0, absent: 0, onLeave: 0 }, // Weekend
  { date: '2025-12-27', present: 240, absent: 3, onLeave: 2 },
  { date: '2025-12-26', present: 238, absent: 4, onLeave: 3 },
  { date: '2025-12-25', present: 0, absent: 0, onLeave: 0 }, // Holiday
  { date: '2025-12-24', present: 241, absent: 2, onLeave: 2 },
  { date: '2025-12-23', present: 239, absent: 3, onLeave: 3 },
  { date: '2025-12-22', present: 0, absent: 0, onLeave: 0 }, // Weekend
  { date: '2025-12-21', present: 0, absent: 0, onLeave: 0 }  // Weekend
];

export const MOCK_PAYROLL_TRENDS: PayrollTrend[] = [
  { month: 'Dec 2025', amount: 208372.50, employeeCount: 245 },
  { month: 'Nov 2025', amount: 207845.00, employeeCount: 244 },
  { month: 'Oct 2025', amount: 206128.75, employeeCount: 242 },
  { month: 'Sep 2025', amount: 204567.25, employeeCount: 240 },
  { month: 'Aug 2025', amount: 203891.50, employeeCount: 239 },
  { month: 'Jul 2025', amount: 202345.00, employeeCount: 238 }
];

export const MOCK_RECENT_ACTIVITIES: RecentActivity[] = [
  {
    id: 1,
    type: 'employee',
    icon: 'pi-user-plus',
    iconColor: 'text-green-600',
    title: 'New Employee Added',
    description: 'John Doe joined as Software Engineer in IT Department',
    timestamp: new Date('2026-01-03T09:30:00'),
    user: 'HR Manager'
  },
  {
    id: 2,
    type: 'payroll',
    icon: 'pi-dollar',
    iconColor: 'text-blue-600',
    title: 'Payroll Processed',
    description: 'December 2025 payroll successfully processed for 245 employees',
    timestamp: new Date('2026-01-02T14:15:00'),
    user: 'System'
  },
  {
    id: 3,
    type: 'leave',
    icon: 'pi-calendar',
    iconColor: 'text-orange-600',
    title: 'Leave Request Approved',
    description: 'Annual leave approved for Sarah Smith (Jan 5-7, 2026)',
    timestamp: new Date('2026-01-02T11:45:00'),
    user: 'HR Manager'
  },
  {
    id: 4,
    type: 'attendance',
    icon: 'pi-clock',
    iconColor: 'text-purple-600',
    title: 'Attendance Alert',
    description: '3 employees marked late today',
    timestamp: new Date('2026-01-03T08:15:00'),
    user: 'System'
  },
  {
    id: 5,
    type: 'employee',
    icon: 'pi-user-edit',
    iconColor: 'text-indigo-600',
    title: 'Employee Profile Updated',
    description: 'Michael Johnson updated position to Senior Developer',
    timestamp: new Date('2026-01-02T10:20:00'),
    user: 'HR Staff'
  },
  {
    id: 6,
    type: 'leave',
    icon: 'pi-calendar-times',
    iconColor: 'text-red-600',
    title: 'Leave Request Rejected',
    description: 'Sick leave request rejected - insufficient balance',
    timestamp: new Date('2026-01-01T16:30:00'),
    user: 'HR Manager'
  },
  {
    id: 7,
    type: 'system',
    icon: 'pi-cog',
    iconColor: 'text-gray-600',
    title: 'System Backup Completed',
    description: 'Daily backup completed successfully',
    timestamp: new Date('2026-01-03T02:00:00'),
    user: 'System'
  },
  {
    id: 8,
    type: 'payroll',
    icon: 'pi-file-pdf',
    iconColor: 'text-blue-600',
    title: 'Payslips Generated',
    description: 'December payslips sent to all employees',
    timestamp: new Date('2026-01-02T15:00:00'),
    user: 'System'
  }
];

export const MOCK_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'add-employee',
    title: 'Add Employee',
    description: 'Add a new employee to the system',
    icon: 'pi-user-plus',
    iconColor: 'text-green-600 bg-green-50',
    route: '/employees/create',
    permission: 'hr_manager'
  },
  {
    id: 'process-payroll',
    title: 'Process Payroll',
    description: 'Calculate and process monthly payroll',
    icon: 'pi-calculator',
    iconColor: 'text-blue-600 bg-blue-50',
    route: '/payroll/calculate',
    permission: 'admin'
  },
  {
    id: 'mark-attendance',
    title: 'Mark Attendance',
    description: 'Record daily attendance',
    icon: 'pi-check-circle',
    iconColor: 'text-purple-600 bg-purple-50',
    route: '/attendance/daily'
  },
  {
    id: 'view-reports',
    title: 'View Reports',
    description: 'Access payroll and attendance reports',
    icon: 'pi-chart-line',
    iconColor: 'text-orange-600 bg-orange-50',
    route: '/reports'
  },
  {
    id: 'manage-leave',
    title: 'Manage Leave',
    description: 'Review and approve leave requests',
    icon: 'pi-calendar',
    iconColor: 'text-indigo-600 bg-indigo-50',
    route: '/leave-holiday/leave-requests',
    permission: 'hr_manager'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure system settings',
    icon: 'pi-cog',
    iconColor: 'text-gray-600 bg-gray-50',
    route: '/settings/company',
    permission: 'admin'
  }
];

export const MOCK_DEPARTMENT_STATS: DepartmentStats[] = [
  { name: 'IT Department', employeeCount: 45, presentToday: 44, attendanceRate: 97.8 },
  { name: 'Human Resources', employeeCount: 12, presentToday: 12, attendanceRate: 100.0 },
  { name: 'Finance', employeeCount: 18, presentToday: 17, attendanceRate: 94.4 },
  { name: 'Marketing', employeeCount: 25, presentToday: 24, attendanceRate: 96.0 },
  { name: 'Sales', employeeCount: 50, presentToday: 49, attendanceRate: 98.0 },
  { name: 'Operations', employeeCount: 35, presentToday: 34, attendanceRate: 97.1 },
  { name: 'Customer Service', employeeCount: 40, presentToday: 38, attendanceRate: 95.0 },
  { name: 'Administration', employeeCount: 20, presentToday: 20, attendanceRate: 100.0 }
];
