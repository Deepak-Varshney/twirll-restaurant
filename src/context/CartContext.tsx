import api from "@/api/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  image?: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  increaseQty: (variantId: string) => Promise<void>;
  decreaseQty: (variantId: string) => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  fetchCart: async () => {},
  addToCart: async () => {},
  increaseQty: async () => {},
  decreaseQty: async () => {},
});

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart/getCart");
      setCartItems(data.data.items ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (item: CartItem) => {
    try {
      const { data } = await api.post("/cart/add", item);
      await fetchCart();
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to add cart");
    }
  };

  const increaseQty = async (variantId: string) => {
    try {
      const { data } = await api.patch(`/cart/increase/${variantId}`);
      await fetchCart();
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const decreaseQty = async (variantId: string) => {
    try {
      const { data } = await api.patch(`/cart/decrease/${variantId}`);
      await fetchCart();
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCart,
        addToCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default function useCart() {
  return useContext(CartContext);
}