import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DeliveryCardProps {
  name: string;
  image: string;
  price: string;
  category: string;
  estimatedTime: string;
}

export function DeliveryCard({ name, image, price, category, estimatedTime }: DeliveryCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{name}</CardTitle>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Package className="mr-2 h-4 w-4" />
            <span>{category}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>
          <div className="font-semibold">{price}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => navigate('/order-placement')}
        >
          Select
        </Button>
      </CardFooter>
    </Card>
  );
}