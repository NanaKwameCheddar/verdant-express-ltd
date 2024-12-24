import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DriverAnalytics() {
  const { user } = useAuth();

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['driverAnalytics', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('driver_analytics_view')
        .select('*')
        .eq('driver_id', user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics?.total_deliveries || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics?.completed_deliveries || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics?.average_rating?.toFixed(1) || 'N/A'}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {analytics?.total_deliveries 
              ? ((analytics.completed_deliveries / analytics.total_deliveries) * 100).toFixed(1)
              : 0}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}