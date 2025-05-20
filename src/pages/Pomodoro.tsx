
import Header from "@/components/layout/Header";
import PomodoroTimer from "@/components/pomodoro/PomodoroTimer";

const Pomodoro = () => {
  return (
    <div className="flex-1">
      <Header title="Pomodoro timer" />
      
      <div className="p-6 flex justify-center items-center h-[calc(100vh-80px)]">
        <PomodoroTimer />
      </div>
    </div>
  );
};

export default Pomodoro;
