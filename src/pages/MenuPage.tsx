import api from "@/api/axios";
import Cart from "@/components/Cart";
import ItemCard from "@/components/ItemCard";
import { ProductDialog } from "@/components/ProductVariantModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sortItems } from "@/lib/sortItems";
import { Loader2Icon, ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
const sortOptions = [
  { label: "Price", value: "selling_price" },
  { label: "Availability", value: "product_availability" },
  { label: "Category", value: "category" },
];


export default function MenuPage() {
  const [data, setData] = useState<any[] | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState([
    "selling_price",
    "product_availability",
    "category",
  ]);
  const [loading, setLoading] = useState(false)
  const handleSort = (value: string) => {
    setSortOrder((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item != value)
      }
      if (prev.length === 3) return prev;

      return [...prev, value];
    })
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/products')
        const sortedData = sortItems(data, sortOrder)
        setData(sortedData)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [sortOrder])

  if (!data || loading) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center">
        <Loader2Icon
          size={50}
          className="animate-spin text-primary"
        />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Twirll Cafe Menu</h1>

          <Button variant="secondary" className="relative p-2 rounded-full transition" onClick={() => setCartOpen(true)}>
            <ShoppingCartIcon />
            <Badge className="absolute -top-1 -right-1 items-center justify-center rounded-full bg-primary text-xs font-bold text-muted">
              1
            </Badge>
          </Button>
        </div>
        <div>
          <p className="text-muted-foreground">Sort By</p>
          <div className="flex flex-wrap gap-3">
            {sortOptions.map((item) => {
              const priority = sortOrder.indexOf(item.value) + 1;

              return (
                <Badge
                  key={item.value}
                  onClick={() => handleSort(item.value)}
                  className="cursor-pointer select-none px-4 py-4 text-sm rounded-full"
                  variant={priority ? "default" : "outline"}
                >
                  {priority ? `${priority}. ` : ""}
                  {item.label}
                </Badge>
              );
            })}
          </div>
        </div>
        <p>{data ? data.length : 0} Items Found</p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          data && data.length > 0 && data.map((item: any) => (
            <ItemCard
              key={item.product_id}
              data={item}
              onClick={() => {
                setSelectedProductId(item.product_id);
                setOpen(true);
              }}
            />
          ))
        }
        <ProductDialog
          open={open}
          product_id={selectedProductId}
          onOpenChange={setOpen}
        />
      </div>
      <Cart open={cartOpen} onOpenChange={setCartOpen} />

    </main>
  )
}