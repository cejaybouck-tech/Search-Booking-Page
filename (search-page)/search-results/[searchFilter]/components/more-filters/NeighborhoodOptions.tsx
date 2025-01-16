import React, { MouseEventHandler } from "react";
import PropertyData from "../../interfaces/PropertyData";

function NeighborhoodOptions({
  allHomes,
  clickHandler,
}: {
  allHomes: Array<PropertyData>;
  clickHandler: MouseEventHandler<HTMLElement>;
}) {
  const setNeighborhoodOptions = () => {
    const neighborhoodOptions = [];
    const neighborhoodElements = [];

    /* sort all rooms */
    allHomes.map((homeData) => {
      const optionName = homeData.neighborhood;
      if (!neighborhoodOptions[optionName])
        neighborhoodOptions[optionName] = [];
      neighborhoodOptions[optionName].push(homeData);
    });

    /* configure element information */
    for (const optionName in neighborhoodOptions) {
      neighborhoodElements.push({
        name: optionName + "-neighborhood",
        homes: neighborhoodOptions[optionName],
      });
    }
    return neighborhoodElements;
  };

  return (
    <div className={"mb-1 flex select-none flex-col bg-white p-2"}>
      <p className="pointer-events-none w-full border-b border-gray-300">
        Neighborhoods
      </p>
      {setNeighborhoodOptions().map(
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
                {option.name.split("-")[0] + ` (${option.homes.length})`}
              </label>
            </div>
          );
        },
      )}
    </div>
  );
}

export default NeighborhoodOptions;
