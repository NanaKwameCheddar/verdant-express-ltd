import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Track your package or enter destination address..."
            className="pl-10 w-full"
          />
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Track Package
        </Button>
      </div>
    </div>
  );
}