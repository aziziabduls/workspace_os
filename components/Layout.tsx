import React, { useState } from 'react';
import { Button, cn } from './ui';
import { LayoutDashboard, CheckCircle2, Calendar, Mail, UserCircle, Settings, LogOut, Menu, Laptop } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  user: User;
  toggleTheme: () => void;
  isDark: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, onLogout, user, toggleTheme, isDark }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NavItem = ({ view, icon: Icon, label }: { view: string, icon: any, label: string }) => (
    <Button
      variant={activeView === view ? 'secondary' : 'ghost'}
      className={cn("w-full justify-start gap-3 mb-1", activeView === view ? "bg-secondary font-medium" : "text-muted-foreground")}
      onClick={() => {
        onNavigate(view);
        setSidebarOpen(false);
      }}
    >
      <Icon size={20} />
      {label}
    </Button>
  );

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-64 transform bg-card border-r transition-transform duration-200 ease-in-out md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">WorkSpace<span className="text-foreground">OS</span></h1>
            <p className="text-xs text-muted-foreground mt-1">v1.0.0</p>
          </div>

          <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Main</p>
            <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem view="presence" icon={CheckCircle2} label="Presence" />
            <NavItem view="tasks" icon={Laptop} label="Tasks & KPI" />
            <NavItem view="permit" icon={Calendar} label="Permit / Leave" />

            <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-6">Connect</p>
            <NavItem view="communication" icon={Mail} label="Email & Chat" />

            <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-6">Settings</p>
            <NavItem view="profile" icon={UserCircle} label="Profile" />
            <NavItem view="settings" icon={Settings} label="Settings" />
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.jobTitle}</p>
                </div>
            </div>
            <Button variant="outline" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={onLogout}>
                <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <header className="h-16 border-b flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm shrink-0">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu />
              </Button>
              <div className="ml-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                      {isDark ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                      )}
                  </Button>
              </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8">
              {children}
          </div>
      </main>
    </div>
  );
};