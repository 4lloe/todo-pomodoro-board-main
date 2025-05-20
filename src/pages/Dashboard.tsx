
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import { useTasks } from "@/contexts/TaskContext";
import { useTimeBlocks } from "@/contexts/TimeBlockContext";

const Dashboard = () => {
  const { stats } = useTasks();
  const { timeBlocks, getTotalBlockedTime } = useTimeBlocks();
  
  return (
    <div className="flex-1">
      <Header title="Statistics" />
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total" value={stats.total} />
          <StatCard title="Completed tasks" value={stats.completed} />
          <StatCard title="Today tasks" value={stats.today} />
          <StatCard title="Week tasks" value={stats.week} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
