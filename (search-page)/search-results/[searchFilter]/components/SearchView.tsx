"use client";

import React, { createContext, Suspense, useState } from "react";
import PropertyData from "../interfaces/PropertyData";
import FiltersBar from "./FiltersBar";
import PropertiesAvailable from "./PropertiesAvailable";
import PropertiesMap from "./PropertiesMap";
import Filters from "../interfaces/Filters";
import MoreOptions from "./more-filters/MoreOptions";

export const VisibleProperties = createContext(null);
export const VisibleAmount = createContext(null);
export const ShowFilters = createContext(null);

function SearchView({
  homes,
  defaultFilters,
  hideFilters,
}: {
  homes: Array<PropertyData>;
  defaultFilters: Filters;
  hideFilters?: boolean;
}) {
  const [visibleProperties, setVisibleProperties] =
    useState<Array<PropertyData>>(homes);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const startAmount = 10;
  const [visibleAmount, setVisibleAmount] = useState(startAmount);
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <VisibleProperties.Provider
        value={{ visibleProperties, setVisibleProperties }}
      >
        <VisibleAmount.Provider value={{ visibleAmount, setVisibleAmount }}>
          <ShowFilters.Provider value={{ showFilters, setShowFilters }}>
            {hideFilters === undefined || hideFilters === false ? (
              <FiltersBar defaultFilters={defaultFilters} />
            ) : (
              ""
            )}
            <div className="relative flex h-full w-full justify-start overflow-x-hidden md:overflow-hidden">
              <PropertiesAvailable />
              <PropertiesMap />
              <MoreOptions allHomes={homes} />
            </div>
          </ShowFilters.Provider>
        </VisibleAmount.Provider>
      </VisibleProperties.Provider>
    </div>
  );
}

export default SearchView;
