"use client";

import MobileCalendar from "@/utils/calendar/MobileCalendar";
import React, { useContext, useEffect, useId, useState } from "react";
import Filters from "../interfaces/Filters";
import { transitionRoute } from "@/utils/page-transitions/TransitionWithoutLink";
import { usePathname, useRouter } from "next/navigation";
import { ShowFilters } from "./SearchView";

function FiltersBar({ defaultFilters }: { defaultFilters: Filters }) {
  const id = useId();
  const router = useRouter();
  const [calOpen, setCalOpen] = useState(false);
  const { showFilters, setShowFilters } = useContext(ShowFilters);
  const [hideBar, setHideBar] = useState(false);
  const pathName = usePathname();

  const handleHideBar = () => {
    const isHidden = hideBar;
    setHideBar(!isHidden);
  };

  const handleInputClick = () => {
    const isOpen = calOpen;
    setCalOpen(!isOpen);
  };

  const handleDepartureSet = (e) => {
    const value = e.target.value;
    if (value === "") return;
    setCalOpen(false);
  };

  const handleUpdateClick = () => {
    const guestAmountElement = document.getElementById(
      `${id}-guests`,
    ) as HTMLInputElement;
    const startDateElement = document.getElementById(
      `${id}-bookArrivalDate`,
    ) as HTMLInputElement;
    const endDateElement = document.getElementById(
      `${id}-bookDepartureDate`,
    ) as HTMLInputElement;

    const guestAmount = guestAmountElement.value;
    const sd = startDateElement.value;
    const ed = endDateElement.value;
    if (
      sd === defaultFilters.startDate.replaceAll("-", "/") &&
      ed === defaultFilters.endDate.replaceAll("-", "/") &&
      guestAmount === defaultFilters.occupants.toString()
    )
      return;

    const href = `/search-results/sd=${sd.replaceAll("/", "-")}&ed=${ed.replaceAll("/", "-")}&guests=${guestAmount}`;
    transitionRoute(href, router, "page-transition-blur", false, pathName);
  };

  const openMoreFilters = () => {
    const newShowFilters = !showFilters;
    setShowFilters(newShowFilters);
  };

  function initializeInputs(filters: Filters, id: string) {
    if (!filters || !filters.startDate || !filters.endDate) return;

    const startInput = document.getElementById(
      `${id}-bookArrivalDate`,
    ) as HTMLInputElement;
    startInput.value = filters.startDate.replaceAll("-", "/");

    const endInput = document.getElementById(
      `${id}-bookDepartureDate`,
    ) as HTMLInputElement;
    endInput.value = filters.endDate.replaceAll("-", "/");

    const guestsInput = document.getElementById(
      `${id}-guests`,
    ) as HTMLInputElement;
    guestsInput.value = filters.occupants.toString();
  }

  useEffect(() => {
    const endInput = document.getElementById(
      `${id}-bookDepartureDate`,
    ) as HTMLInputElement;
    endInput.onchange = handleDepartureSet;
    initializeInputs(defaultFilters, id);
  }, [defaultFilters, id]);

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center bg-white">
      <div className="flex h-full w-full flex-col items-center justify-center border-b border-gray-500 p-3 md:flex-row md:border-none">
        <form className="w-auto md:flex">
          <input
            type="text"
            placeholder="Arrival"
            name="sd"
            id={`${id}-bookArrivalDate`}
            size={8}
            onClick={handleInputClick}
            className="arrivalDate mb-1 w-full rounded-full border border-r-0 border-gray-600 p-2 text-center md:rounded-l-full"
          />

          <input
            type="text"
            placeholder="Departure"
            name="ed"
            id={`${id}-bookDepartureDate`}
            size={8}
            onClick={handleInputClick}
            className="departureDate mb-1 w-full rounded-full border border-gray-600 p-2 text-center md:mr-2 md:rounded-r-full"
          />
          <input
            type="number"
            placeholder="Guests"
            name="guests"
            id={`${id}-guests`}
            size={3}
            max="99"
            className="mb-1 w-full rounded-full border border-gray-600 p-2 px-0 text-center md:mr-2 md:w-auto"
          />
        </form>
        <div>
          <button
            onClick={handleUpdateClick}
            className="mb-1 h-full rounded-full border border-gray-600 bg-red-700 p-2 text-center text-white hover:border-white md:mr-2 md:mt-0"
          >
            Update
          </button>
          <button
            onClick={openMoreFilters}
            className="mb-1 h-full rounded-full border border-gray-600 bg-white p-2 text-center text-black hover:bg-red-700 hover:text-white md:mt-0"
          >
            More Filters
          </button>
        </div>
      </div>

      {/* calendar */}
      <div
        className={`absolute z-50 mt-[20rem] flex-col items-center justify-center ${calOpen ? "flex" : "hidden"}`}
      >
        <MobileCalendar blockedDates={[]} prices={[]}></MobileCalendar>
      </div>
    </div>
  );
}

export default FiltersBar;
