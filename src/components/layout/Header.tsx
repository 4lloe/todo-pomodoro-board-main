
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@/components/ui/avatar";

const Header = ({ title }: { title: string }) => {
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  return (
    <header className="flex justify-between items-center px-6 py-3 border-b border-gray-800">
      <h1 className="text-xl font-medium">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="font-medium">{user.name}</span>
          <span className="text-sm text-gray-400">
            {user.email}
          </span>
        </div>
        <div className="relative group">
          <Avatar className="h-8 w-8 bg-gray-700">
            <span className="text-sm">{user.name.charAt(0).toUpperCase()}</span>
          </Avatar>
          <div className="absolute right-0 mt-1 w-32 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-10 hidden group-hover:block">
            <button 
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
