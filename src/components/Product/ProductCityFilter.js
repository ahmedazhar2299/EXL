import React, { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import API from "../../api/server";

const ProductCityFilter = ({ updateCity, removeCity }) => {
  const [data, setData] = useState([]);
  const getCities = async () => {
    const res = await API.get("/exl/products/cities");
    res.data &&
      setData(
        res.data.cities.map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      );
  };
  useEffect(() => {
    getCities();
  }, []);

  return (
    <SelectPicker
      placeholder="Select City"
      data={data ? data.map((item) => ({ label: item, value: item })) : []}
      style={{ width: 224 }}
      onChange={updateCity}
      onClean={removeCity}
    />
  );
};

export default ProductCityFilter;
