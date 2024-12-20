import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { Package, MapPin, Calendar } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Cart() {
  const deliveries = [
    {
      id: 1,
      pickup: "123 Main St, City",
      delivery: "456 Oak St, City",
      package: "Small Package (2kg)",
      date: "Today, 2:00 PM",
      price: 15.99
    },
    {
      id: 2,
      pickup: "789 Pine St, City",
      delivery: "321 Elm St, City",
      package: "Medium Package (5kg)",
      date: "Tomorrow, 10:00 AM",
      price: 24.99
    }
  ];

  const total = deliveries.reduce((sum, delivery) => sum + delivery.price, 0);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
          
          <div className="max-w-4xl grid gap-6 md:grid-cols-[1fr,300px]">
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div key={delivery.id} className="flex flex-col gap-4 p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Package className="h-4 w-4" />
                    <span>{delivery.package}</span>
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>From: {delivery.pickup}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>To: {delivery.delivery}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{delivery.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">${delivery.price.toFixed(2)}</span>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-card">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>$2.99</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(total + 2.99).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}