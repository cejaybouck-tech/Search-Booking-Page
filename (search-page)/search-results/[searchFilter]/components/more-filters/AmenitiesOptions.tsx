import React, { MouseEventHandler } from "react";
import PropertyData from "../../interfaces/PropertyData";
import AmenityData from "../../interfaces/AmenityData";
import AmenityOptions from "./AmenityOptions";

function AmenitiesOptions({
  allHomes,
  clickHandler,
}: {
  allHomes: Array<PropertyData>;
  clickHandler: MouseEventHandler<HTMLElement>;
}) {
  const getAllOptions = () => {
    const groupNames = {};
    /* sort amenities by group name */
    allHomes.map((homeData: PropertyData) => {
      const amenityArray = homeData.amenities.amenity;
      if (!amenityArray) return;
      amenityArray.map(
        (amenity: { group_name: string; amenity_name: string }) => {
          const groupName = amenity.group_name;
          const amenityName = amenity.amenity_name;
          if (
            groupName === "Changeover/Arrival Day" ||
            groupName === "Custom Amenities" ||
            groupName === "Complex groups"
          )
            return;
          if (!groupNames[groupName])
            groupNames[groupName] = { [amenityName]: 0 };
          if (!groupNames[groupName][amenityName])
            groupNames[groupName][amenityName] = 0;
          groupNames[groupName][amenityName] += 1;
        },
      );
    });

    return groupNames;
  };

  const amenitiesData = getAllOptions();
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-2 w-full border-b border-white text-center text-4xl text-white">
        Amenities
      </h2>
      <div className="grid grid-cols-2">
        {Object.keys(amenitiesData).map((groupName: string, index) => {
          return (
            <AmenityOptions
              key={index}
              options={amenitiesData[groupName]}
              groupName={groupName}
              clickHandler={clickHandler}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AmenitiesOptions;
