import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Search() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Search</h1>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              <div className="rounded-lg border bg-card p-4">
                <h2 className="text-lg font-semibold mb-4">Search Results</h2>
                <p className="text-muted-foreground">No results found. Try adjusting your search.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}