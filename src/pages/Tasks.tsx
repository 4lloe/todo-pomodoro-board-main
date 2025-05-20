
import { useState } from "react";
import Header from "@/components/layout/Header";
import { useTasks, Task } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import TaskItem from "@/components/tasks/TaskItem";
import AddTaskForm from "@/components/tasks/AddTaskForm";
import { LayoutList, LayoutGrid } from "lucide-react";

const TaskList = () => {
  const { tasks, viewMode, setViewMode } = useTasks();
  
  // Group tasks by their group
  const grouped = {
    today: tasks.filter(task => task.group === "today"),
    tomorrow: tasks.filter(task => task.group === "tomorrow"),
    thisWeek: tasks.filter(task => task.group === "thisWeek"),
    nextWeek: tasks.filter(task => task.group === "nextWeek"),
    later: tasks.filter(task => task.group === "later"),
  };

  // Function to render a task group
  const renderTaskGroup = (title: string, tasks: Task[], group: Task["group"]) => (
    <div key={title} className="mb-6">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="bg-[#1a1a1a] rounded-md p-2">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
        <AddTaskForm group={group} />
      </div>
    </div>
  );

  // Render list view
  const renderListView = () => (
    <div>
      {renderTaskGroup("Today", grouped.today, "today")}
      {renderTaskGroup("Tomorrow", grouped.tomorrow, "tomorrow")}
      {renderTaskGroup("On this week", grouped.thisWeek, "thisWeek")}
      {renderTaskGroup("On next week", grouped.nextWeek, "nextWeek")}
      {renderTaskGroup("Later", grouped.later, "later")}
    </div>
  );

  // Render board view
  const renderBoardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-[#1a1a1a] rounded-md p-3">
        <h3 className="text-lg font-medium mb-2">Today</h3>
        <div className="space-y-2">
          {grouped.today.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          <AddTaskForm group="today" />
        </div>
      </div>
      
      <div className="bg-[#1a1a1a] rounded-md p-3">
        <h3 className="text-lg font-medium mb-2">Tomorrow</h3>
        <div className="space-y-2">
          {grouped.tomorrow.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          <AddTaskForm group="tomorrow" />
        </div>
      </div>
      
      <div className="bg-[#1a1a1a] rounded-md p-3">
        <h3 className="text-lg font-medium mb-2">On this week</h3>
        <div className="space-y-2">
          {grouped.thisWeek.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          <AddTaskForm group="thisWeek" />
        </div>
      </div>
      
      <div className="bg-[#1a1a1a] rounded-md p-3">
        <h3 className="text-lg font-medium mb-2">On next week</h3>
        <div className="space-y-2">
          {grouped.nextWeek.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          <AddTaskForm group="nextWeek" />
        </div>
      </div>
      
      <div className="bg-[#1a1a1a] rounded-md p-3">
        <h3 className="text-lg font-medium mb-2">Later</h3>
        <div className="space-y-2">
          {grouped.later.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          <AddTaskForm group="later" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1">
      <Header title="Tasks" />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2 bg-gray-800 rounded-md p-1">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="w-4 h-4 mr-1" /> List
            </Button>
            <Button
              variant={viewMode === "board" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("board")}
            >
              <LayoutGrid className="w-4 h-4 mr-1" /> Board
            </Button>
          </div>
        </div>

        {viewMode === "list" ? renderListView() : renderBoardView()}
      </div>
    </div>
  );
};

export default TaskList;
