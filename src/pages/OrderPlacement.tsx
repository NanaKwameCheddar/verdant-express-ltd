import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function OrderPlacement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mapLink, setMapLink] = useState("");
  
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
    
    // Validate required fields
    if (!formData.sender.name || !formData.sender.phone || !formData.sender.address ||
        !formData.recipient.name || !formData.recipient.phone || !formData.recipient.address) {
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
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    value={formData.sender.name}
                    onChange={(e) => handleInputChange('sender', 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone *</label>
                  <Input
                    type="tel"
                    value={formData.sender.phone}
                    onChange={(e) => handleInputChange('sender', 'phone', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Address *</label>
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
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    value={formData.recipient.name}
                    onChange={(e) => handleInputChange('recipient', 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone *</label>
                  <Input
                    type="tel"
                    value={formData.recipient.phone}
                    onChange={(e) => handleInputChange('recipient', 'phone', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Delivery Address *</label>
                  <Input
                    value={formData.recipient.address}
                    onChange={(e) => handleInputChange('recipient', 'address', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Google Maps Link */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Google Maps Location Link (Optional)</label>
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