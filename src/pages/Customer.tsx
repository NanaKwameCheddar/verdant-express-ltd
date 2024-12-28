import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Package, Truck, ShoppingCart, History, MapPin } from "lucide-react";

export function Customer() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Place Order",
      icon: <Package className="h-6 w-6" />,
      description: "Create a new delivery request",
      path: "/order-placement"
    },
    {
      title: "Track Delivery",
      icon: <Truck className="h-6 w-6" />,
      description: "Track your current deliveries",
      path: "/orders"
    },
    {
      title: "Shopping Cart",
      icon: <ShoppingCart className="h-6 w-6" />,
      description: "View your cart",
      path: "/cart"
    },
    {
      title: "Order History",
      icon: <History className="h-6 w-6" />,
      description: "View past orders",
      path: "/orders"
    },
    {
      title: "Saved Addresses",
      icon: <MapPin className="h-6 w-6" />,
      description: "Manage your addresses",
      path: "/profile"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card 
            key={item.title}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(item.path)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {item.icon}
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Customer;