
import { useState } from "react";
import Header from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { usePomodoro } from "@/contexts/PomodoroContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { user } = useAuth();
  const { settings, updateSettings } = usePomodoro();
  const { toast } = useToast();
  
  const [workInterval, setWorkInterval] = useState(String(settings.workInterval));
  const [breakInterval, setBreakInterval] = useState(String(settings.breakInterval));
  const [intervalsCount, setIntervalsCount] = useState(String(settings.intervalsCount));
  const [password, setPassword] = useState("");

  const handleSave = () => {
    // Update pomodoro settings
    updateSettings({
      workInterval: parseInt(workInterval),
      breakInterval: parseInt(breakInterval),
      intervalsCount: parseInt(intervalsCount),
    });
    
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
  };
  
  return (
    <div className="flex-1">
      <Header title="Settings" />
      
      <div className="p-6">
        <div className="max-w-xl mx-auto bg-[#1a1a1a] rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email:</label>
              <Input 
                value={user?.email || ""} 
                readOnly 
                className="bg-gray-900 border-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name:</label>
              <Input 
                value={user?.name || ""} 
                readOnly 
                className="bg-gray-900 border-gray-700" 
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Work interval (min.):</label>
              <Input 
                type="number" 
                value={workInterval}
                onChange={(e) => setWorkInterval(e.target.value)}
                className="bg-gray-900 border-gray-700" 
                min={1}
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Break interval (min.):</label>
              <Input 
                type="number" 
                value={breakInterval}
                onChange={(e) => setBreakInterval(e.target.value)}
                className="bg-gray-900 border-gray-700" 
                min={1}
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Intervals count (max 10):</label>
              <Input 
                type="number" 
                value={intervalsCount}
                onChange={(e) => setIntervalsCount(e.target.value)}
                className="bg-gray-900 border-gray-700"
                min={1}
                max={10}
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password:</label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-gray-900 border-gray-700"
              />
            </div>
          </div>
          
          <Button
            onClick={handleSave}
            className="mt-6 bg-purple-600 hover:bg-purple-700"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
