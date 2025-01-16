"use client";

import React, { createContext, useContext, useState, MouseEvent } from "react";
import { ShowFilters, VisibleProperties } from "../SearchView";
import PropertyData from "../../interfaces/PropertyData";
import BedroomOptions from "./BedroomOptions";
import BathroomOptions from "./BathroomOptions";
import CountyOptions from "./CountyOptions";
import NeighborhoodOptions from "./NeighborhoodOptions";
import AmenitiesOptions from "./AmenitiesOptions";
import AmenityData from "../../interfaces/AmenityData";

export const FiltersActive = createContext(null);

function MoreOptions({ allHomes }: { allHomes: Array<PropertyData> }) {
  const { visibleProperties, setVisibleProperties } =
    useContext(VisibleProperties);
  const [filtersActive, setFiltersActive] = useState([]);
  const { showFilters, setShowFilters } = useContext(ShowFilters);

  const updateVisibleProperties = (newActiveFilters: Array<any>) => {
    if (newActiveFilters.length < 1) {
      setVisibleProperties(allHomes);
      return;
    }

    const bedrooms = newActiveFilters.filter((filterId) =>
      filterId.includes("bedroom"),
    );

    let newVisibleProperties = allHomes;
    /* get all homes with bedroom amounts in filters */
    if (bedrooms.length > 0)
      newVisibleProperties = newVisibleProperties.filter(
        (homeData: PropertyData) => {
          let hasFilter = false;
          bedrooms.map((filterId) => {
            const amt = Number(filterId.split(" ")[0]);
            if (Number(homeData.bedrooms) === amt) hasFilter = true;
          });

          return hasFilter;
        },
      );

    /* filter out bathrooms */
    const bathrooms = newActiveFilters.filter((filterId) =>
      filterId.includes("bathroom"),
    );

    if (bathrooms.length > 0)
      newVisibleProperties = newVisibleProperties.filter(
        (homeData: PropertyData) => {
          let hasFilter = false;
          bathrooms.map((filterId) => {
            const amt = Number(filterId.split(" ")[0]);
            if (Number(homeData.bathrooms) === amt) hasFilter = true;
          });

          return hasFilter;
        },
      );

    /* filter out locations/countys */
    const counties = newActiveFilters.filter((filterId) =>
      filterId.includes("county"),
    );

    if (counties.length > 0)
      newVisibleProperties = newVisibleProperties.filter(
        (homeData: PropertyData) => {
          let hasFilter = false;
          counties.map((filterId) => {
            let name = filterId.split("-")[0];
            if (name === "Other") name = null;
            if (homeData.location === name) hasFilter = true;
          });

          return hasFilter;
        },
      );

    /* filter out neighborhoods */

    const neighborhoods = newActiveFilters.filter((filterId) =>
      filterId.includes("neighborhood"),
    );

    if (neighborhoods.length > 0)
      newVisibleProperties = newVisibleProperties.filter(
        (homeData: PropertyData) => {
          let hasFilter = false;
          neighborhoods.map((filterId) => {
            let name = filterId.split("-")[0];
            if (homeData.neighborhood === name) hasFilter = true;
          });

          return hasFilter;
        },
      );

    /* filter out amenities */
    const amenities = newActiveFilters.filter((filterId) =>
      filterId.includes("amenity"),
    );

    if (amenities.length > 0)
      amenities.map((filterId) => {
        const raw = filterId.split("-");
        const filterName = raw[0].toLowerCase();
        newVisibleProperties = newVisibleProperties.filter(
          (homeData: PropertyData) => {
            let hasFilter = false;
            const amenityArray = (homeData.amenities as AmenityData).amenity;
            if (!amenityArray) return;
            amenityArray.map((amenity) => {
              if (
                amenity.amenity_name.toLowerCase() === filterName.toLowerCase()
              )
                hasFilter = true;
            });

            return hasFilter;
          },
        );
      });

    setVisibleProperties(newVisibleProperties);
  };

  const handleOptionClick = (e: MouseEvent) => {
    const { id } = e.target as HTMLInputElement;
    let newActiveFilters = filtersActive;
    if (filtersActive.includes(id)) {
      newActiveFilters = newActiveFilters.filter((filterId) => id !== filterId);
    } else {
      newActiveFilters.push(id);
    }
    setFiltersActive(newActiveFilters);
    updateVisibleProperties(newActiveFilters);
  };

  return (
    <div
      className={`absolute top-0 z-10 flex h-full w-full bg-white p-1 text-lg transition duration-200 md:left-1/2 md:w-1/2 ${showFilters ? "" : "translate-x-full"}`}
    >
      {!showFilters ? (
        ""
      ) : (
        <div className="h-full w-full flex-col items-start overflow-y-scroll">
          <div className="grid w-full grid-cols-2">
            <BedroomOptions
              allHomes={allHomes}
              clickHandler={handleOptionClick}
            />
            <BathroomOptions
              allHomes={allHomes}
              clickHandler={handleOptionClick}
            />
            <NeighborhoodOptions
              allHomes={allHomes}
              clickHandler={handleOptionClick}
            />
            <CountyOptions
              allHomes={allHomes}
              clickHandler={handleOptionClick}
            />
          </div>
          <AmenitiesOptions
            allHomes={allHomes}
            clickHandler={handleOptionClick}
          />
        </div>
      )}
    </div>
  );
}

export default MoreOptions;
