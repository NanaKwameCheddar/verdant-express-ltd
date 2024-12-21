import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DeliveryCard } from "@/components/DeliveryCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

// Mock data for delivery services
const deliveryServices = [
  {
    id: 1,
    name: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    price: "GHC 35-45",
    category: "Same Day",
    estimatedTime: "2-4 hours"
  },
  {
    id: 2,
    name: "Next Day Delivery",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
    price: "GHC 25-30",
    category: "Next Day",
    estimatedTime: "24 hours"
  },
  {
    id: 3,
    name: "Economy Delivery",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59",
    price: "Redeem Coupon",
    category: "Economy",
    estimatedTime: "2-3 days"
  }
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">Track Package</div>
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
          
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Fast & Reliable Package Delivery</h1>
              <p className="text-lg text-muted-foreground">
                Send packages anywhere with real-time tracking and guaranteed delivery
              </p>
            </div>

            <SearchBar />

            <section>
              <h2 className="text-2xl font-semibold mb-6">Delivery Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deliveryServices.map((service) => (
                  <DeliveryCard key={service.id} {...service} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}