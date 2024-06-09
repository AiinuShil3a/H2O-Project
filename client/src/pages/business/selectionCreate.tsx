import React from "react";

const RightSide = () => {
  return (
    <div className="w-1/2 h-screen flex justify-center items-center relative">
      <div className="absolute inset-0 bg-custom-bg bg-no-repeat bg-cover bg-opacity-50 hover:bg-opacity-100 transition-opacity duration-500"></div>
      <div className="z-10 text-[100px] font-bold">Create Package</div>
    </div>
  );
};

const LeftSide = () => {
  return (
    <div className="w-1/2 h-screen flex justify-center items-center relative">
      <div className="absolute inset-0 bg-custom-bg bg-no-repeat bg-cover bg-opacity-50 hover:bg-opacity-100 transition-opacity duration-500"></div>
      <div className="z-10 text-[100px] font-bold">Create HomeStay</div>
    </div>
  );
};

const SelectionCreate = () => {
  return (
    <div className="flex">
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default SelectionCreate;
