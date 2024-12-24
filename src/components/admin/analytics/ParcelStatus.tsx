import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, Tooltip } from "recharts"

const mockData = [
  { name: "Pending", value: 10 },
  { name: "In Transit", value: 15 },
  { name: "Delivered", value: 25 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const chartConfig = {
  status: {
    label: "Status",
    theme: {
      light: "#8884d8",
      dark: "#8884d8"
    }
  }
}

export function ParcelStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parcel Status Distribution</CardTitle>
        <CardDescription>
          Current distribution of parcel statuses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={chartConfig}>
          <PieChart>
            <Pie
              data={mockData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {mockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}