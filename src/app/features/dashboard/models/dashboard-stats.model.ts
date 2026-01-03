export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingPayroll: number;
  monthlyAttendanceRate: number;
  averageSalary: number;
  totalDepartments: number;
  activePositions: number;
}

export interface AttendanceTrend {
  date: string;
  present: number;
  absent: number;
  onLeave: number;
}

export interface PayrollTrend {
  month: string;
  amount: number;
  employeeCount: number;
}

export interface RecentActivity {
  id: number;
  type: 'employee' | 'payroll' | 'leave' | 'attendance' | 'system';
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  route: string;
  permission?: string;
}

export interface DepartmentStats {
  name: string;
  employeeCount: number;
  presentToday: number;
  attendanceRate: number;
}
