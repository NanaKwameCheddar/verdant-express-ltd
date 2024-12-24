import { useState } from "react";
import { FeedbackForm } from "@/components/driver/FeedbackForm";
import { DriverAnalytics } from "@/components/driver/DriverAnalytics";
import { OrdersList } from "@/components/driver/OrdersList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, LogOut } from "lucide-react";

export default function DriverDashboard() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAcceptOrder = async (orderId: string) => {
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please enable location services to accept orders",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('parcel_orders')
        .update({ status: 'in_progress' })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Order Accepted",
        description: "You have been assigned to this delivery",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept order",
        variant: "destructive",
      });
    }
  };

  const handleReportIssue = (orderId: string) => {
    setSelectedOrder(orderId);
    setShowFeedback(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Please log in to continue
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/lovable-uploads/423456c0-e86c-4c12-9e6a-212fb9ec9bf2.png"
            alt="Verdant Express LTD"
            className="h-8 rounded-lg"
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

      <OrdersList
        userId={user.id}
        onAcceptOrder={handleAcceptOrder}
        onReportIssue={handleReportIssue}
      />

      {user.id && <DriverAnalytics driverId={user.id} />}

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