import React, { useEffect, useState } from "react";
import Card from "./Card";

interface Image {
  image_upload: string;
}

interface Item {
  id: string;
  image: Image[];
  name_package?: string;
  detail_package?: string;
  price_package?: number;
  type_package?: string;
}

const Filterpackage: React.FC = () => {
  const [dataPackage, setDataPackage] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [isType, setIsType] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/packageData.json");
        const data: Item[] = await response.json();
        setDataPackage(data);
        setFilteredData(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterByType = (type: string) => {
    const filtered = type === "" ? dataPackage : dataPackage.filter((item) => item.type_package === type);
    setFilteredData(filtered);
    setIsType(type);
  };

  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">Packages Recommend</h1>
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
          onClick={() => filterByType("การท่องเที่ยวธรรมชาติ")}
          className={
            isType === "การท่องเที่ยวธรรมชาติ"
              ? "btn bg-gradient-to-r from-primaryUser to-primaryBusiness transition-opacity group-hover:opacity-100 text-white"
              : "btn bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg"
          }
        >
          ธรรมชาติ
        </button>
        <button
          onClick={() => filterByType("การท่องเที่ยวทางน้ำ")}
          className={
            isType === "การท่องเที่ยวทางน้ำ"
              ? "btn bg-gradient-to-r from-primaryUser to-primaryBusiness transition-opacity group-hover:opacity-100 text-white"
              : "btn bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg"
          }
        >
          ทางน้ำ
        </button>
        <button
          onClick={() => filterByType("การท่องเที่ยวเชิงวัฒนธรรม")}
          className={
            isType === "การท่องเที่ยวเชิงวัฒนธรรม"
              ? "btn bg-gradient-to-r from-primaryUser to-primaryBusiness transition-opacity group-hover:opacity-100 text-white"
              : "btn bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg"
          }
        >
          เชิงวัฒนธรรม
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
