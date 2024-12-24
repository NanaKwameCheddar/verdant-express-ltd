import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const mockData = [
  { name: "Mon", deliveries: 4, revenue: 400 },
  { name: "Tue", deliveries: 3, revenue: 300 },
  { name: "Wed", deliveries: 7, revenue: 700 },
  { name: "Thu", deliveries: 5, revenue: 500 },
  { name: "Fri", deliveries: 6, revenue: 600 },
  { name: "Sat", deliveries: 4, revenue: 400 },
  { name: "Sun", deliveries: 2, revenue: 200 },
]

const chartConfig = {
  deliveries: {
    label: "Deliveries",
    theme: {
      light: "#8884d8",
      dark: "#8884d8"
    }
  },
  revenue: {
    label: "Revenue",
    theme: {
      light: "#82ca9d",
      dark: "#82ca9d"
    }
  }
}

export function DeliveryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Deliveries & Revenue</CardTitle>
        <CardDescription>
          Delivery count and revenue trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={chartConfig}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="deliveries" stroke="#8884d8" name="Deliveries" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($)" />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}