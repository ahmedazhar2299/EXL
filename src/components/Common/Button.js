import React from "react";
import { Loader } from "rsuite";

const Button = ({ text, onClick, className, loader, Icon, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gray-700 focus:outline-none flex items-center justify-center active:bg-gray-900/95 focus:ring-2 focus:ring-offset-2 text-white px-10 rounded-lg py-1.5 font-semibold ${className}`}
    >
      {loader && <Loader className="mr-2" />}
      <div className="mr-2">{Icon}</div>
      {text}
    </button>
  );
};

export default Button;
