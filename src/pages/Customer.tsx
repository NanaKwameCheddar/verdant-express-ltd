import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Search, ShoppingCart, Clock } from "lucide-react";

export function Customer() {
  const navigate = useNavigate();

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      
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