import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { CATEGORIES } from "../constants";

export default function CategorySelector({category, handleCategoryChange}) {
    const options = Object.values(CATEGORIES);
    return (
        <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
            >
                {options.map((option) => {
                    return (
                        <MenuItem key={option.value} value={option.value}>
                            {option.title}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}