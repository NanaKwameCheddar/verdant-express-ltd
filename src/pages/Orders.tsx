import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Orders() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Orders</h1>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid gap-6">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Order #12345</h3>
                  <p className="text-sm text-muted-foreground">Placed on Jan 15, 2024</p>
                </div>
                <Button variant="outline">Track Order</Button>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Order #12344</h3>
                  <p className="text-sm text-muted-foreground">Placed on Jan 14, 2024</p>
                </div>
                <Button variant="outline">Track Order</Button>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Order #12343</h3>
                  <p className="text-sm text-muted-foreground">Placed on Jan 13, 2024</p>
                </div>
                <Button variant="outline">Track Order</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}