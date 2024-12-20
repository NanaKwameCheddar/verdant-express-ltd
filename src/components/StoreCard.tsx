import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface StoreCardProps {
  name: string;
  image: string;
  rating: number;
  category: string;
  deliveryTime: string;
}

export function StoreCard({ name, image, rating, category, deliveryTime }: StoreCardProps) {
  return (
    <Card className="store-card overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-200"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{category}</span>
          <span>{deliveryTime}</span>
        </div>
      </CardContent>
    </Card>
  );
}