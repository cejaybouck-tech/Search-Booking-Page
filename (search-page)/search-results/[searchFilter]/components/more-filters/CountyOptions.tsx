import React, { MouseEventHandler } from "react";
import PropertyData from "../../interfaces/PropertyData";

function CountyOptions({
  allHomes,
  clickHandler,
}: {
  allHomes: Array<PropertyData>;
  clickHandler: MouseEventHandler<HTMLElement>;
}) {
  const setCountyOptions = () => {
    const countyOptions = [];
    const countyElements = [];

    /* sort all rooms */
    allHomes.map((homeData) => {
      const optionName = !homeData.location ? "Other" : homeData.location;
      if (!countyOptions[optionName]) countyOptions[optionName] = [];
      countyOptions[optionName].push(homeData);
    });

    /* configure element information */
    for (const optionName in countyOptions) {
      countyElements.push({
        name: optionName + "-county",
        homes: countyOptions[optionName],
      });
    }
    return countyElements;
  };

  return (
    <div className={"mb-1 flex flex-col bg-white p-2"}>
      <p className="w-full border-b border-gray-300">Counties</p>
      {setCountyOptions().map((option: { name: string; homes: Array<any> }) => {
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
      })}
    </div>
  );
}

export default CountyOptions;
