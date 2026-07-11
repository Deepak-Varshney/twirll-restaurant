import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ImageOff } from "lucide-react";
interface MenuItem {
  product_id: string;
  product_name: string;
  item_short_description: string;
  productpic: string | null;
  currency: string;
  selling_price: number;
  max_selling_price: number
  total_variants: number;
  product_availability: boolean;
}

interface ItemCardProps {
  data: MenuItem;
  onClick: () => void;
}

const ItemCard = ({ data, onClick }: ItemCardProps) => {
  return (
    <Card onClick={onClick} className="cursor-pointer rounded-lg overflow-hidden border-border shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 ">
        <div className="rounded-2xl p-2 flex h-full items-center justify-center text-muted-foreground">
          {data.productpic ? <img src={data.productpic} className="h-full w-full object-cover rounded-sm" /> : <ImageOff size={40} />}
        </div>
      </div>

      <CardContent className="space-y-3 p-5">
        <div>
          <h3 className="text-xl font-semibold">{data.product_name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.item_short_description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            {data.currency} {data.selling_price === data.max_selling_price ? data.max_selling_price : `${data.selling_price}~${data.max_selling_price}`}
          </span>
          {
            data.product_availability ? <div className="flex items-center gap-1 text-sm text-green-600"><CheckCircle2 size={16} />In Stock</div> : <div className="flex items-center gap-1 text-sm text-red-600"><CheckCircle2 size={16} />Stock Out</div>
          }
        </div>

        <Badge variant="secondary">
          {data.total_variants} Variants
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ItemCard;