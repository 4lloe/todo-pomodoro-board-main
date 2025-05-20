
import Header from "@/components/layout/Header";
import { useTimeBlocks } from "@/contexts/TimeBlockContext";
import TimeBlockItem from "@/components/timeblocking/TimeBlockItem";
import AddTimeBlockForm from "@/components/timeblocking/AddTimeBlockForm";

const TimeBlocking = () => {
  const { timeBlocks, getTotalBlockedTime } = useTimeBlocks();
  
  const totalBlockedMinutes = getTotalBlockedTime();
  const remainingHours = 24 - Math.floor(totalBlockedMinutes / 60);
  
  return (
    <div className="flex-1">
      <Header title="Time blocking" />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {timeBlocks.map((block) => (
              <TimeBlockItem key={block.id} block={block} />
            ))}
            
            {totalBlockedMinutes > 0 && (
              <div className="text-sm text-gray-400 mt-4">
                {remainingHours} hours out of 24 left for sleep
              </div>
            )}
          </div>
          
          <div>
            <AddTimeBlockForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeBlocking;
