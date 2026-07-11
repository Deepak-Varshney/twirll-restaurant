import { createContext, useContext, useState } from "react";

export interface CartItem {
    productId: string;
    variantId: string;
    productName: string;
    variantName: string;
    image?: string;
    price: number;
    currency: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (variantId: string) => void;
    increaseQty: (variantId: string) => void;
    decreaseQty: (variantId: string) => void;
    clearCart: () => void;
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    increaseQty: () => { },
    decreaseQty: () => { },
    clearCart: () => { },
    setCartItems:()=>{}
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const addToCart = (item: CartItem) => { }
    const removeFromCart = (variantId: string) => { }
    const increaseQty = (variantId: string) => { }
    const decreaseQty = (variantId: string) => { }
    const clearCart = () => {
        setCartItems([])
    }
    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            increaseQty,
            decreaseQty,
            clearCart,
            setCartItems
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default function useCart(){
    return useContext(CartContext)
}