import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DeliveryOptionsProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function DeliveryOptions({ value, onValueChange }: DeliveryOptionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Delivery Options</h3>
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="same-day" id="same-day" />
          <Label htmlFor="same-day">Same Day Delivery</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="next-day" id="next-day" />
          <Label htmlFor="next-day">Next Day Delivery</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="redeem-coupon" id="redeem-coupon" />
          <Label htmlFor="redeem-coupon">Redeem Coupon</Label>
        </div>
      </RadioGroup>
    </div>
  );
}