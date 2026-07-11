import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { useEffect } from "react";
import api from "@/api/axios";
import useCart from "@/context/CartContext";
import { toast } from "sonner";

interface CartProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const Cart = ({ open, onOpenChange }: CartProps) => {
    const { cartItems, setCartItems } = useCart();

    const fetchCart = async () => {
        const { data } = await api.get("/cart/getCart");
        setCartItems(data.data.items);
    };

    const handleIncrease = async (variantId: string) => {
        try {
            const { data } = await api.patch(`/cart/increase/${variantId}`);
            toast.success(data.message);

            await fetchCart();
        } catch (error) {
            toast.error("Failed to update cart");
        }
    };

    const handleDecrease = async (variantId: string) => {
        try {
            const { data } = await api.patch(`/cart/decrease/${variantId}`);
            toast.success(data.message);

            await fetchCart();
        } catch (error) {
            toast.error("Failed to update cart");
        }
    };

    useEffect(() => {
        if (open) {
            fetchCart();
        }
    }, [open]);

    return (
        <div className="flex flex-wrap gap-2 ">
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent
                    className="data-[side=bottom]:max-h-[50vh] p-4 data-[side=top]:max-h-[50vh]"
                >
                    <SheetHeader>
                        <SheetTitle>Your Cart</SheetTitle>
                        <SheetDescription>
                            {cartItems.length} item(s) added
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 space-y-3 overflow-y-auto py-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.variantId}
                                className="flex items-center gap-3 rounded-lg border p-3"
                            >
                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="h-16 w-16 rounded-md object-cover"
                                />

                                <div className="flex-1">
                                    <h4 className="font-medium">{item.productName}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {item.variantName}
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        AUD {item.price}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button size="icon" variant="outline" onClick={() => handleDecrease(item.variantId)}>-</Button>
                                    <span>{item.quantity}</span>
                                    <Button size="icon" variant="outline" onClick={() => handleIncrease(item.variantId)}>+</Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <div className="mb-4 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>AUD 25.50</span>
                        </div>

                        <SheetFooter>
                            <Button className="w-full">
                                Checkout
                            </Button>
                        </SheetFooter>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Cart