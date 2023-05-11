import React from "react";
import Button from "../Common/Button";

const ProductCard = () => {
  return (
    <div className="mx-auto bg-white hover:scale-105 hover:shadow-all-rounded transition-all p-3 mb-10 border rounded-md">
      <div className="flex w-full flex-col justify-center items-center">
        <div className="w-48 h-48 overflow-hidden">
          <img
            className="w-full h-full rounded-md"
            src={`https://image.api.playstation.com/vulcan/ap/rnd/202211/1717/6Of7qTgej2FBAKH0xZ1ZFEi7.png`}
            alt={"Game"}
          />
        </div>
        <div className="uppercase text-left mt-5">
          <p className="font-light text-black text-xs text-left">Gaming Gear</p>
          <p className="font-extrabold text-black text-xl">Call of Duty</p>
          <p>
            Price: <span className="font-bold">PKR 5000</span>
          </p>
        </div>

        <Button text="View Detail" className="mt-5" />
      </div>
    </div>
  );
};

export default ProductCard;
