import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeedbackTable() {
  const { data: feedback, isLoading } = useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          *,
          user:user_id(name, role),
          order:order_id(
            id,
            customer:customer_id(name),
            driver:assigned_driver_id(name)
          )
        `);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading feedback...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedback?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="capitalize">{item.feedback_type}</TableCell>
                <TableCell>{item.rating} / 5</TableCell>
                <TableCell>{item.feedback_text}</TableCell>
                <TableCell>{item.user?.name}</TableCell>
                <TableCell>{item.order_id}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}