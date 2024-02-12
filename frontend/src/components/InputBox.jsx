import React from "react";

const InputBox = ({ input, placeholder, onchange }) => {
  return (
    <div className="my-2">
      <h1 className="font-semibold text-sm">{input}</h1>
      <input
        className="w-full my-1 p-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
};

export default InputBox;
