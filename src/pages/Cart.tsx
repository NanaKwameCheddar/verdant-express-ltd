import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const sampleCartItems = [
  {
    id: 1,
    service: "Same Day Delivery",
    price: "GHC 35.00",
    destination: "Accra, Ghana",
    items: "2 packages"
  },
  {
    id: 2,
    service: "Next Day Delivery",
    price: "GHC 28.00",
    destination: "Kumasi, Ghana",
    items: "1 package"
  }
];

export default function Cart() {
  const navigate = useNavigate();
  const total = "GHC 63.00";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Cart</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/")}>Home</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/search")}>Search</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/cart")}>Cart</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/orders")}>Orders</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg border bg-card">
              {sampleCartItems.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.service}</h3>
                      <p className="text-sm text-muted-foreground">{item.destination}</p>
                      <p className="text-sm text-muted-foreground">{item.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.price}</p>
                      <Button variant="ghost" size="icon" className="text-destructive mt-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4 border-t bg-muted/50">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{total}</span>
                </div>
                <Button className="w-full mt-4">Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}