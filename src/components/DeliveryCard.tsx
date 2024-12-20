import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Package } from "lucide-react";

interface DeliveryCardProps {
  name: string;
  image: string;
  price: string;
  category: string;
  estimatedTime: string;
}

export function DeliveryCard({
  name,
  image,
  price,
  category,
  estimatedTime,
}: DeliveryCardProps) {
  return (
    <Card className="overflow-hidden store-card">
      <div className="aspect-video relative">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded-full text-sm font-medium">
          {price}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-muted-foreground text-sm">{category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Clock className="w-4 h-4" />
          <span>{estimatedTime}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <Package className="mr-2 h-4 w-4" />
          Send Package
        </Button>
      </CardFooter>
    </Card>
  );
}