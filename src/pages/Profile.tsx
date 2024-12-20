import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/AppSidebar";
import { User, Mail, Phone, MapPin } from "lucide-react";

export default function Profile() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-sm text-muted-foreground">Member since January 2024</p>
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
        </div>
      </div>
    </div>
  );
}