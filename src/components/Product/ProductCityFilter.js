import React from "react";
import { SelectPicker } from "rsuite";

const ProductCityFilter = () => {
  const data = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ].map((item) => ({ label: item, value: item }));
  return (
    <SelectPicker
      placeholder="Select City"
      data={data}
      style={{ width: 224 }}
    />
  );
};

export default ProductCityFilter;
