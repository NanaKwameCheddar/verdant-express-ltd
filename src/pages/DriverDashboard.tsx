import { useEffect, useState } from "react";
import { FeedbackForm } from "@/components/driver/FeedbackForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, AlertCircle, LogOut } from "lucide-react";

// Mock data - replace with actual API data
const mockOrders = [
  {
    id: "1",
    customer: "John Doe",
    pickup: "123 Main St",
    delivery: "456 Oak Ave",
    status: "pending",
    time: "10:30 AM",
  },
  {
    id: "2",
    customer: "Jane Smith",
    pickup: "789 Pine St",
    delivery: "321 Elm St",
    status: "in_progress",
    time: "11:45 AM",
  },
];

export default function DriverDashboard() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [orders] = useState(mockOrders);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Please enable location services to accept orders",
            variant: "destructive",
          });
        }
      );
    }
  }, []);

  const handleAcceptOrder = (orderId: string) => {
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please enable location services to accept orders",
        variant: "destructive",
      });
      return;
    }
    // Mock order acceptance - replace with actual API call
    toast({
      title: "Order Accepted",
      description: "You have been assigned to this delivery",
    });
  };

  const handleReportIssue = (orderId: string) => {
    setSelectedOrder(orderId);
    setShowFeedback(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/lovable-uploads/423456c0-e86c-4c12-9e6a-212fb9ec9bf2.png"
            alt="Verdant Express LTD"
            className="h-8"
          />
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={location ? "default" : "destructive"}>
            <MapPin className="mr-2 h-4 w-4" />
            {location ? "Location Active" : "Location Required"}
          </Badge>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Order #{order.id}
                <Badge>{order.status}</Badge>
              </CardTitle>
              <CardDescription>{order.time}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Customer</div>
                <div className="font-medium">{order.customer}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Pickup</div>
                <div className="font-medium">{order.pickup}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Delivery</div>
                <div className="font-medium">{order.delivery}</div>
              </div>
              <div className="flex gap-2">
                {order.status === "pending" && (
                  <Button
                    className="flex-1"
                    onClick={() => handleAcceptOrder(order.id)}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Accept Order
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => handleReportIssue(order.id)}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Issue</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <FeedbackForm
              orderId={selectedOrder}
              onClose={() => setShowFeedback(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
