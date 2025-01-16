import React, { MouseEvent, MouseEventHandler } from "react";
import PropertyData from "../../interfaces/PropertyData";

function BedroomOptions({
  allHomes,
  clickHandler,
}: {
  allHomes: Array<PropertyData>;
  clickHandler: MouseEventHandler<HTMLElement>;
}) {
  const setBedroomOptions = () => {
    const bedroomOptions = [];
    const bedroomElements = [];

    /* sort all rooms */
    allHomes.map((homeData) => {
      const optionName = homeData.bedrooms;
      if (!bedroomOptions[optionName]) bedroomOptions[optionName] = [];
      bedroomOptions[optionName].push(homeData);
    });

    /* configure element information */
    for (const optionName in bedroomOptions) {
      bedroomElements.push({
        name: optionName + " bedrooms",
        homes: bedroomOptions[optionName],
      });
    }

    return bedroomElements;
  };

  return (
    <div className={"mb-1 flex flex-col bg-white p-2"}>
      <p className="w-full border-b border-gray-300">Bedrooms</p>
      {setBedroomOptions().map(
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

export default BedroomOptions;
