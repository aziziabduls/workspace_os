import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Input, Button, Label } from './ui';
import { Lock, AtSign } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'employee@tech.corp' && pin === '123456') {
      onLogin(email);
    } else {
      setError('Invalid email or PIN. Try employee@tech.corp / 123456');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-3xl font-bold text-primary">WorkSpace OS</CardTitle>
          <p className="text-sm text-muted-foreground">Enter your credentials to access the workspace</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="name@company.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pin">Access PIN</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pin"
                  placeholder="******"
                  className="pl-9 tracking-widest"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  type="password"
                  maxLength={6}
                  required
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}
            <Button type="submit" className="w-full h-11 text-base">
              Secure Login
            </Button>
          </form>
          <div className="mt-6 text-center text-xs text-muted-foreground">
             Use <span className="font-mono bg-muted p-1 rounded">employee@tech.corp</span> & <span className="font-mono bg-muted p-1 rounded">123456</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
