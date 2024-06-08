import React from "react";
import { Link } from "react-router-dom";

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
}

interface CardProps {
  item: Item;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative w-[16.5rem] mx-6 my-6 h-[25rem]">
      <img
        src={item.image[0].image_upload}
        alt="images to cards"
        className="hover:scale-105 transform transition duration-300 w-full h-[15rem] object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{truncateText(item.name_package || item.name_homestay || "", 20)}</div>
        <p className="text-gray-700 text-base">{truncateText(item.detail_package || item.detail_homestay || "", 20)}</p>
      </div>
      <div className="px-6 py- flex justify-between items-center absolute bottom-0 w-full">
        <div className="text-sm font-semibold text-gray-700">
          {item.price_package || item.price_homestay} <span className="text-red-500">฿</span>
        </div>
        <Link to={`/details/${item.id}`}>
          <button className="rounded-[0.5rem] my-4 w-full h-10 relative overflow-hidden py-2 px-4 focus:outline-none bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg">
            ดูรายละเอียด
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
