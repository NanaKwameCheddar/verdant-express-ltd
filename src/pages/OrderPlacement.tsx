import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { AddressForm } from "@/components/order/AddressForm";
import { DeliveryOptions } from "@/components/order/DeliveryOptions";
import { TimeSlotSelect } from "@/components/order/TimeSlotSelect";

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
              <AddressForm
                type="sender"
                title="Sender Details"
                addressLabel="Pickup Address"
                values={formData.sender}
                onChange={(field, value) => handleInputChange('sender', field, value)}
              />

              <AddressForm
                type="recipient"
                title="Recipient Details"
                addressLabel="Delivery Address"
                values={formData.recipient}
                onChange={(field, value) => handleInputChange('recipient', field, value)}
              />

              <DeliveryOptions
                value={deliveryOption}
                onValueChange={setDeliveryOption}
              />

              <TimeSlotSelect
                value={timeSlot}
                onValueChange={setTimeSlot}
                timeSlots={timeSlots}
              />

              <div className="space-y-2">
                <Label>Coupon Code</Label>
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code if available"
                />
              </div>

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