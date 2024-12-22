import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, MapPin, Route, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mock data - replace with real data when integrating with backend
const mockParcels = [
  {
    id: 1,
    status: "pending",
    pickup: "123 Main St, Accra",
    delivery: "456 Side St, Kumasi",
    customer: {
      name: "John Doe",
      phone: "+233 20 123 4567"
    }
  },
  {
    id: 2,
    status: "in_transit",
    pickup: "789 Cross St, Tema",
    delivery: "321 Back St, Cape Coast",
    customer: {
      name: "Jane Smith",
      phone: "+233 24 987 6543"
    }
  }
];

export default function DriverDashboard() {
  const [parcels, setParcels] = useState(mockParcels);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const { toast } = useToast();
  const [mapToken, setMapToken] = useState("");

  useEffect(() => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation(position),
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  const handleStatusUpdate = (parcelId: number, newStatus: string) => {
    setParcels(parcels.map(parcel => 
      parcel.id === parcelId 
        ? { ...parcel, status: newStatus }
        : parcel
    ));
    
    toast({
      title: "Status Updated",
      description: `Parcel #${parcelId} marked as ${newStatus}`,
    });
  };

  const handleAcceptOrder = (parcelId: number) => {
    if (location) {
      handleStatusUpdate(parcelId, "accepted");
      toast({
        title: "Order Accepted",
        description: "Initial location registered successfully",
      });
    } else {
      toast({
        title: "Location Required",
        description: "Please enable location services to accept orders",
        variant: "destructive",
      });
    }
  };

  const handleFeedback = (parcelId: number) => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Assigned Parcels</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parcels.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Current Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {location ? "Active" : "Disabled"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Route Status</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {parcels.some(p => p.status === "in_transit") ? "On Route" : "Standby"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {parcels.filter(p => p.status === "delivered").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="parcels" className="w-full">
        <TabsList>
          <TabsTrigger value="parcels">Assigned Parcels</TabsTrigger>
          <TabsTrigger value="map">Route Map</TabsTrigger>
          <TabsTrigger value="summary">Daily Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="parcels" className="space-y-4">
          {parcels.map((parcel) => (
            <Card key={parcel.id}>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Parcel #{parcel.id}</h3>
                    <span className="px-2 py-1 rounded-full text-sm bg-primary/10">
                      {parcel.status}
                    </span>
                  </div>
                  
                  <div className="grid gap-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Pickup:</span>
                      <p>{parcel.pickup}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Delivery:</span>
                      <p>{parcel.delivery}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Customer:</span>
                      <p>{parcel.customer.name} - {parcel.customer.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {parcel.status === "pending" && (
                      <Button onClick={() => handleAcceptOrder(parcel.id)}>
                        Accept Order
                      </Button>
                    )}
                    {parcel.status === "accepted" && (
                      <Button onClick={() => handleStatusUpdate(parcel.id, "in_transit")}>
                        Start Delivery
                      </Button>
                    )}
                    {parcel.status === "in_transit" && (
                      <Button onClick={() => handleStatusUpdate(parcel.id, "delivered")}>
                        Mark as Delivered
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => handleFeedback(parcel.id)}>
                      Report Issue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Route Map</h3>
                  {!mapToken && (
                    <input
                      type="text"
                      placeholder="Enter Mapbox token"
                      className="px-3 py-2 border rounded"
                      onChange={(e) => setMapToken(e.target.value)}
                    />
                  )}
                </div>
                <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
                  {location ? (
                    mapToken ? (
                      <div>Map will be displayed here</div>
                    ) : (
                      <div className="text-center">
                        <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p>Please enter your Mapbox token to view the map</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center">
                      <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p>Please enable location services to view the map</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Daily Statistics</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span>Total Parcels Assigned:</span>
                      <span className="font-medium">{parcels.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parcels Delivered:</span>
                      <span className="font-medium">
                        {parcels.filter(p => p.status === "delivered").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Deliveries:</span>
                      <span className="font-medium">
                        {parcels.filter(p => p.status === "pending").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>In Transit:</span>
                      <span className="font-medium">
                        {parcels.filter(p => p.status === "in_transit").length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}