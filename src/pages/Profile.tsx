import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Star, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function Profile() {
  const [userRating] = useState(4.5);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [orderCount] = useState(4); // Mock data for order count

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
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
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-sm text-muted-foreground">Member since January 2024</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(userRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : i < userRating
                      ? "text-yellow-400 fill-yellow-400 opacity-50"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 font-medium">{userRating}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="name" placeholder="Your full name" className="pl-10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="Your email" className="pl-10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="phone" placeholder="Your phone number" className="pl-10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Default Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="address" placeholder="Your address" className="pl-10" />
                </div>
              </div>
            </div>
            
            <Button size="lg">Save Changes</Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Free Delivery Progress</h2>
            <div className="p-4 rounded-lg border bg-card">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Orders completed: {orderCount}</span>
                  <span>Target: 10 orders</span>
                </div>
                <Progress value={(orderCount / 10) * 100} />
                <p className="text-sm text-muted-foreground">
                  Complete {10 - orderCount} more orders to unlock free delivery!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
