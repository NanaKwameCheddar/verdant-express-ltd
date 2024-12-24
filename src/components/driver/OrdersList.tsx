import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface OrdersListProps {
  userId: string;
  onAcceptOrder: (orderId: string) => void;
  onReportIssue: (orderId: string) => void;
}

export function OrdersList({ userId, onAcceptOrder, onReportIssue }: OrdersListProps) {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['driverOrders', userId],
    queryFn: async () => {
      if (!userId || userId.length !== 36) return [];
      
      const { data, error } = await supabase
        .from('parcel_orders')
        .select(`
          *,
          feedback(rating, feedback_text)
        `)
        .eq('assigned_driver_id', userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId && userId.length === 36,
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-20" />
                <Skeleton className="h-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Order #{order.id.slice(0, 8)}
              <Badge>{order.status}</Badge>
            </CardTitle>
            <CardDescription>{new Date(order.created_at).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Pickup</div>
              <div className="font-medium">{order.pickup_address}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Delivery</div>
              <div className="font-medium">{order.delivery_address}</div>
            </div>
            <div className="flex gap-2">
              {order.status === "pending" && (
                <Button
                  className="flex-1"
                  onClick={() => onAcceptOrder(order.id)}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Accept Order
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => onReportIssue(order.id)}
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}