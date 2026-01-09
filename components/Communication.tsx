import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Input, Button } from './ui';
import { EmailMessage } from '../types';
import { Mail, MessageSquare, Search, Send, User as UserIcon } from 'lucide-react';

interface CommunicationProps {
  emails: EmailMessage[];
}

export const Communication: React.FC<CommunicationProps> = ({ emails }) => {
  const [tab, setTab] = useState<'email' | 'chat'>('email');
  const [chatMessage, setChatMessage] = useState('');
  const [chats, setChats] = useState<{sender: string, text: string, time: string}[]>([
      { sender: 'System', text: 'Welcome to the #general channel!', time: '09:00 AM' },
      { sender: 'Sarah (HR)', text: 'Don\'t forget to submit your monthly reports.', time: '10:15 AM' }
  ]);

  const sendChat = (e: React.FormEvent) => {
      e.preventDefault();
      if(!chatMessage.trim()) return;
      setChats([...chats, { sender: 'You', text: chatMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      setChatMessage('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-4">
      <div className="flex gap-2 border-b pb-2">
          <Button variant={tab === 'email' ? 'default' : 'ghost'} onClick={() => setTab('email')} className="gap-2">
              <Mail className="w-4 h-4" /> Email
          </Button>
          <Button variant={tab === 'chat' ? 'default' : 'ghost'} onClick={() => setTab('chat')} className="gap-2">
              <MessageSquare className="w-4 h-4" /> Team Chat
          </Button>
      </div>

      {tab === 'email' ? (
          <Card className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b flex gap-2">
                  <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search emails..." className="pl-8" />
                  </div>
              </div>
              <div className="flex-1 overflow-auto">
                  {emails.map(email => (
                      <div key={email.id} className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${!email.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                          <div className="flex justify-between mb-1">
                              <span className={`text-sm ${!email.read ? 'font-bold' : 'font-medium'}`}>{email.from}</span>
                              <span className="text-xs text-muted-foreground">{email.date}</span>
                          </div>
                          <p className={`text-sm mb-1 ${!email.read ? 'font-semibold' : ''}`}>{email.subject}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{email.preview}</p>
                      </div>
                  ))}
              </div>
          </Card>
      ) : (
          <Card className="flex-1 flex flex-col overflow-hidden">
              <CardHeader className="border-b py-3">
                  <CardTitle className="text-lg">#general</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-4 space-y-4 bg-muted/20">
                  {chats.map((chat, idx) => (
                      <div key={idx} className={`flex gap-3 ${chat.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <UserIcon className="w-4 h-4" />
                          </div>
                          <div className={`max-w-[80%] rounded-lg p-3 ${chat.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
                              <div className="flex justify-between items-baseline gap-4 mb-1">
                                  <span className="text-xs font-bold">{chat.sender}</span>
                                  <span className="text-[10px] opacity-70">{chat.time}</span>
                              </div>
                              <p className="text-sm">{chat.text}</p>
                          </div>
                      </div>
                  ))}
              </CardContent>
              <div className="p-4 border-t bg-background">
                  <form onSubmit={sendChat} className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={chatMessage}
                        onChange={e => setChatMessage(e.target.value)}
                      />
                      <Button type="submit" size="icon">
                          <Send className="w-4 h-4" />
                      </Button>
                  </form>
              </div>
          </Card>
      )}
    </div>
  );
};
