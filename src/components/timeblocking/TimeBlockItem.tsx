
import { TimeBlock, useTimeBlocks } from "@/contexts/TimeBlockContext";
import { Edit, X } from "lucide-react";
import { cn } from "@/lib/utils";

type TimeBlockItemProps = {
  block: TimeBlock;
};

const TimeBlockItem = ({ block }: TimeBlockItemProps) => {
  const { deleteTimeBlock } = useTimeBlocks();

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-timeblock-blue';
      case 'green': return 'bg-timeblock-green';
      case 'red': return 'bg-timeblock-red';
      case 'orange': return 'bg-timeblock-orange';
      case 'purple': return 'bg-timeblock-purple';
      case 'yellow': return 'bg-timeblock-yellow';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className={cn(
      "flex items-center justify-between rounded px-4 py-3 group mb-2",
      getColorClass(block.color)
    )}>
      <div>
        <h4 className="font-medium">{block.name}</h4>
        <p className="text-sm opacity-80">({block.duration} min.)</p>
      </div>
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-1 rounded-full hover:bg-black/20"
          onClick={() => {/* Edit logic would go here */}}
        >
          <Edit size={16} />
        </button>
        <button
          className="p-1 rounded-full hover:bg-black/20"
          onClick={() => deleteTimeBlock(block.id)}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default TimeBlockItem;
