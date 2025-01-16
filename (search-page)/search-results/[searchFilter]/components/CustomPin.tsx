import React, { useContext } from "react";
import { VisibleProperties } from "./SearchView";
import PropertyData from "../interfaces/PropertyData";
import Image from "next/image";
import homeImage from "@/public/home.png";

function CustomPin({ price, homeId }: { price: number; homeId: number }) {
  const { visibleProperties, setVisibleProperties } =
    useContext(VisibleProperties);

  const isHidden = () => {
    const currHomeData = visibleProperties.find((homeData: PropertyData) => {
      if (homeData.id === homeId) return homeData;
    });
    return currHomeData.isHidden;
  };

  const isHovered = () => {
    const currHomeData = visibleProperties.find((homeData: PropertyData) => {
      if (homeData.id === homeId) return homeData;
    });
    return currHomeData.isHovered;
  };

  return (
    <div
      className={`relative flex min-w-6 -translate-y-3 flex-col items-center rounded-md border-[3px] border-blue-200 drop-shadow-[1px_1px_black] ${isHovered() ? "bg-blue-500" : "bg-blue-300"} ${isHidden() ? "hidden" : ""}`}
    >
      <Image
        src={homeImage}
        alt="marker image"
        quality={1}
        width={15}
        height={15}
        className="mx-2 my-1 drop-shadow-[1px_1px_black] invert"
      ></Image>
      <p
        className={`mx-1 mb-1 text-white drop-shadow-[1px_1px_black] ${isHovered() ? "" : "hidden"}`}
      >
        {price > 0 ? "$" + price : ""}
      </p>
      <div className="absolute mt-[16px] flex h-full w-full items-end justify-center self-start">
        <div className="h-4 w-6 overflow-hidden">
          <div
            className={`h-4 w-4 origin-top-left -rotate-45 transform border-[3px] border-blue-200 ${isHovered() ? "bg-blue-500" : "bg-blue-300"}`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default CustomPin;
