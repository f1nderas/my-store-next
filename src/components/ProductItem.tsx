"use client";

import { useCart } from "@/context/CartContext";
import { IProduct } from "@/types/product";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { Counter } from "./Counter";

interface ProductItemProps {
  product: IProduct;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const { cart, addToCart } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card>
      <CardContent>
        <Link href={`/product/${product.id}`}>
          <Typography variant="h6">{product.name}</Typography>
        </Link>
        <Typography>Price: ${product.price}</Typography>
        <Typography>Brand: {product.brand}</Typography>
        {cartItem && cartItem.quantity > 0 ? (
          <Counter productId={product.id} quantity={cartItem?.quantity || 1} />
        ) : (
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        )}
      </CardContent>
    </Card>
  );
};
