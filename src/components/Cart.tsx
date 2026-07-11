import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"

interface CartProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}
const cartItems = [
    {
        variantId: "v1",
        productName: "Espresso",
        variantName: "Large",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
        currency: "AUD",
        price: 6.0,
        quantity: 2,
    },
    {
        variantId: "v2",
        productName: "Cappuccino",
        variantName: "Regular",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300",
        currency: "AUD",
        price: 5.5,
        quantity: 1,
    },
    {
        variantId: "v3",
        productName: "Veg Sandwich",
        variantName: "Classic",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300",
        currency: "AUD",
        price: 8.5,
        quantity: 1,
    },
];
const Cart = ({ open, onOpenChange }: CartProps) => {
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
                                        {item.currency} {item.price}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button size="icon" variant="outline">-</Button>
                                    <span>{item.quantity}</span>
                                    <Button size="icon" variant="outline">+</Button>
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