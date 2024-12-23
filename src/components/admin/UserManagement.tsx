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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, User } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data - replace with actual data when Supabase is integrated
const mockUsers = [
  { 
    id: 1, 
    name: "John Admin", 
    email: "john@admin.com", 
    role: "admin",
    joinDate: "2024-01-15",
    lastActive: "2024-03-10",
    totalOrders: 0,
    status: "active"
  },
  { 
    id: 2, 
    name: "Mike Driver", 
    email: "mike@driver.com", 
    role: "driver",
    joinDate: "2024-02-01",
    lastActive: "2024-03-10",
    totalOrders: 45,
    status: "active"
  },
  { 
    id: 3, 
    name: "Sarah Customer", 
    email: "sarah@customer.com", 
    role: "customer",
    joinDate: "2024-02-15",
    lastActive: "2024-03-09",
    totalOrders: 12,
    status: "active"
  },
]

export function UserManagement() {
  const [users] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleAddUser = () => {
    toast({
      title: "Feature coming soon",
      description: "User creation will be available after Supabase integration",
    })
  }

  const handleEditUser = (userId: number) => {
    toast({
      title: "Feature coming soon",
      description: `Editing user ${userId} will be available after Supabase integration`,
    })
  }

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Feature coming soon",
      description: `Deleting user ${userId} will be available after Supabase integration`,
    })
  }

  const handleRowClick = (user: typeof mockUsers[0]) => {
    setSelectedUser(user)
    setShowDetails(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="driver">Driver</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddUser}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(user)}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell className="capitalize">{user.status}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditUser(user.id)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteUser(user.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about the selected user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-sm">{selectedUser.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-sm capitalize">{selectedUser.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="text-sm capitalize">{selectedUser.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                  <p className="text-sm">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Active</label>
                  <p className="text-sm">{selectedUser.lastActive}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Orders</label>
                  <p className="text-sm">{selectedUser.totalOrders}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}