import React from "react";
import { SelectPicker } from "rsuite";

const ProductFilter = () => {
  const data = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ].map((item) => ({
    label: item,
    value: item,
    role: "Owner",
  }));
  return (
    <SelectPicker
      data={data}
      style={{ width: 224 }}
      groupBy="role"
      placeholder="Select Category"
      renderMenuItem={(label, item) => {
        return (
          <div>
            <i className="rs-icon rs-icon-user" /> {label}
          </div>
        );
      }}
      renderMenuGroup={(label, item) => {
        return (
          <div>
            <i className="rs-icon rs-icon-group" /> {label} - (
            {item.children.length})
          </div>
        );
      }}
      renderValue={(value, item) => {
        return (
          <div>
            <span style={{ color: "#575757" }}>
              <i className="rs-icon rs-icon-user" /> User :
            </span>{" "}
            {value}
          </div>
        );
      }}
    />
  );
};

export default ProductFilter;
