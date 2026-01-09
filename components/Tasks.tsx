import React, { useState } from 'react';
import { Card, CardContent, Button, Badge, Input, Select } from './ui';
import { Task } from '../types';
import { Plus, CheckCircle2 } from 'lucide-react';

interface TasksProps {
  tasks: Task[];
  addTask: (task: Task) => void;
}

export const Tasks: React.FC<TasksProps> = ({ tasks, addTask }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'Medium',
    kpiImpact: 'Medium',
    status: 'To Do'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title: newTask.title || 'New Task',
        description: newTask.description || '',
        priority: newTask.priority as any,
        kpiImpact: newTask.kpiImpact as any,
        status: 'To Do',
        dueDate: new Date().toISOString().split('T')[0],
        assigneeId: 'u1'
    };
    addTask(task);
    setIsAdding(false);
    setNewTask({ title: '', description: '', priority: 'Medium', kpiImpact: 'Medium', status: 'To Do' });
  };

  const getPriorityColor = (p: string) => {
    switch(p) {
        case 'Critical': return 'destructive';
        case 'High': return 'warning';
        case 'Medium': return 'secondary';
        default: return 'outline';
    }
  };

  const getKPIColor = (k: string) => {
      return k === 'High' ? 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300' : 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
            <p className="text-muted-foreground">Manage your IT workload and track KPI impact.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {isAdding && (
          <Card className="border-dashed border-2">
              <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Task Title (e.g. Fix Login Bug)"
                            value={newTask.title}
                            onChange={e => setNewTask({...newTask, title: e.target.value})}
                            required
                          />
                          <Select
                            value={newTask.priority}
                            onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
                          >
                              <option value="Low">Low Priority</option>
                              <option value="Medium">Medium Priority</option>
                              <option value="High">High Priority</option>
                              <option value="Critical">Critical</option>
                          </Select>
                      </div>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Description..."
                        value={newTask.description}
                        onChange={e => setNewTask({...newTask, description: e.target.value})}
                      />
                      <div className="flex items-center gap-4">
                          <label className="text-sm font-medium">KPI Impact:</label>
                          <Select
                            className="w-40"
                            value={newTask.kpiImpact}
                            onChange={e => setNewTask({...newTask, kpiImpact: e.target.value as any})}
                           >
                              <option value="Low">Low Impact</option>
                              <option value="Medium">Medium Impact</option>
                              <option value="High">High Impact</option>
                          </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                          <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                          <Button type="submit">Save Task</Button>
                      </div>
                  </form>
              </CardContent>
          </Card>
      )}

      <div className="grid gap-4">
        {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className={`font-semibold text-lg ${task.status === 'Done' ? 'line-through text-muted-foreground' : ''}`}>{task.title}</h3>
                            <Badge variant={getPriorityColor(task.priority) as any}>{task.priority}</Badge>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getKPIColor(task.kpiImpact)}`}>
                                KPI: {task.kpiImpact}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
                        <div className="flex flex-col items-end text-sm text-muted-foreground">
                            <span>Due: {task.dueDate}</span>
                            <span className="text-xs uppercase font-bold tracking-wider">{task.status}</span>
                        </div>
                        {task.status !== 'Done' && (
                            <Button size="icon" variant="outline" className="rounded-full text-green-600 hover:text-green-700 hover:bg-green-50">
                                <CheckCircle2 className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
};