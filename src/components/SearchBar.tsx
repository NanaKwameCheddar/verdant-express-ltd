import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="search"
        placeholder="Search for restaurants or dishes..."
        className="w-full pl-10 pr-4 h-12 rounded-full"
      />
    </div>
  );
}