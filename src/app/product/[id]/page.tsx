"use client";

import { IProduct } from "@/types/product";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// export async function generateStaticParams() {
//   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
//   const response = await fetch(`${basePath}/data/products.json`);
//   const products: IProduct[] = await response.json();

//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

// async function getProduct(id: string): Promise<IProduct | null> {
//   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
//   const response = await fetch(`${basePath}/data/products.json`);
//   const products: IProduct[] = await response.json();
//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     notFound();
//   }
//   return product;
// }

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (id) {
      fetch("/data/products.json")
        .then((res) => res.json())
        .then((data) => setProduct(data.find((p: IProduct) => p.id === id)));
    }
  }, [id]);

  if (!product) return <Typography> Loading...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography>Price: ${product.price}</Typography>
      <Typography>Description: {product.description}</Typography>
      <Button variant="outlined" sx={{ mt: 2 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Back to Home
        </Link>
      </Button>
    </Box>
  );
}
