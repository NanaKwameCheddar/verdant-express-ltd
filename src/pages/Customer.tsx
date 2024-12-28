import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Search, ShoppingCart, Clock, Menu } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export function Customer() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Place New Order",
      description: "Create a new delivery request",
      icon: Package,
      path: "/order-placement"
    },
    {
      title: "Track Orders",
      description: "View and track your deliveries",
      icon: Search,
      path: "/orders"
    },
    {
      title: "Shopping Cart",
      description: "View your pending orders",
      icon: ShoppingCart,
      path: "/cart"
    },
    {
      title: "Order History",
      description: "View your past deliveries",
      icon: Clock,
      path: "/orders"
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
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
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {menuItems.map((item, index) => (
          <Card 
            key={index} 
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate(item.path)}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <item.icon className="h-6 w-6" />
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Customer;