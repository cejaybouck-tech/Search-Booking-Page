"use client";
import React, { useContext, useEffect, useState } from "react";
import { VisibleAmount, VisibleProperties } from "./SearchView";
import PropertyData from "../interfaces/PropertyData";
import SearchCard from "./SearchCard";

function PropertiesAvailable() {
  const { visibleProperties } = useContext(VisibleProperties);
  const { visibleAmount, setVisibleAmount } = useContext(VisibleAmount);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowMore = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;
    setIsLoading(false);
    setVisibleAmount(visibleProperties.length);
  }, [isLoading, setVisibleAmount, visibleProperties.length]);

  return (
    <div className="relative flex h-full w-full min-w-[375px] flex-col items-center justify-start md:overflow-y-scroll md:border-r md:border-t md:border-gray-500 min-[1585px]:w-full">
      {/* <h2 className="sticky top-0 z-10 w-full bg-white text-center opacity-100">{`Available Properties: [${visibleProperties.length}]`}</h2> */}
      <div className="over flex h-full w-full min-w-[375px] max-w-[410px] flex-col items-center min-[1585px]:w-full min-[1585px]:max-w-none min-[1585px]:flex-row min-[1585px]:flex-wrap min-[1585px]:justify-center">
        {visibleProperties
          .slice(0, visibleAmount)
          .map((homeData: PropertyData) => {
            return (
              <SearchCard
                key={homeData.name}
                unitInfo={{
                  unitId: homeData.id,
                  price: homeData.total,
                  thumbnail: homeData.photo,
                  name: homeData.name,
                  bedrooms: homeData.bedrooms,
                  bathrooms: homeData.bathrooms,
                  maxOccupants: homeData.maxOccupants,
                  location: homeData.location,
                  seoPageName: homeData.seoPageName,
                  rating: homeData.rating,
                }}
                price={homeData.total}
              />
            );
          })}
        {visibleProperties.length > 1 ? (
          isLoading ? (
            <button
              className={`mx-2 my-2 w-full animate-pulse rounded-full border border-gray-300 bg-red-700 p-2 text-white`}
            >
              {`loading...`}
            </button>
          ) : (
            <button
              onClick={handleShowMore}
              className={`mx-2 my-2 w-full rounded-full border border-gray-300 p-2 hover:bg-red-700 hover:text-white md:animate-none ${visibleAmount >= visibleProperties.length ? "hidden" : ""}`}
            >
              {`Show All`}
            </button>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PropertiesAvailable;
