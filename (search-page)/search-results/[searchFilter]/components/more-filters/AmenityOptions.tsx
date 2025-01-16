import React, { MouseEventHandler } from "react";
import PropertyData from "../../interfaces/PropertyData";

function AmenityOptions({
  options,
  groupName,
  clickHandler,
}: {
  options: { any };
  groupName: string;
  clickHandler: MouseEventHandler<HTMLElement>;
}) {
  return (
    <div className={"mb-1 flex select-none flex-col bg-white p-2"}>
      <p className="pointer-events-none w-full border-b border-gray-300 font-bold">
        {groupName}
      </p>
      {Object.keys(options).map((amenityName: string) => {
        const name = amenityName + "-" + groupName + "-amenity";
        return (
          <div key={name} className="flex justify-start pl-1">
            <input
              type="checkbox"
              id={name}
              name={name}
              onClick={clickHandler}
            />
            <label htmlFor={name} className="select-none pl-1">
              {amenityName + ` (${options[amenityName]})`}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default AmenityOptions;
