import React, { useEffect, useState } from "react";
import Card from "./Card";

interface Image {
  image_upload: string;
}

interface Item {
  id: string;
  image: Image[];
  name_package?: string;
  name_homestay?: string;
  detail_package?: string;
  detail_homestay?: string;
  price_package?: number;
  price_homestay?: number;
  type_homestay?: string;
}

const Filterpackage: React.FC = () => {
  const [dataPackage, setDataPackage] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [isType, setIsType] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/homestayData.json");
        const data = await response.json();
        setDataPackage(data);
        setFilteredData(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterByType = (type: string) => {
    const filtered = type === "" ? dataPackage : dataPackage.filter((item) => item.type_homestay === type);
    setFilteredData(filtered);
    setIsType(type);
  };

  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">Homestays Recommend</h1>
      <div className="flex gap-4 mb-4 flex-wrap my-[2rem] mx-[1.75rem]">
        <button
          onClick={() => filterByType("")}
          className={
            isType === ""
              ? "btn bg-gradient-to-r from-primaryUser to-primaryBusiness transition-opacity group-hover:opacity-100 text-white"
              : "btn bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg"
          }
        >
          ทั้งหมด
        </button>
        <button
          onClick={() => filterByType("บ้านเดี่ยว")}
          className={
            isType === "บ้านเดี่ยว"
              ? "btn bg-gradient-to-r from-primaryUser to-primaryBusiness transition-opacity group-hover:opacity-100 text-white"
              : "btn bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg"
          }
        >
          ธรรมชาติ
        </button>
        <button
          onClick={() => filterByType("โฮมสเตย์")}
          className={
            isType === "โฮมสเตย์"
              ? "btn bg-gradient-to-r from-primaryUser to-primaryBusiness transition-opacity group-hover:opacity-100 text-white"
              : "btn bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg"
          }
        >
          ทางน้ำ
        </button>
        <button
          onClick={() => filterByType("วิลล่า")}
          className={
            isType === "วิลล่า"
              ? "btn bg-gradient-to-r from-primaryUser to-primaryBusiness transition-opacity group-hover:opacity-100 text-white"
              : "btn bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg"
          }
        >
          วิลล่า
        </button>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 ${
          filteredData.length > 5 ? "md:flex md:flex-wrap" : ""
        }`}
      >
        {filteredData.slice(0, 5).map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Filterpackage;
