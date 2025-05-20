
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

type PomodoroSettings = {
  workInterval: number; // in minutes
  breakInterval: number; // in minutes
  intervalsCount: number;
};

type PomodoroContextType = {
  settings: PomodoroSettings;
  updateSettings: (settings: Partial<PomodoroSettings>) => void;
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number; // in seconds
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  currentInterval: number;
  isWorkInterval: boolean;
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
};

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<PomodoroSettings>({
    workInterval: 25,
    breakInterval: 5,
    intervalsCount: 4,
  });
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(settings.workInterval * 60);
  const [currentInterval, setCurrentInterval] = useState(1);
  const [isWorkInterval, setIsWorkInterval] = useState(true);

  // Load settings from localStorage
  useEffect(() => {
    if (user) {
      const storedSettings = localStorage.getItem(`dototodo_pomodoro_${user.id}`);
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings(parsedSettings);
        if (!isActive) {
          setTimeRemaining(parsedSettings.workInterval * 60);
        }
      }
    }
  }, [user]);

  // Save settings to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`dototodo_pomodoro_${user.id}`, JSON.stringify(settings));
    }
  }, [settings, user]);

  // Timer tick
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && !isPaused) {
      interval = window.setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            handleIntervalComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleIntervalComplete = () => {
    // Play notification sound (you'd need to add this)
    
    if (isWorkInterval) {
      // Work interval finished
      if (currentInterval >= settings.intervalsCount) {
        // All intervals complete
        resetTimer();
      } else {
        // Start break
        setIsWorkInterval(false);
        setTimeRemaining(settings.breakInterval * 60);
      }
    } else {
      // Break finished, start next work interval
      setCurrentInterval(prev => prev + 1);
      setIsWorkInterval(true);
      setTimeRemaining(settings.workInterval * 60);
    }
  };

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    if (isActive && !isPaused) {
      setIsPaused(true);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentInterval(1);
    setIsWorkInterval(true);
    setTimeRemaining(settings.workInterval * 60);
  };

  const updateSettings = (newSettings: Partial<PomodoroSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      if (!isActive) {
        setTimeRemaining(updated.workInterval * 60);
      }
      return updated;
    });
  };

  return (
    <PomodoroContext.Provider
      value={{
        settings,
        updateSettings,
        isActive,
        isPaused,
        timeRemaining,
        startTimer,
        pauseTimer,
        resetTimer,
        currentInterval,
        isWorkInterval,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
