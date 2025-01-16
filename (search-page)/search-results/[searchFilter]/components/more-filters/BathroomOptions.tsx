import React, { MouseEventHandler } from "react";
import PropertyData from "../../interfaces/PropertyData";

function BathroomOptions({
  allHomes,
  clickHandler,
}: {
  allHomes: Array<PropertyData>;
  clickHandler: MouseEventHandler<HTMLElement>;
}) {
  const setBathroomOptions = () => {
    const bathroomOptions = [];
    const bedroomElements = [];

    /* sort all rooms */
    allHomes.map((homeData) => {
      const optionName = homeData.bathrooms;
      if (!bathroomOptions[optionName]) bathroomOptions[optionName] = [];
      bathroomOptions[optionName].push(homeData);
    });

    /* configure element information */
    for (const optionName in bathroomOptions) {
      bedroomElements.push({
        name: optionName + " bathrooms",
        homes: bathroomOptions[optionName],
      });
    }
    return bedroomElements;
  };

  return (
    <div className={"mb-1 flex flex-col bg-white p-2"}>
      <p className="w-full border-b border-gray-300">Bathrooms</p>
      {setBathroomOptions().map(
        (option: { name: string; homes: Array<any> }) => {
          return (
            <div key={option.name} className="flex justify-start pl-1">
              <input
                type="checkbox"
                id={option.name}
                name={option.name}
                onClick={clickHandler}
              />
              <label htmlFor={option.name} className="select-none pl-1">
                {option.name + ` (${option.homes.length})`}
              </label>
            </div>
          );
        },
      )}
    </div>
  );
}

export default BathroomOptions;
