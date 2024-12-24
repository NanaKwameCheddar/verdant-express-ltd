import { Package, TrendingUp, Truck, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard } from "./analytics/StatCard"
import { DeliveryChart } from "./analytics/DeliveryChart"
import { DriverPerformance } from "./analytics/DriverPerformance"
import { ParcelStatus } from "./analytics/ParcelStatus"

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Select defaultValue="week">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Parcels"
          value={31}
          change="+20.1% from last month"
          icon={Package}
        />
        <StatCard
          title="Active Drivers"
          value={8}
          change="+2 drivers this month"
          icon={Truck}
        />
        <StatCard
          title="Total Users"
          value={124}
          change="+19 new users this month"
          icon={Users}
        />
        <StatCard
          title="Revenue"
          value="$1,429"
          change="+15% from last month"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DeliveryChart />
        <DriverPerformance />
        <ParcelStatus />
      </div>
    </div>
  )
}