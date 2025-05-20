
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string | null;
  priority: Priority | null;
  group: "today" | "tomorrow" | "thisWeek" | "nextWeek" | "later";
};

type TaskStats = {
  total: number;
  completed: number;
  today: number;
  week: number;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  stats: TaskStats;
  viewMode: "list" | "board";
  setViewMode: (mode: "list" | "board") => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  
  // Load tasks from localStorage on initial render or when user changes
  useEffect(() => {
    if (user) {
      const storedTasks = localStorage.getItem(`dototodo_tasks_${user.id}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // Set empty array if no tasks exist
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
  }, [user]);
  
  // Save tasks to localStorage when they change
  useEffect(() => {
    if (user && tasks.length > 0) {
      localStorage.setItem(`dototodo_tasks_${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    today: tasks.filter(task => task.group === "today").length,
    week: tasks.filter(task => task.group === "thisWeek" || task.group === "nextWeek").length,
  };

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, stats, viewMode, setViewMode }}>
      {children}
    </TaskContext.Provider>
  );
};
