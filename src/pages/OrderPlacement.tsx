import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function OrderPlacement() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Placed Successfully",
      description: "Your delivery request has been submitted.",
    });
    navigate("/orders");
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="pickup" className="text-sm font-medium">Pickup Address</label>
                <Input id="pickup" placeholder="Enter pickup address" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="delivery" className="text-sm font-medium">Delivery Address</label>
                <Input id="delivery" placeholder="Enter delivery address" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="items" className="text-sm font-medium">Items Description</label>
                <Input id="items" placeholder="Describe your items" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contact" className="text-sm font-medium">Contact Number</label>
                <Input id="contact" type="tel" placeholder="Enter contact number" required />
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