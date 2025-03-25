"use client";

import { Cart } from "@/components/Cart";
import { ProductList } from "@/components/ProductList";
import { SidebarFilters } from "@/components/SidebarFilters";
import { IProduct } from "@/types/product";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    showOnlyNew: false,
  });

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("/data/products.json");
      const data: IProduct[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Box sx={{ display: "flex", p: 2 }}>
          <SidebarFilters onFilterChange={setFilters} />
          <ProductList products={products} filters={filters} />
          <Cart />
        </Box>
      </main>
    </div>
  );
}
