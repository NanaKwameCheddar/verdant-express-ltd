import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Package } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

export default function Search() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Search Deliveries</h1>
        
        <div className="max-w-2xl space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label htmlFor="pickup" className="text-sm font-medium">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="pickup" placeholder="Enter pickup address" className="pl-10" />
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <label htmlFor="delivery" className="text-sm font-medium">Delivery Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="delivery" placeholder="Enter delivery address" className="pl-10" />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label htmlFor="package" className="text-sm font-medium">Package Details</label>
                <div className="relative">
                  <Package className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input id="package" placeholder="Package size and weight" className="pl-10" />
                </div>
              </div>
              
              <Button className="mt-8" size="lg">
                Search Delivery Options
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              Enter your pickup and delivery locations to see available delivery options and pricing.
              We'll match you with the best courier for your package.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}