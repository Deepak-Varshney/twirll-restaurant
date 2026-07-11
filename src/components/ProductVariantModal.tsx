import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCart, { type CartItem } from "@/context/CartContext";
import { ImageOff, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductDialogProps {
  product_id: string | null;
  open: boolean
  onOpenChange: (open: boolean) => void
}
interface Photo {
  photo_url: string;
}


interface ProductVariant {
  id: number
  selling_price: number;
  currency: string;
  product_variant_name: string;
  product_variant_description: string;
  discount_perc: number | null;
  discount_flat_amt: number | null;
  product_availability: boolean;
  variant_album: Photo[];
  product_variant_id: string;
  product_id: string
}

interface Product {
  product_name: string;
  productpic: string | null;
  additional_data?: {
    short_description?: string;
  };
  product_variant_inventories: ProductVariant[];
  product_photos_all: Photo[];

}


export function ProductDialog({ open, onOpenChange, product_id }: ProductDialogProps) {

  const [data, setData] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  useEffect(() => {
    async function fetchProductData() {
      try {
        setData(null);
        setSelectedVariant(null); setLoading(true)
        const { data } = await api.get(`/products/${product_id}`)
        setData(data)

      } catch (error: any) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    if (product_id && open) {
      fetchProductData();
    }
  }, [open, product_id]);

  const handleSubmit = async () => {
    if (!selectedVariant || !data) {
      toast.error("Please select a variant");
      return;
    }

    const payload: CartItem = {
      productId: selectedVariant.product_id.toString(),
      variantId: selectedVariant.product_variant_id.toString(),
      productName: data.product_name.toString(),
      variantName: selectedVariant.product_variant_name.toString(),
      price: selectedVariant.selling_price,
      image: data.productpic?.toString(),
      quantity: 1,
    };

    addToCart(payload);
    setSelectedVariant(null);
    onOpenChange(false)
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-md">
        {
          (!data || loading) ? (
            <div className="flex h-60 items-center justify-center">
              <Loader2Icon
                size={50}
                className="animate-spin text-primary"
              />
            </div>
          ) : (
            <>

              <DialogHeader>
                <DialogTitle>{data.product_name}</DialogTitle>
                <DialogDescription>
                  {data.additional_data?.short_description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex h-60 items-center justify-center rounded-lg border bg-muted">

                {data.product_photos_all[0]?.photo_url ? <img src={data.product_photos_all[0]?.photo_url} width={200} /> : <ImageOff size={40} />}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Variants</h4>

                {data.product_variant_inventories.map((item: ProductVariant) => (
                  <div onClick={() => setSelectedVariant(item)} key={item.id} className={`flex cursor-pointer items-center justify-between ${selectedVariant?.id === item.id ? "border-primary bg-muted" : ""} rounded-lg border p-3 hover:bg-muted`}>
                    <div >
                      <p className="font-medium">{item.product_variant_name}</p>
                      <p className="text-sm text-muted-foreground">{item.currency} {item.selling_price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter>
                <Button className="w-full" disabled={!selectedVariant} onClick={handleSubmit}>
                  Add to Cart
                </Button>
              </DialogFooter>
            </>
          )
        }


      </DialogContent>
    </Dialog>
  );
}