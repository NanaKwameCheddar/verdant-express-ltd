import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Calendar, CheckCircle2, Truck } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Orders() {
  const orders = [
    {
      id: "ORD-001",
      status: "Delivered",
      date: "Jan 15, 2024",
      pickup: "123 Main St, City",
      delivery: "456 Oak St, City",
      package: "Small Package (2kg)",
      price: 15.99
    },
    {
      id: "ORD-002",
      status: "In Transit",
      date: "Jan 16, 2024",
      pickup: "789 Pine St, City",
      delivery: "321 Elm St, City",
      package: "Medium Package (5kg)",
      price: 24.99
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
          
          <div className="max-w-4xl space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 rounded-lg border bg-card">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 font-medium">
                        <Package className="h-5 w-5" />
                        <span>Order {order.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.status === "Delivered" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Truck className="h-5 w-5 text-blue-500" />
                      )}
                      <span className={order.status === "Delivered" ? "text-green-500" : "text-blue-500"}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>From: {order.pickup}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>To: {order.delivery}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Package className="h-4 w-4" />
                      <span>{order.package}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="font-medium">${order.price.toFixed(2)}</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}