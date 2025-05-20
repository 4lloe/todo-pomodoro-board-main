
import { useState } from "react";
import { useTimeBlocks, TimeBlockColor } from "@/contexts/TimeBlockContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type ColorOption = {
  value: TimeBlockColor;
  label: string;
};

const colorOptions: ColorOption[] = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "purple", label: "Purple" },
  { value: "yellow", label: "Yellow" },
];

const AddTimeBlockForm = () => {
  const { addTimeBlock } = useTimeBlocks();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [color, setColor] = useState<TimeBlockColor>("blue");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && duration) {
      addTimeBlock({
        name,
        duration: parseInt(duration),
        color,
      });
      setName("");
      setDuration("");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Enter name:</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="bg-gray-900 border-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-1">Enter duration (min.):</label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration (min.)"
              className="bg-gray-900 border-gray-700"
              min={1}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-1">Color:</label>
            <RadioGroup 
              value={color} 
              onValueChange={(value) => setColor(value as TimeBlockColor)}
              className="flex flex-wrap gap-2"
            >
              {colorOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <RadioGroupItem
                    value={option.value}
                    id={`color-${option.value}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`color-${option.value}`}
                    className={`w-6 h-6 rounded-full cursor-pointer ring-offset-2 ring-offset-gray-800 ${
                      color === option.value ? "ring-2 ring-white" : ""
                    } bg-timeblock-${option.value}`}
                  />
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTimeBlockForm;
