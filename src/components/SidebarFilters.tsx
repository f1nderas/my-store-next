"use client";

import { Box, FormControlLabel, Switch, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";

interface filtersProps {
  minPrice: number;
  maxPrice: number;
  showOnlyNew: boolean;
}

interface SidebarFiltersProps {
  onFilterChange: (filters: filtersProps) => void;
}

export const SidebarFilters = ({ onFilterChange }: SidebarFiltersProps) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [showOnlyNew, setShowOnlyNew] = useState<boolean>(false);

  const applyFilters = useCallback(
    (min: number, max: number, showNew: boolean) => {
      const updatedFilters = {
        minPrice: min,
        maxPrice: max,
        showOnlyNew: showNew,
      };
      onFilterChange(updatedFilters);
    },
    [onFilterChange]
  );

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? 0 : Number(e.target.value.replace("/^0+/", ""));
    setMinPrice(value);
    applyFilters(value, maxPrice, showOnlyNew);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === ""
        ? Infinity
        : Number(e.target.value.replace("/^0+/", ""));
    setMaxPrice(value);
    applyFilters(minPrice, value, showOnlyNew);
  };

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newShowOnlyNew = e.target.checked;
    setShowOnlyNew(newShowOnlyNew);
    applyFilters(minPrice, maxPrice, showOnlyNew);
  };

  return (
    <Box sx={{ width: 200, p: 2 }}>
      <TextField
        label="Min Price"
        type="number"
        value={minPrice === 0 ? "" : minPrice}
        onChange={handleMinPriceChange}
        inputProps={{ min: 0 }}
      />
      <TextField
        label="Max Price"
        type="number"
        value={maxPrice === Infinity ? "" : maxPrice}
        onChange={handleMaxPriceChange}
      />
      <FormControlLabel
        control={<Switch checked={showOnlyNew} onChange={handleSwitchChange} />}
        label="Only new"
      />
    </Box>
  );
};
