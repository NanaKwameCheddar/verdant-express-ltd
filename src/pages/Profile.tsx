import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/AppSidebar";
import { User, Mail, Phone, MapPin, Star, Menu } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile() {
  const [isAdmin] = useState(true); // In a real app, this would come from auth state
  const [userRating] = useState(4.5);

  const renderDashboardPreview = (type: string) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{type} Dashboard Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Active {type}s</h3>
            <span className="text-2xl font-bold">24</span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Total Deliveries</h3>
            <span className="text-2xl font-bold">156</span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Average Rating</h3>
            <span className="text-2xl font-bold">4.8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
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

            {isAdmin && (
              <div className="pt-8">
                <h2 className="text-xl font-bold mb-4">Dashboard Previews</h2>
                <Tabs defaultValue="rider" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="rider">Rider</TabsTrigger>
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                    <TabsTrigger value="management">Management</TabsTrigger>
                  </TabsList>
                  <TabsContent value="rider">
                    {renderDashboardPreview("Rider")}
                  </TabsContent>
                  <TabsContent value="customer">
                    {renderDashboardPreview("Customer")}
                  </TabsContent>
                  <TabsContent value="management">
                    {renderDashboardPreview("Management")}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}