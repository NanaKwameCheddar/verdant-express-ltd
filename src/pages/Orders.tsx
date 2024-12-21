import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const sampleOrders = [
  {
    id: "12345",
    date: "Jan 15, 2024",
    status: "In Transit",
    price: "GHC 35.00",
    destination: "Accra, Ghana"
  },
  {
    id: "12344",
    date: "Jan 14, 2024",
    status: "Delivered",
    price: "GHC 28.00",
    destination: "Kumasi, Ghana"
  },
  {
    id: "12343",
    date: "Jan 13, 2024",
    status: "Delivered",
    price: "GHC 25.00",
    destination: "Tema, Ghana"
  }
];

export default function Orders() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Orders</h1>
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
          <div className="grid gap-6">
            {sampleOrders.map((order) => (
              <div key={order.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                    <p className="text-sm text-muted-foreground">{order.destination}</p>
                    <p className="text-sm font-medium mt-1">{order.price}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-2">
                      {order.status}
                    </span>
                    <Button variant="outline" className="w-full">Track Order</Button>
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