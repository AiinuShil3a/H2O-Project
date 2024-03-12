import { useState } from "react";

const Search = () => {
  const [isPackage, setIsPackage] = useState(false);
  const clickToPackage = () => {
    setIsPackage(true);
  };
  const clickToHome = () => {
    setIsPackage(false);
  };
  
  return (
    <div className="mx-auto">
    {isPackage === false && (
      <div className="relative bg-white bg-opacity-50 p-6 rounded-[20px] w-[50vw] h-[35vh] flex flex-col items-center justify-center shadow-lg">
        <div className="flex items-center justify-between mt-4">
          <div className="relative">
            <button
              className="bg-primaryUser text-white p-2 mr-2 rounded-[15px]"
              onClick={clickToHome}
            >
              สถานที่พัก
            </button>
          </div>
          <div className="relative">
            <button
              className="bg-white text-black p-2 rounded-[15px]"
              onClick={clickToPackage}
            >
              แพ็คเกจ
            </button>
          </div>
        </div>
        <hr className="w-full my-5 border-t-2 border-white shadow-lg" />
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white text-black p-2 mb-2 rounded-tl-[10px] rounded-bl-[10px] block w-[25vw] relative"
          />
          <button className="bg-primaryUser text-black p-2 mb-2 block text-white rounded-tr-[10px] rounded-br-[10px]">
            ค้นหา
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button className="bg-white text-black rounded-[10px] p-2 mr-2">
            Select People
          </button>
          <button className="bg-white text-black rounded-[10px] p-2">
            Select Calendar
          </button>
        </div>
      </div>
    )}
    {isPackage === true && (
      <div className="relative bg-white bg-opacity-50 p-6 rounded-[20px] w-[50vw] h-[35vh] flex flex-col items-center justify-center shadow-lg">
        <div className="flex items-center justify-between mt-4">
          <div className="relative">
            <button
              className="bg-white text-black p-2 mr-2 rounded-[15px]"
              onClick={clickToHome}
            >
              สถานที่พัก
            </button>
          </div>
          <div className="relative">
            <button
              className="bg-primaryUser text-white p-2 rounded-[15px]"
              onClick={clickToPackage}
            >
              แพ็คเกจ
            </button>
          </div>
        </div>
        <hr className="w-full my-5 border-t-2 border-white shadow-lg" />
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white text-black p-2 mb-2 rounded-tl-[10px] rounded-bl-[10px] block w-[25vw] relative" // หรือเปลี่ยนเป็น w-[100%]
          />
          <button className="bg-primaryUser text-black p-2 mb-2 block text-white rounded-tr-[10px] rounded-br-[10px]">
            ค้นหา
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button className="bg-white text-black rounded-[10px] p-2 mr-2">
            Select Type Package
          </button>
          <button className="bg-white text-black rounded-[10px] p-2">
            Select Calendar
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default Search;
