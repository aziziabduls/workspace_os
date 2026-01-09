export type UserStatus = 'Active' | 'On Leave' | 'Sick' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  division: string;
  jobTitle: string;
  joinDate: string;
  status: UserStatus;
  avatarUrl?: string;
  leaveBalance: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  kpiImpact: 'Low' | 'Medium' | 'High'; // KPI Indicator
  dueDate: string;
  assigneeId: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  locationType: 'Head Office' | 'Branch' | 'WFH';
  locationName?: string;
  status: 'Present' | 'Late' | 'Absent' | 'Leave' | 'Sick';
}

export interface LeaveRequest {
  id: string;
  type: 'Annual' | 'Sick' | 'Unpaid' | 'Maternity/Paternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
}
