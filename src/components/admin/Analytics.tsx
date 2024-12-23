import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Card = ({ title, children }) => (
  <div className="p-4 bg-white shadow rounded-lg">
    <h2 className="text-lg font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const ChartContainer = ({ title, children }) => (
  <Card title={title}>
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </Card>
);

const ChartTooltip = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;
  return (
    <div className="bg-gray-700 text-white p-2 rounded">
      <p className="text-sm font-bold">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const Analytics = () => {
  const [deliveryData, setDeliveryData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("7d");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-analytics-data?timeframe=" + timeframe);
        const data = await response.json();
        setDeliveryData(data.deliveries);
        setStatusData(data.statuses);
        setDriverData(data.drivers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

  const handleTimeframeChange = (e) => setTimeframe(e.target.value);

  const lineChartConfig = useMemo(() => ({
    deliveries: {
      label: "Deliveries",
      theme: { light: "#8884d8", dark: "#8884d8" },
    },
    revenue: {
      label: "Revenue",
      theme: { light: "#82ca9d", dark: "#82ca9d" },
    },
  }), []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <select
        className="col-span-4 p-2 border border-gray-300 rounded mb-4"
        value={timeframe}
        onChange={handleTimeframeChange}
      >
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        <option value="90d">Last 90 Days</option>
      </select>

      <ChartContainer title="Deliveries Over Time">
        <LineChart data={deliveryData}>
          <XAxis dataKey="date" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="count"
            stroke={lineChartConfig.deliveries.theme.light}
          />
        </LineChart>
      </ChartContainer>

      <ChartContainer title="Delivery Status Distribution">
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="status"
            outerRadius={80}
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ChartContainer>

      <ChartContainer title="Top Drivers">
        <BarChart data={driverData}>
          <XAxis dataKey="name" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="deliveries" fill="#82ca9d" />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default Analytics;




// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   PieChart, 
//   Pie, 
//   Cell,
//   LineChart,
//   Line,
//   Legend
// } from "recharts"
// import { Package, TrendingUp, Truck, Users } from "lucide-react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// // Mock data - replace with actual data when Supabase is integrated
// const deliveryData = [
//   { name: "Mon", deliveries: 4, revenue: 400 },
//   { name: "Tue", deliveries: 3, revenue: 300 },
//   { name: "Wed", deliveries: 7, revenue: 700 },
//   { name: "Thu", deliveries: 5, revenue: 500 },
//   { name: "Fri", deliveries: 6, revenue: 600 },
//   { name: "Sat", deliveries: 4, revenue: 400 },
//   { name: "Sun", deliveries: 2, revenue: 200 },
// ]

// const driverData = [
//   { name: "John", deliveries: 15 },
//   { name: "Mike", deliveries: 12 },
//   { name: "Sarah", deliveries: 18 },
//   { name: "David", deliveries: 10 },
// ]

// const statusData = [
//   { name: "Pending", value: 10 },
//   { name: "In Transit", value: 15 },
//   { name: "Delivered", value: 25 },
// ]

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

// // Chart configurations
// const lineChartConfig = {
//   deliveries: {
//     label: "Deliveries",
//     theme: {
//       light: "#8884d8",
//       dark: "#8884d8"
//     }
//   },
//   revenue: {
//     label: "Revenue",
//     theme: {
//       light: "#82ca9d",
//       dark: "#82ca9d"
//     }
//   }
// }

// const barChartConfig = {
//   deliveries: {
//     label: "Deliveries",
//     theme: {
//       light: "#3b82f6",
//       dark: "#3b82f6"
//     }
//   }
// }

// const pieChartConfig = {
//   status: {
//     label: "Status",
//     theme: {
//       light: "#8884d8",
//       dark: "#8884d8"
//     }
//   }
// }

// export function Analytics() {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
//         <Select defaultValue="week">
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select timeframe" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="day">Last 24 Hours</SelectItem>
//             <SelectItem value="week">Last Week</SelectItem>
//             <SelectItem value="month">Last Month</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Parcels</CardTitle>
//             <Package className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">31</div>
//             <p className="text-xs text-muted-foreground">
//               +20.1% from last month
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
//             <Truck className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">8</div>
//             <p className="text-xs text-muted-foreground">
//               +2 drivers this month
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">124</div>
//             <p className="text-xs text-muted-foreground">
//               +19 new users this month
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Revenue</CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$1,429</div>
//             <p className="text-xs text-muted-foreground">
//               +15% from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Weekly Deliveries & Revenue</CardTitle>
//             <CardDescription>
//               Delivery count and revenue trends
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer className="h-[300px]" config={lineChartConfig}>
//               <LineChart data={deliveryData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis yAxisId="left" />
//                 <YAxis yAxisId="right" orientation="right" />
//                 <Tooltip content={<ChartTooltip />} />
//                 <Legend />
//                 <Line yAxisId="left" type="monotone" dataKey="deliveries" stroke="#8884d8" name="Deliveries" />
//                 <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($)" />
//               </LineChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Deliveries by Driver</CardTitle>
//             <CardDescription>
//               Total deliveries completed by each driver
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer className="h-[300px]" config={barChartConfig}>
//               <BarChart data={driverData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip content={<ChartTooltip />} />
//                 <Bar dataKey="deliveries" fill="#3b82f6" />
//               </BarChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Parcel Status Distribution</CardTitle>
//             <CardDescription>
//               Current distribution of parcel statuses
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer className="h-[300px]" config={pieChartConfig}>
//               <PieChart>
//                 <Pie
//                   data={statusData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {statusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip content={<ChartTooltip />} />
//               </PieChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
