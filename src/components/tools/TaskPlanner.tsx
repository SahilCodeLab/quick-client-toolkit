
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

const TaskPlanner = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as 'low' | 'medium' | 'high' });

  useEffect(() => {
    const saved = localStorage.getItem('plannedTasks');
    if (saved) {
      setTasks(JSON.parse(saved).map((task: any) => ({
        ...task,
        date: new Date(task.date)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('plannedTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      date: selectedDate,
      priority: newTask.priority,
      completed: false
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium' });
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const tasksForSelectedDate = tasks.filter(task =>
    format(task.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50 dark:bg-red-900';
      case 'medium': return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900';
      case 'low': return 'border-green-400 bg-green-50 dark:bg-green-900';
      default: return 'border-gray-400 bg-gray-50 dark:bg-gray-900';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Daily Task Planner
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Select Date
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border-0"
          />
        </div>

        {/* Task Form & List */}
        <div className="space-y-6">
          {/* Add Task Form */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Add Task for {format(selectedDate, 'PPP')}
            </h3>
            
            <div className="space-y-4">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              
              <Textarea
                placeholder="Description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows={2}
              />
              
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map(priority => (
                  <Button
                    key={priority}
                    variant={newTask.priority === priority ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewTask({ ...newTask, priority: priority as any })}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Button>
                ))}
              </div>
              
              <Button onClick={addTask} className="w-full" disabled={!newTask.title.trim()}>
                Add Task
              </Button>
            </div>
          </div>

          {/* Tasks for Selected Date */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Tasks for {format(selectedDate, 'PPP')} ({tasksForSelectedDate.length})
            </h3>
            
            {tasksForSelectedDate.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No tasks planned for this date.</p>
            ) : (
              <div className="space-y-3">
                {tasksForSelectedDate.map(task => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {task.description}
                          </p>
                        )}
                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 mt-2 inline-block">
                          {task.priority} priority
                        </span>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleTask(task.id)}
                        >
                          {task.completed ? 'Undo' : 'Done'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteTask(task.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPlanner;
