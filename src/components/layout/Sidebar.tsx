
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  ListTodo,
  Timer,
  Clock,
  Settings
} from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="w-[220px] min-h-screen bg-[#121212] border-r border-gray-800 p-4 flex flex-col">
      <div className="flex items-center mb-8 gap-2">
        <div className="w-8 h-8 bg-purple-600 flex items-center justify-center text-white rounded">
          <span className="font-bold">D</span>
        </div>
        <h1 className="text-white text-xl font-bold">Do-to-do</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
              }
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tasks" 
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
              }
            >
              <ListTodo className="w-5 h-5 mr-3" />
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/pomodoro" 
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
              }
            >
              <Timer className="w-5 h-5 mr-3" />
              Pomodoro
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/timeblocking" 
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
              }
            >
              <Clock className="w-5 h-5 mr-3" />
              Time blocking
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings" 
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
              }
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
