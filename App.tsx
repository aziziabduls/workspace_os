import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Presence } from './components/Presence';
import { Tasks } from './components/Tasks';
import { Permit } from './components/Permit';
import { Communication } from './components/Communication';
import { Card, CardContent, CardHeader, CardTitle, Input, Button, Label } from './components/ui';

// Mock Data Imports
import { CURRENT_USER, MOCK_TASKS, MOCK_ATTENDANCE, MOCK_EMAILS, MOCK_LEAVES } from './constants';
import { Task, AttendanceRecord, LeaveRequest } from './types';

// Simple Settings Component
const SettingsView = ({ user }: { user: any }) => (
    <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Card>
            <CardHeader><CardTitle>Account</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                </div>
                <div className="grid gap-2">
                    <Label>Change PIN</Label>
                    <Input type="password" placeholder="New PIN" />
                </div>
                <Button>Save Changes</Button>
            </CardContent>
        </Card>
    </div>
);

const ProfileView = ({ user }: { user: any }) => (
    <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-white">
                {user.name.charAt(0)}
            </div>
            <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.jobTitle} - {user.division}</p>
                <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">{user.status}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">Joined {user.joinDate}</span>
                </div>
            </div>
        </div>
        <Card>
            <CardHeader><CardTitle>Employment Details</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
                 <div>
                     <Label className="text-muted-foreground">Division</Label>
                     <p className="font-medium">{user.division}</p>
                 </div>
                 <div>
                     <Label className="text-muted-foreground">Role</Label>
                     <p className="font-medium">{user.jobTitle}</p>
                 </div>
                 <div>
                     <Label className="text-muted-foreground">Email</Label>
                     <p className="font-medium">{user.email}</p>
                 </div>
            </CardContent>
        </Card>
    </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('dashboard');
  const [isDark, setIsDark] = useState(false);
  
  // App State
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(MOCK_LEAVES);

  useEffect(() => {
    // Check system preference for theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
      if (isDark) {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  }, [isDark]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleAddTask = (task: Task) => {
      setTasks([...tasks, task]);
  };

  const handleCheckIn = (record: Partial<AttendanceRecord>) => {
      const newRecord: AttendanceRecord = {
          id: Math.random().toString(),
          ...record as any
      };
      setAttendance([...attendance, newRecord]);
  };

  const handleRequestLeave = (leave: LeaveRequest) => {
      setLeaves([...leaves, leave]);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard user={CURRENT_USER} tasks={tasks} attendance={attendance} emails={MOCK_EMAILS} onNavigate={setView} />;
      case 'presence':
        // Pass the full attendance array
        return <Presence onCheckIn={handleCheckIn} attendance={attendance} />;
      case 'tasks':
        return <Tasks tasks={tasks} addTask={handleAddTask} />;
      case 'permit':
        return <Permit leaves={leaves} user={CURRENT_USER} onRequestLeave={handleRequestLeave} />;
      case 'communication':
        return <Communication emails={MOCK_EMAILS} />;
      case 'profile':
        return <ProfileView user={CURRENT_USER} />;
      case 'settings':
        return <SettingsView user={CURRENT_USER} />;
      default:
        return <Dashboard user={CURRENT_USER} tasks={tasks} attendance={attendance} emails={MOCK_EMAILS} onNavigate={setView} />;
    }
  };

  return (
    <Layout
        activeView={view}
        onNavigate={setView}
        onLogout={() => setIsAuthenticated(false)}
        user={CURRENT_USER}
        toggleTheme={() => setIsDark(!isDark)}
        isDark={isDark}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;