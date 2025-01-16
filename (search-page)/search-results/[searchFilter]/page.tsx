import React from "react";
import { GetAllProperties, getAvailableHomes } from "./utils/GetProperties";
import Filters from "./interfaces/Filters";
import SearchView from "./components/SearchView";
import Loader from "@/app/(main-page)/components/nav-bar/Loader";

import Logo from "@/public/logo.png";

export const dynamic = "force-dynamic";

const title = `vacation rentals in st george utah | Redsands Vacations`;
const desc =
  "Explore rentals in St. George, Utah with Redsands Vacations! Enjoy a range of properties for every occasion, paired with exceptional service and local expertise.";
export const metadata = {
  title: title,
  description: desc,
  keywords: `rentals in St. George, St. George vacation rentals, Redsands Vacations, St. George accommodations, vacation homes St. George, family-friendly rentals, luxury rentals Utah, rental properties St. George, outdoor adventure rentals, book St. George rentals`,
  openGraph: {
    title: title,
    description: desc,
    image: Logo,
    siteName: "Redsands Vacations",
    type: "website",
    url: process.env.NEXTAUTH_URL + "/search-results",
  },
  twitter: {
    card: "summary_large_image",
    title: "@redsands_1",
    description: desc,
    creator: "@redsands_1",
    images: [Logo],
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL),
  alternates: {
    canonical: "/search-results",
  },
};

function initialSearch(searchFilter: string) {
  const rawParam = searchFilter.split("%26");
  const filters: Filters = { startDate: "", endDate: "", occupants: 1 };
  filters.startDate = rawParam[0].split("%3D")[1].replaceAll("-", "/");
  filters.endDate = rawParam[1].split("%3D")[1].replaceAll("-", "/");
  filters.occupants = Number(rawParam[2].split("%3D")[1]);

  return filters as Filters;
}

function isDefaultPage(filters: Filters) {
  if (filters.startDate === "" || filters.endDate === "") return true;
  return false;
}

async function page({ params }: { params: { searchFilter: string } }) {
  const filters = initialSearch(params.searchFilter);
  const isDefault = isDefaultPage(filters);

  const homes = isDefaultPage(filters)
    ? await GetAllProperties()
    : await getAvailableHomes(filters);
  return (
    <div className="relative flex h-screen items-center justify-center pt-24">
      <SearchView homes={homes} defaultFilters={filters} />
    </div>
  );
}

export default page;
