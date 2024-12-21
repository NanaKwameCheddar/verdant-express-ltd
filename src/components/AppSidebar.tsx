import { Package } from "lucide-react";
import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <div className="flex items-center gap-3 p-4">
      <Link to="/" className="flex items-center gap-2">
        <Package className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">Verdant Express</span>
      </Link>
    </div>
  );
}