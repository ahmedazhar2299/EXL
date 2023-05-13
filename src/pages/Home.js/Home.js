import React, { useEffect, useState } from "react";
import API from "../../api/server";
import Layout from "../../components/Layouts/Layout";
import { Loader, SelectPicker } from "rsuite";
import ProductCard from "../../components/Product/ProductCard";
import ProductCategoryFilter from "../../components/Product/ProductCategoryFilter";
import ProductCityFilter from "../../components/Product/ProductCityFilter";
import displayBanner from "../../assets/images/banner.jpg";
const Home = () => {
  const [items, setItems] = useState([]);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const removeCategory = () => setCategory("");
  const updateCategory = (categoryName) => setCategory(categoryName);
  const removeCity = () => {
    setCity("");
  };
  const updateCity = (cityName) => {
    if (cityName) setCity(cityName.toLowerCase());
  };

  const getAllItems = async () => {
    try {
      const res = await API.get("/exl/products/all/approved");
      res.data && setItems(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getfilterItems = async () => {
    try {
      const URL = "/exl/products/filter/" + city + category;
      console.log(URL);
      const res = await API.get(URL);
      res.data && setItems(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    getfilterItems();
  }, [city, category]);

  return (
    <Layout title={"All Products"}>
      <div className="mt-28 sm:mt-0">
        <img src={displayBanner} className=" w-full" alt="banner" />
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-start items-center gap-5 my-10">
          <ProductCityFilter updateCity={updateCity} removeCity={removeCity} />
          <ProductCategoryFilter
            updateCategory={updateCategory}
            removeCategory={removeCategory}
          />
        </div>

        {!items ? (
          <div className="w-full flex justify-center mb-20">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5">
            {items?.map((data) => (
              <ProductCard key={data?._id} detail={data} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
