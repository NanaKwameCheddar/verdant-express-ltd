import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Search, ShoppingCart, Package, LogOut } from "lucide-react";

export default function Customer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Fetch recent orders
    const fetchRecentOrders = async () => {
      const { data, error } = await supabase
        .from("parcel_orders") // Changed from "orders" to "parcel_orders"
        .select("*")
        .eq("customer_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching recent orders:", error);
        return;
      }

      setRecentOrders(data || []);
    };

    if (user) {
      fetchRecentOrders();
    }
  }, [user]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "There was a problem logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-32 h-32 rounded-lg mx-auto mb-8" />
        <div className="flex w-full max-w-lg gap-2">
          <Input
            type="text"
            placeholder="Search for stores or items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate("/search")}
            >
              <Search className="h-6 w-6" />
              Browse Stores
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-6 w-6" />
              View Cart
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate("/orders")}
            >
              <Package className="h-6 w-6" />
              Track Orders
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-6 w-6" />
              Logout
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center p-2 rounded-lg bg-secondary"
                  >
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No recent orders found
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Featured Stores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mock featured stores - replace with actual data */}
            {[1, 2, 3].map((store) => (
              <Card key={store} className="store-card">
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-lg mb-2" />
                  <h3 className="font-medium">Store {store}</h3>
                  <p className="text-sm text-muted-foreground">
                    Featured store description
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}