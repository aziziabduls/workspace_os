import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from './ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { User, Task, AttendanceRecord, EmailMessage } from '../types';
import { Briefcase, CalendarCheck, Mail, Clock, ArrowRight } from 'lucide-react';

interface DashboardProps {
  user: User;
  tasks: Task[];
  attendance: AttendanceRecord[];
  emails: EmailMessage[];
  onNavigate: (view: string) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard: React.FC<DashboardProps> = ({ user, tasks, attendance, emails, onNavigate }) => {
  const [timeFilter, setTimeFilter] = useState<'monthly' | 'yearly'>('monthly');

  // Logic for Attendance Chart
  const presentCount = attendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const sickCount = attendance.filter(a => a.status === 'Sick').length;
  const leaveCount = attendance.filter(a => a.status === 'Leave').length;

  const attendanceData = [
    { name: 'Present', value: presentCount },
    { name: 'Sick', value: sickCount },
    { name: 'Leave', value: leaveCount },
  ];

  // Logic for Task Chart
  const todoCount = tasks.filter(t => t.status === 'To Do').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const doneCount = tasks.filter(t => t.status === 'Done').length;

  const taskData = [
    { name: 'To Do', count: todoCount },
    { name: 'In Progress', count: inProgressCount },
    { name: 'Done', count: doneCount },
  ];

  const unreadEmails = emails.filter(e => !e.read).length;

  // Check if checked in today
  const today = new Date().toISOString().split('T')[0];
  const isCheckedIn = attendance.find(a => a.date === today && a.checkIn);

  // Sort attendance by date descending for the table
  const sortedAttendance = [...attendance].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}. Here is your overview.</p>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant={timeFilter === 'monthly' ? 'default' : 'outline'} onClick={() => setTimeFilter('monthly')} size="sm">Monthly</Button>
            <Button variant={timeFilter === 'yearly' ? 'default' : 'outline'} onClick={() => setTimeFilter('yearly')} size="sm">Yearly</Button>
        </div>
      </div>

      {/* Hero Action: Working Today? */}
      {!isCheckedIn && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Are you working today?</h2>
            <p className="text-blue-100 mt-1">Don't forget to check in to log your attendance.</p>
          </div>
          <Button onClick={() => onNavigate('presence')} variant="secondary" size="lg" className="gap-2 font-semibold">
            Check In Now <ArrowRight size={16} />
          </Button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.leaveBalance} Days</div>
            <p className="text-xs text-muted-foreground">Remaining this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadEmails}</div>
            <p className="text-xs text-muted-foreground">Messages in inbox</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">Total assigned tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">In {timeFilter}</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphs Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Task Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="count" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                </BarChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {attendanceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             </div>
             <div className="flex justify-center gap-4 text-sm mt-2">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#0088FE]" /> Present</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#00C49F]" /> Sick</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#FFBB28]" /> Leave</div>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table Row */}
      <Card className="col-span-7">
        <CardHeader>
          <CardTitle>Recent Attendance History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAttendance.length === 0 && (
                 <TableRow>
                   <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                     No attendance records found.
                   </TableCell>
                 </TableRow>
              )}
              {sortedAttendance.slice(0, 5).map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{record.locationType}</span>
                      {record.locationName && (
                        <span className="text-xs text-muted-foreground">{record.locationName}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{record.checkIn || '-'}</TableCell>
                  <TableCell>{record.checkOut || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={
                      record.status === 'Present' ? 'success' :
                      record.status === 'Late' ? 'warning' :
                      record.status === 'Sick' ? 'destructive' :
                      'secondary'
                    }>
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};