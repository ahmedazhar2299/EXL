import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layouts/Layout";
import ProductTable from "./ProductTableUtility/ProductTable";
import API from "../../../api/server";

const ProductRejection = () => {
  const [data, setData] = useState();
  const getItems = async () => {
    try {
      const res = await API.get("/exl/products/all/unapproved");
      res.data && setData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <Layout title="View Listed Orders" bool>
      <div className=" w-10/12 mx-auto p-2 mt-20 ">
        <h1 className="text-lg text-center lg:text-left font-bold">
          Unapproved Products List
        </h1>
      </div>
      <ProductTable data={data} />
    </Layout>
  );
};

export default ProductRejection;
