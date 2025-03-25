import { useCart } from "@/context/CartContext";
import { Box, Typography } from "@mui/material";

export const Cart = () => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ position: "fixed", top: 10, right: 10 }}>
      <Typography>Cart: ${total}</Typography>
    </Box>
  );
};
