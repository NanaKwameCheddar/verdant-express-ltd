import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const mockData = [
  { name: "John", deliveries: 15 },
  { name: "Mike", deliveries: 12 },
  { name: "Sarah", deliveries: 18 },
  { name: "David", deliveries: 10 },
]

const chartConfig = {
  deliveries: {
    label: "Deliveries",
    theme: {
      light: "#3b82f6",
      dark: "#3b82f6"
    }
  }
}

export function DriverPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deliveries by Driver</CardTitle>
        <CardDescription>
          Total deliveries completed by each driver
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={chartConfig}>
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="deliveries" fill="#3b82f6" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}