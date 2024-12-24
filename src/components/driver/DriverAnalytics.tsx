import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface DriverAnalyticsProps {
  driverId: string;
}

export function DriverAnalytics({ driverId }: DriverAnalyticsProps) {
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['driverAnalytics', driverId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('driver_analytics')
        .select('*')
        .eq('driver_id', driverId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!driverId && driverId.length === 36, // Only run query if we have a valid UUID
  });

  if (isLoadingAnalytics) {
    return <div>Loading analytics...</div>;
  }

  if (!analyticsData) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Your Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="text-sm text-muted-foreground">Total Deliveries</div>
            <div className="text-2xl font-bold">{analyticsData.total_deliveries || 0}</div>
          </div>
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="text-sm text-muted-foreground">Completed Deliveries</div>
            <div className="text-2xl font-bold">{analyticsData.completed_deliveries || 0}</div>
          </div>
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="text-sm text-muted-foreground">Average Rating</div>
            <div className="text-2xl font-bold">
              {analyticsData.average_rating ? analyticsData.average_rating.toFixed(1) : 'N/A'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}