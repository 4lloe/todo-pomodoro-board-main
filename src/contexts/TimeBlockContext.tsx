
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export type TimeBlockColor = "blue" | "green" | "red" | "orange" | "purple" | "yellow";

export type TimeBlock = {
  id: string;
  name: string;
  duration: number; // in minutes
  color: TimeBlockColor;
};

type TimeBlockContextType = {
  timeBlocks: TimeBlock[];
  addTimeBlock: (timeBlock: Omit<TimeBlock, "id">) => void;
  updateTimeBlock: (id: string, updates: Partial<TimeBlock>) => void;
  deleteTimeBlock: (id: string) => void;
  getTotalBlockedTime: () => number;
};

const TimeBlockContext = createContext<TimeBlockContextType | undefined>(undefined);

export const useTimeBlocks = () => {
  const context = useContext(TimeBlockContext);
  if (!context) {
    throw new Error("useTimeBlocks must be used within a TimeBlockProvider");
  }
  return context;
};

export const TimeBlockProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);

  // Load time blocks from localStorage
  useEffect(() => {
    if (user) {
      const storedBlocks = localStorage.getItem(`dototodo_timeblocks_${user.id}`);
      if (storedBlocks) {
        setTimeBlocks(JSON.parse(storedBlocks));
      }
    } else {
      setTimeBlocks([]);
    }
  }, [user]);

  // Save time blocks to localStorage
  useEffect(() => {
    if (user && timeBlocks.length > 0) {
      localStorage.setItem(`dototodo_timeblocks_${user.id}`, JSON.stringify(timeBlocks));
    }
  }, [timeBlocks, user]);

  const addTimeBlock = (timeBlock: Omit<TimeBlock, "id">) => {
    const newTimeBlock: TimeBlock = {
      ...timeBlock,
      id: `timeblock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    };
    setTimeBlocks(prev => [...prev, newTimeBlock]);
  };

  const updateTimeBlock = (id: string, updates: Partial<TimeBlock>) => {
    setTimeBlocks(prev =>
      prev.map(block => (block.id === id ? { ...block, ...updates } : block))
    );
  };

  const deleteTimeBlock = (id: string) => {
    setTimeBlocks(prev => prev.filter(block => block.id !== id));
  };

  const getTotalBlockedTime = () => {
    return timeBlocks.reduce((total, block) => total + block.duration, 0);
  };

  return (
    <TimeBlockContext.Provider
      value={{
        timeBlocks,
        addTimeBlock,
        updateTimeBlock,
        deleteTimeBlock,
        getTotalBlockedTime,
      }}
    >
      {children}
    </TimeBlockContext.Provider>
  );
};
