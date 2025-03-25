import { useCart } from "@/context/CartContext";
import { Box, Button } from "@mui/material";

interface CounterProps {
  productId: string;
  quantity: number;
}

export const Counter = ({ productId, quantity }: CounterProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleIncrease = () => {
    updateQuantity(productId, quantity + 1);
  };

  return (
    <Box>
      <Button onClick={handleDecrease}>-</Button>
      <span>{quantity}</span>
      <Button onClick={handleIncrease}>+</Button>
    </Box>
  );
};
