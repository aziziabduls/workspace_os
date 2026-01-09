import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge } from './ui';
import { LeaveRequest, User } from '../types';
import { CalendarDays } from 'lucide-react';

interface PermitProps {
  leaves: LeaveRequest[];
  user: User;
  onRequestLeave: (leave: LeaveRequest) => void;
}

export const Permit: React.FC<PermitProps> = ({ leaves, user, onRequestLeave }) => {
  const [request, setRequest] = useState<Partial<LeaveRequest>>({
      type: 'Annual',
      startDate: '',
      endDate: '',
      reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Logic would go here to validate dates vs balance
      const newLeave: LeaveRequest = {
          id: Math.random().toString(36).substr(2, 9),
          type: request.type as any,
          startDate: request.startDate!,
          endDate: request.endDate!,
          reason: request.reason!,
          status: 'Pending'
      };
      onRequestLeave(newLeave);
      alert("Leave request submitted for approval.");
      setRequest({ type: 'Annual', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Permit & Leave</h1>
            <p className="text-muted-foreground">Manage time off requests.</p>
        </div>
        <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-full">
                    <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm font-medium opacity-90">Remaining Balance</p>
                    <p className="text-2xl font-bold">{user.leaveBalance} Days</p>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
          {/* Request Form */}
          <Card className="md:col-span-1 h-fit">
              <CardHeader>
                  <CardTitle>Request Time Off</CardTitle>
              </CardHeader>
              <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                          <label className="text-sm font-medium">Leave Type</label>
                          <Select value={request.type} onChange={e => setRequest({...request, type: e.target.value as any})}>
                              <option value="Annual">Annual Leave</option>
                              <option value="Sick">Sick Leave</option>
                              <option value="Unpaid">Unpaid Leave</option>
                              <option value="Maternity/Paternity">Maternity/Paternity</option>
                          </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                              <label className="text-sm font-medium">Start Date</label>
                              <Input type="date" required value={request.startDate} onChange={e => setRequest({...request, startDate: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-medium">End Date</label>
                              <Input type="date" required value={request.endDate} onChange={e => setRequest({...request, endDate: e.target.value})} />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-medium">Reason</label>
                          <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Brief description..."
                            required
                            value={request.reason}
                            onChange={e => setRequest({...request, reason: e.target.value})}
                          />
                      </div>
                      <Button type="submit" className="w-full">Submit Request</Button>
                  </form>
              </CardContent>
          </Card>

          {/* History */}
          <Card className="md:col-span-2">
              <CardHeader>
                  <CardTitle>History</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                      {leaves.length === 0 && <p className="text-muted-foreground text-center py-8">No leave history found.</p>}
                      {leaves.map(leave => (
                          <div key={leave.id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50">
                              <div className="flex items-start gap-3">
                                  <div className={`mt-1 w-2 h-2 rounded-full ${leave.type === 'Sick' ? 'bg-red-500' : 'bg-blue-500'}`} />
                                  <div>
                                      <p className="font-medium">{leave.type} Leave</p>
                                      <p className="text-sm text-muted-foreground">{leave.startDate} to {leave.endDate}</p>
                                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{leave.reason}</p>
                                  </div>
                              </div>
                              <Badge variant={leave.status === 'Approved' ? 'success' : leave.status === 'Rejected' ? 'destructive' : 'secondary'}>
                                  {leave.status}
                              </Badge>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
};