import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/admin/UserManagement"
import { ParcelManagement } from "@/components/admin/ParcelManagement"
import { Analytics } from "@/components/admin/Analytics"
import { SystemLogs } from "@/components/admin/SystemLogs"
import { FeedbackTable } from "@/components/admin/FeedbackTable"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users")
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: Implement actual logout logic when Supabase is integrated
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    })
    navigate("/login")
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/lovable-uploads/423456c0-e86c-4c12-9e6a-212fb9ec9bf2.png"
            alt="Verdant Express LTD"
            className="h-8 rounded-lg"
          />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-[500px]">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="parcels">Parcels</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="parcels" className="space-y-4">
          <ParcelManagement />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Analytics />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <FeedbackTable />
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <SystemLogs />
        </TabsContent>
      </Tabs>
    </div>
  )
}