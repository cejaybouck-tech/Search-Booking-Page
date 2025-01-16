"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { VisibleProperties } from "./SearchView";
import PropertyData from "../interfaces/PropertyData";
import Star from "@/public/star.png";

interface UnitInfo {
  unitId: number;
  price: number;
  thumbnail: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  maxOccupants: number;
  location: string;
  seoPageName: string;
  rating: number;
}

function SearchCard({
  unitInfo,
  price,
}: {
  unitInfo: UnitInfo;
  price: number;
}) {
  const { visibleProperties, setVisibleProperties } =
    useContext(VisibleProperties);

  const unitExists: boolean = unitInfo !== null;

  useEffect(() => {
    const handleMouseEnter = () => {
      const newProperties = visibleProperties.map((homeData: PropertyData) => {
        const newHome = { ...homeData, isHidden: true };
        if (Number(homeData.id) === Number(unitInfo.unitId)) {
          newHome.isHidden = false;
          newHome.isHovered = true;
        }
        return newHome;
      });
      setVisibleProperties(newProperties);
    };

    const handleMouseLeave = () => {
      const newProperties = visibleProperties.map((homeData: PropertyData) => {
        const newHome = { ...homeData, isHidden: false, isHovered: false };
        return newHome;
      });
      setVisibleProperties(newProperties);
    };

    const hoverCardElement = document.getElementById(
      "hover-" + unitInfo.unitId,
    );
    hoverCardElement.addEventListener("mouseenter", handleMouseEnter);
    hoverCardElement.addEventListener("mouseleave", handleMouseLeave);
  }, [visibleProperties, setVisibleProperties, unitInfo.unitId]);

  const reviewPlaceholder = [0, 0, 0, 0, 0];
  return (
    <div>
      {unitExists ? (
        <div id={"hover-" + unitInfo.unitId.toString()}>
          <Link
            href={"/properties/" + unitInfo.seoPageName}
            className="relative m-0.5 flex h-[250px] w-[375px] flex-col justify-center overflow-hidden rounded-3xl bg-black"
          >
            <Image
              src={unitInfo.thumbnail}
              alt={`${unitInfo.name} thumbnail`}
              quality={50}
              fill
              sizes={"375px 250px"}
              className="absolute border border-gray-400 opacity-80"
              priority
            />
            <div className="absolute ml-4 mt-5 flex h-full items-start">
              <p className="rounded-lg bg-white bg-opacity-80 p-1 text-xl text-gray-700 drop-shadow-[1px_1px_black]">
                {unitInfo.location}
              </p>
            </div>
            <section className="flex h-full w-full flex-col justify-end">
              <div className="z-10 flex justify-between px-2">
                <div className="flex items-end pb-1">
                  {unitInfo.rating > 0
                    ? reviewPlaceholder.map((item, index) => {
                        return (
                          <Image
                            key={"star-" + index}
                            src={Star}
                            alt={`review stars`}
                            quality={1}
                            className="h-[25px] w-[25px] drop-shadow-[1px_1px_black]"
                          />
                        );
                      })
                    : ""}
                </div>
                <div className="z-10 text-2xl text-white opacity-100 drop-shadow-[1px_1px_black]">
                  {price ? "$" + price.toFixed(2) : ""}
                </div>
              </div>
              <div className="flex flex-col items-center border border-gray-300 bg-black bg-opacity-50 backdrop-blur-sm">
                <h2 className="text px-2 text-center text-2xl text-white text-opacity-100 drop-shadow-[1px_1px_black]">
                  {unitInfo.name}
                </h2>
                <div className="h-1 w-2/3 rounded bg-red-700"></div>
                <div className="flex items-center justify-center">
                  <p className="mr-2 text-white drop-shadow-[1px_1px_black]">
                    BEDS {unitInfo.bedrooms} |
                  </p>
                  <p className="mr-2 text-white drop-shadow-[1px_1px_black]">
                    BATHS {unitInfo.bathrooms} |
                  </p>
                  <p className="text-white drop-shadow-[1px_1px_black]">
                    GUESTS {unitInfo.maxOccupants}
                  </p>
                </div>
              </div>
            </section>
          </Link>
        </div>
      ) : (
        <div className="relative m-0.5 flex h-[250px] w-[375px] flex-col items-center justify-center rounded-3xl border border-gray-400 bg-gray-200">
          This property is coming soon!
        </div>
      )}
    </div>
  );
}

export default SearchCard;
