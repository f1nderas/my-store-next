import { IProduct } from "@/types/product";
import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { ProductItem } from "./ProductItem";

interface ProductListProps {
  products: IProduct[];
  filters: { minPrice: number; maxPrice: number; showOnlyNew: boolean };
}

export const ProductList = ({ products, filters }: ProductListProps) => {
  const [sortField, setSortField] = useState<"name" | "price">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredProducts = useMemo<IProduct[]>(() => {
    return products.filter((p) => {
      const withinPriceRange =
        p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const matchesNewFilter = filters.showOnlyNew ? p.isNew : true;
      return withinPriceRange && matchesNewFilter;
    });
  }, [products, filters.minPrice, filters.maxPrice, filters.showOnlyNew]);

  const sortedProducts = useMemo<IProduct[]>(() => {
    return [...filteredProducts].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (sortDirection === "asc") {
        return fieldA > fieldB ? 1 : -1;
      }
      return fieldA < fieldB ? 1 : -1;
    });
  }, [filteredProducts, sortField, sortDirection]);

  return (
    <Box>
      <Box>
        <Button
          onClick={() => {
            setSortField("name");
            setSortDirection("asc");
          }}
        >
          Name ↑
        </Button>
        <Button
          onClick={() => {
            setSortField("name");
            setSortDirection("desc");
          }}
        >
          Name ↓
        </Button>
        <Button
          onClick={() => {
            setSortField("price");
            setSortDirection("asc");
          }}
        >
          Price ↑
        </Button>
        <Button
          onClick={() => {
            setSortField("price");
            setSortDirection("desc");
          }}
        >
          Price ↓
        </Button>
      </Box>
      <Box sx={{ display: "grid", gap: 2 }}>
        {sortedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};
