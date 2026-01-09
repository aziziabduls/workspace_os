import { User, Task, AttendanceRecord, LeaveRequest, EmailMessage } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Developer',
  email: 'employee@tech.corp',
  division: 'Engineering',
  jobTitle: 'Senior Frontend Engineer',
  joinDate: '2022-03-15',
  status: 'Active',
  leaveBalance: 12,
  avatarUrl: 'https://picsum.photos/200'
};

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Migrate Legacy Auth',
    description: 'Upgrade the authentication system to OAuth2 provider.',
    status: 'In Progress',
    priority: 'High',
    kpiImpact: 'High',
    dueDate: '2023-11-01',
    assigneeId: 'u1'
  },
  {
    id: 't2',
    title: 'Fix Safari Flexbox Bug',
    description: 'Layout breaks on iOS Safari 14.',
    status: 'To Do',
    priority: 'Medium',
    kpiImpact: 'Medium',
    dueDate: '2023-10-28',
    assigneeId: 'u1'
  },
  {
    id: 't3',
    title: 'Unit Tests for API',
    description: 'Increase coverage to 80%.',
    status: 'Done',
    priority: 'Low',
    kpiImpact: 'Medium',
    dueDate: '2023-10-20',
    assigneeId: 'u1'
  },
  {
    id: 't4',
    title: 'Deploy Production Hotfix',
    description: 'Critical security patch for payment gateway.',
    status: 'Review',
    priority: 'Critical',
    kpiImpact: 'High',
    dueDate: '2023-10-26',
    assigneeId: 'u1'
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', date: '2023-10-01', checkIn: '08:55', checkOut: '17:05', locationType: 'Head Office', status: 'Present' },
  { id: 'a2', date: '2023-10-02', checkIn: '09:10', checkOut: '17:00', locationType: 'WFH', status: 'Late' },
  { id: 'a3', date: '2023-10-03', checkIn: '08:45', checkOut: '17:30', locationType: 'Head Office', status: 'Present' },
  { id: 'a4', date: '2023-10-04', status: 'Sick', locationType: 'WFH' }, // Sick
  { id: 'a5', date: '2023-10-05', checkIn: '09:00', checkOut: '18:00', locationType: 'Branch', locationName: 'West Side Hub', status: 'Present' },
  // ... more would be dynamically generated in a real app
];

export const MOCK_EMAILS: EmailMessage[] = [
  { id: 'e1', from: 'HR Department', subject: 'Policy Update Q4', preview: 'Please review the attached changes to the remote work policy...', date: '10:30 AM', read: false },
  { id: 'e2', from: 'Jira Notifications', subject: '[JIRA] New Issue Assigned', preview: 'You have been assigned T-402: Database optimization...', date: 'Yesterday', read: true },
  { id: 'e3', from: 'CTO Office', subject: 'Townhall Meeting', preview: 'Join us this Friday for the quarterly all-hands meeting.', date: 'Oct 23', read: true },
];

export const MOCK_LEAVES: LeaveRequest[] = [
  { id: 'l1', type: 'Annual', startDate: '2023-08-10', endDate: '2023-08-15', reason: 'Family vacation', status: 'Approved' },
  { id: 'l2', type: 'Sick', startDate: '2023-10-04', endDate: '2023-10-04', reason: 'Flu', status: 'Approved' },
];
