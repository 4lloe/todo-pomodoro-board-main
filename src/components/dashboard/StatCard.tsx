
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: number;
  className?: string;
};

const StatCard = ({ title, value, className }: StatCardProps) => {
  return (
    <div className={cn("bg-[#1a1a1a] rounded-md p-4", className)}>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-4xl font-semibold">{value}</p>
    </div>
  );
};

export default StatCard;
