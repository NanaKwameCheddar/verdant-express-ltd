import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OrderPlacement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mapLink, setMapLink] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [timeSlot, setTimeSlot] = useState("");
  const [couponCode, setCouponCode] = useState("");
  
  const [formData, setFormData] = useState({
    sender: {
      name: "",
      phone: "",
      address: "",
    },
    recipient: {
      name: "",
      phone: "",
      address: "",
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.sender.name || !formData.sender.phone || !formData.sender.address ||
        !formData.recipient.name || !formData.recipient.phone || !formData.recipient.address ||
        !deliveryOption || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Placed Successfully",
      description: "Your delivery request has been submitted.",
    });
    navigate("/orders");
  };

  const handleInputChange = (type: 'sender' | 'recipient', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const timeSlots = [
    "09:00 - 11:00",
    "11:00 - 13:00",
    "13:00 - 15:00",
    "15:00 - 17:00",
    "17:00 - 19:00"
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Place Your Order</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sender Details */}
              <div className="space-y-4">
                <h3 className="font-semibold">Sender Details</h3>
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={formData.sender.name}
                    onChange={(e) => handleInputChange('sender', 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    value={formData.sender.phone}
                    onChange={(e) => handleInputChange('sender', 'phone', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pickup Address *</Label>
                  <Input
                    value={formData.sender.address}
                    onChange={(e) => handleInputChange('sender', 'address', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-4">
                <h3 className="font-semibold">Recipient Details</h3>
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={formData.recipient.name}
                    onChange={(e) => handleInputChange('recipient', 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    value={formData.recipient.phone}
                    onChange={(e) => handleInputChange('recipient', 'phone', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Delivery Address *</Label>
                  <Input
                    value={formData.recipient.address}
                    onChange={(e) => handleInputChange('recipient', 'address', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Delivery Options */}
              <div className="space-y-4">
                <h3 className="font-semibold">Delivery Options</h3>
                <RadioGroup
                  value={deliveryOption}
                  onValueChange={setDeliveryOption}
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
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard Delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2">
                <Label>Preferred Time Slot *</Label>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
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

              {/* Coupon Code */}
              <div className="space-y-2">
                <Label>Coupon Code</Label>
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code if available"
                />
              </div>

              {/* Google Maps Link */}
              <div className="space-y-2">
                <Label>Google Maps Location Link (Optional)</Label>
                <Input
                  value={mapLink}
                  onChange={(e) => setMapLink(e.target.value)}
                  placeholder="Paste Google Maps link here"
                />
              </div>
              
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button type="submit">Place Order</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}