import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Package, Pencil } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data - replace with actual data when Supabase is integrated
const mockParcels = [
  {
    id: 1,
    trackingId: "PKG001",
    status: "pending",
    driver: "Unassigned",
    customer: "John Doe",
    destination: "123 Main St",
  },
  {
    id: 2,
    trackingId: "PKG002",
    status: "in_transit",
    driver: "Mike Driver",
    customer: "Jane Smith",
    destination: "456 Oak Ave",
  },
  {
    id: 3,
    trackingId: "PKG003",
    status: "delivered",
    driver: "Mike Driver",
    customer: "Bob Wilson",
    destination: "789 Pine Rd",
  },
]

export function ParcelManagement() {
  const [parcels] = useState(mockParcels)
  const [searchTerm, setSearchTerm] = useState("")

  const handleAssignDriver = (parcelId: number) => {
    toast({
      title: "Feature coming soon",
      description: `Assigning driver to parcel ${parcelId} will be available after Supabase integration`,
    })
  }

  const handleUpdateStatus = (parcelId: number) => {
    toast({
      title: "Feature coming soon",
      description: `Updating status for parcel ${parcelId} will be available after Supabase integration`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search parcels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[300px]"
        />
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map((parcel) => (
              <TableRow key={parcel.id}>
                <TableCell>{parcel.trackingId}</TableCell>
                <TableCell className="capitalize">{parcel.status}</TableCell>
                <TableCell>{parcel.driver}</TableCell>
                <TableCell>{parcel.customer}</TableCell>
                <TableCell>{parcel.destination}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAssignDriver(parcel.id)}
                  >
                    <Package className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateStatus(parcel.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}