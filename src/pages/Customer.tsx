```tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, Clock, LogOut } from "lucide-react";

export default function Customer() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const { data, error } = await supabase
        .from("parcel_orders")
        .select("*")
        .eq("customer_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    if (user) {
      fetchRecentOrders();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleNewOrder = () => {
    navigate("/order-placement");
  };

  const handleViewOrders = () => {
    navigate("/orders");
  };

  const handleTrackOrder = () => {
    navigate("/search");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/lovable-uploads/423456c0-e86c-4c12-9e6a-212fb9ec9bf2.png"
            alt="Verdant Express LTD"
            className="h-8 rounded-lg"
          />
          <h1 className="text-3xl font-bold">Welcome back!</h1>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="store-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              New Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Create a new delivery order for your parcel
            </p>
            <Button onClick={handleNewOrder} className="w-full">
              Place Order
            </Button>
          </CardContent>
        </Card>

        <Card className="store-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              View Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Check the status of your existing orders
            </p>
            <Button onClick={handleViewOrders} variant="outline" className="w-full">
              View History
            </Button>
          </CardContent>
        </Card>

        <Card className="store-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Track Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Track the location of your active deliveries
            </p>
            <Button onClick={handleTrackOrder} variant="outline" className="w-full">
              Track Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```