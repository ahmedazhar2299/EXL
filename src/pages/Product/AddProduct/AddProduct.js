import React, { useState } from "react";
import Layout from "../../../components/Layouts/Layout";
import ImageUploader from "../../../components/Common/ImageUploader";
import Button from "../../../components/Common/Button";
import { AiOutlineUpload } from "react-icons/ai";
import { BsFiletypeXml } from "react-icons/bs";
import { useToaster } from "rsuite";
import Toaster from "../../../components/Common/Toaster";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [xmlFile, setXmlFile] = useState(null);
  const toaster = useToaster();

  const handleXmlUpload = (event) => {
    setXmlFile(event.target.files[0]);
  };
  const createNewProduct = () => {
    if (images.length > 0 && xmlFile) {
    } else {
      Toaster(toaster, "error", "Missing Uploads");
    }
  };

  return (
    <Layout title={"Add Product"}>
      <div className=" w-10/12 mx-auto p-2 mt-20 ">
        <h1 className="text-lg text-center lg:text-left font-bold">
          Add a New Product
        </h1>
      </div>
      <div className="border-2 bg-white   mb-14 w-10/12 mx-auto p-2 flex flex-col lg:flex-row rounded-lg shadow-lg">
        <div className="flex flex-col w-full px-2 lg:max-w-4xl my-3">
          <div class="mt-10 mb-10 text-center">
            <h2 class="text-2xl font-semibold mb-2">Upload your File</h2>
            <p class="text-xs text-gray-500">File should be of format .xml</p>
          </div>
          <div className="w-full relative h-full flex flex-col justify-center items-center">
            <form
              action="#"
              class={`relative w-4/5 h-32 max-w-xs mb-10   rounded-lg shadow-inner ${
                !xmlFile ? "bg-gray-100" : "bg-green-100"
              }`}
            >
              <input
                onChange={handleXmlUpload}
                type="file"
                id="file-upload"
                class="hidden"
              />
              {!xmlFile ? (
                <>
                  <label
                    for="file-upload"
                    class="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
                  >
                    <p class="z-10 text-xs font-light text-center text-gray-500">
                      Click here to upload your file
                    </p>
                    <AiOutlineUpload />
                  </label>
                </>
              ) : (
                <label
                  for="file-upload"
                  class="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
                >
                  <p class="z-10 text-xs font-light text-center text-gray-500">
                    {xmlFile.name}
                  </p>
                  <BsFiletypeXml />
                </label>
              )}
            </form>
            <Button
              onClick={createNewProduct}
              text="Add Product"
              className=" mt-4"
            />
          </div>
        </div>
        <ImageUploader
          setImageList={(files) => {
            setImages(files);
          }}
        />
      </div>
    </Layout>
  );
};

export default AddProduct;
