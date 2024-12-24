import { useEffect, useState } from "react";
import { FeedbackForm } from "@/components/driver/FeedbackForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { MapPin, Package, AlertCircle, LogOut, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function DriverDashboard() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Fetch driver analytics
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['driverAnalytics', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('driver_analytics')
        .select('*')
        .eq('driver_id', user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Fetch orders
  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ['driverOrders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('parcel_orders')
        .select(`
          *,
          feedback(rating, feedback_text)
        `)
        .eq('assigned_driver_id', user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

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

    // Set up real-time subscription for new orders
    const ordersSubscription = supabase
      .channel('orders')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'parcel_orders',
          filter: `assigned_driver_id=eq.${user?.id}`,
        },
        (payload) => {
          toast({
            title: "New Order Assigned!",
            description: "You have a new delivery order.",
          });
        }
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
    };
  }, [user?.id]);

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

  if (isLoadingOrders || isLoadingAnalytics) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Order #{order.id.slice(0, 8)}
                <Badge>{order.status}</Badge>
              </CardTitle>
              <CardDescription>{new Date(order.created_at).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Pickup</div>
                <div className="font-medium">{order.pickup_address}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Delivery</div>
                <div className="font-medium">{order.delivery_address}</div>
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

      {analyticsData && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-sm text-muted-foreground">Total Deliveries</div>
                <div className="text-2xl font-bold">{analyticsData.total_deliveries}</div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-sm text-muted-foreground">Completed Deliveries</div>
                <div className="text-2xl font-bold">{analyticsData.completed_deliveries}</div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-sm text-muted-foreground">Average Rating</div>
                <div className="text-2xl font-bold">
                  {analyticsData.average_rating ? analyticsData.average_rating.toFixed(1) : 'N/A'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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