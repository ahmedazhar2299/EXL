import React from "react";
import Button from "../Common/Button";

const ProductCard = ({ detail }) => {
  return (
    <div className="mx-auto bg-white hover:scale-105 hover:shadow-all-rounded transition-all p-3 mb-10 border rounded-md">
      <div className="flex w-full flex-col justify-center items-center">
        <div className="w-48 h-48 overflow-hidden">
          <img
            className="w-full h-full rounded-md"
            src={
              detail.images ? `data:image/jpeg;base64,${detail.images[0]}` : ""
            }
            alt={"Game"}
          />
        </div>
        <div className="uppercase text-center mt-5">
          <p className="font-light text-black text-xs ">
            {detail.subcategory + " - " + detail.brand}
          </p>
          <p className="font-extrabold text-black text-xl">{detail.model}</p>
          <p>
            Price: <span className="font-bold">PKR {detail.price}</span>
          </p>
          <p className="text-xs">{detail.city}</p>
        </div>

        <Button text="View Detail" className="mt-5" />
      </div>
    </div>
  );
};

export default ProductCard;
