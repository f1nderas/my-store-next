"use client";

import { IProduct } from "@/types/product";
import { createContext, ReactNode, useContext, useState } from "react";

interface CartItemProps extends IProduct {
  quantity: number;
}

interface CartContentTypeProps {
  cart: CartItemProps[];
  addToCart: (product: IProduct) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContentTypeProps | undefined>(undefined);

export const CartProvide = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItemProps[]>([]);

  const addToCart = (product: IProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvide");
  return context;
};
