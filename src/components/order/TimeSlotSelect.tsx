import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeSlotSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  timeSlots: string[];
}

export function TimeSlotSelect({ value, onValueChange, timeSlots }: TimeSlotSelectProps) {
  return (
    <div className="space-y-2">
      <Label>Preferred Time Slot *</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a time slot" />
        </SelectTrigger>
        <SelectContent>
          {timeSlots.map((slot) => (
            <SelectItem key={slot} value={slot}>
              {slot}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}