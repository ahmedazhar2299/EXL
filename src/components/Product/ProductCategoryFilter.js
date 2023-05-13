import React, { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import API from "../../api/server";

const ProductFilter = ({ removeCategory, updateCategory }) => {
  const [data, setData] = useState([]);
  const getCategories = async () => {
    const res = await API.get("/exl/products/categories");
    res.data && setData(res.data.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <SelectPicker
      data={
        data
          ? data
              .map((m) => {
                const key = Object.keys(m)[0];
                const values = m[key];
                return values.map((value) => ({
                  label: value,
                  value: value,
                  role: key,
                }));
              })
              .flat()
          : []
      }
      onClean={removeCategory}
      style={{ width: 224 }}
      groupBy="role"
      placeholder="Select Category"
      renderMenuItem={(label, item) => {
        return (
          <div className=" capitalize">
            <i className="rs-icon rs-icon-user" /> {label}
          </div>
        );
      }}
      renderMenuGroup={(label, item) => {
        return (
          <div className=" capitalize">
            <i className="rs-icon rs-icon-group" /> {label} - (
            {item.children.length})
          </div>
        );
      }}
      renderValue={(label, item) => {
        updateCategory("/" + item.role + "/" + item.label);
        return (
          <div>
            <span className=" capitalize" style={{ color: "#575757" }}>
              {item.role} {":"} {item.value}
            </span>
          </div>
        );
      }}
    />
  );
};

export default ProductFilter;
