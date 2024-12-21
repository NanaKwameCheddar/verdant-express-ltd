import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu, Package } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const searchResults = [
  {
    id: 1,
    name: "Same Day Delivery to Accra",
    price: "GHC 35-45",
    description: "Fast delivery within 2-4 hours",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
  },
  {
    id: 2,
    name: "Next Day Delivery to Kumasi",
    price: "GHC 25-30",
    description: "Reliable delivery within 24 hours",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088"
  },
  {
    id: 3,
    name: "Economy Delivery to Tema",
    price: "Redeem Coupon",
    description: "Budget-friendly delivery option",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59"
  }
];

export default function Search() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Search</h1>
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
            <SearchBar />
            <div className="grid gap-6 mt-6">
              {searchResults.map((result) => (
                <div key={result.id} className="rounded-lg border bg-card p-4 flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{result.name}</h3>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">{result.price}</span>
                      <Button size="sm">
                        <Package className="mr-2 h-4 w-4" />
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}