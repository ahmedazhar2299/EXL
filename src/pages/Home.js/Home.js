import React, { useEffect, useState } from "react";
import API from "../../api/server";
import Layout from "../../components/Layouts/Layout";
import { Loader, SelectPicker } from "rsuite";
import ProductCard from "../../components/Product/ProductCard";
import ProductCategoryFilter from "../../components/Product/ProductCategoryFilter";
import ProductCityFilter from "../../components/Product/ProductCityFilter";
import displayBanner from "../../assets/images/banner.jpg";
const Home = () => {
  const dat = ["Gaming Gear", "Video Game"].map((item) => ({
    label: item,
    value: item,
  }));
  const [items, setItems] = useState([1, 2, 3, 5, 6]);

  const getCategoryItems = async (category) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const getItems = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products"}>
      <div className="mt-28 sm:mt-0">
        <img src={displayBanner} className=" w-full" alt="banner" />
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-start items-center gap-5 my-10">
          <ProductCityFilter />
          <ProductCategoryFilter />
        </div>

        {!items ? (
          <div className="w-full flex justify-center mb-20">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
            {items?.map((photo) => (
              <ProductCard key={photo?._id} item={photo} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
