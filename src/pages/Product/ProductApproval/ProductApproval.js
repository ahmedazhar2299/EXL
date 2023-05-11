import React, { useState } from "react";
import Layout from "../../../components/Layouts/Layout";
import { Input, SelectPicker, useToaster } from "rsuite";
import Toaster from "../../../components/Common/Toaster";
import ProductTable from "./ProductTableUtility/ProductTable";

const data = [
  {
    _id: 1,
    userEmail: "email",
    userName: "name",
    banUser: "ban",
  },
  {
    _id: 2,
    itemName: "game",
    userEmail: "email",
    userName: "name",
    status: "pending",
    createdAt: "today",
  },
  {
    _id: 3,
    itemName: "game",
    userEmail: "email",
    userName: "name",
    status: "pending",
    createdAt: "today",
  },
  {
    _id: 4,
    itemName: "game",
    userEmail: "email",
    userName: "name",
    status: "pending",
    createdAt: "today",
  },
];

const ProductApproval = () => {
  const [orders, setOrders] = useState(data);
  return (
    <Layout title="View Listed Orders" bool>
      <div className=" w-10/12 mx-auto p-2 mt-20 ">
        <h1 className="text-lg text-center lg:text-left font-bold">
          Pending Products List
        </h1>
      </div>
      <ProductTable data={orders} />
    </Layout>
  );
};

export default ProductApproval;
