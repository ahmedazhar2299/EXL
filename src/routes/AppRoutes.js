import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.js/Home";
import Error from "../pages/Error/Error";
import AddProduct from "../pages/Product/AddProduct/AddProduct";
import ProductApproval from "../pages/Product/ProductApproval/ProductApproval";
import ProductRejection from "../pages/Product/ProductRejection/ProductRejection";
function App() {
  return (
    <div className="font-montserrat">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="pending" element={<ProductApproval />} />
          <Route path="unapproved" element={<ProductRejection />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
