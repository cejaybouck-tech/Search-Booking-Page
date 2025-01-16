import React from "react";
import { GetAllProperties } from "./[searchFilter]/utils/GetProperties";
import SearchView from "./[searchFilter]/components/SearchView";

import Logo from "@/public/logo.png";

export const revalidate = 600;

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

async function page() {
  const filters = { startDate: "", endDate: "", occupants: 1 };
  const homes = await GetAllProperties();
  return (
    <div className="flex h-screen items-center justify-center pt-24">
      <h1 className="hidden">Search Vacation Rentals in St George</h1>
      <SearchView homes={homes} defaultFilters={filters} />
    </div>
  );
}

export default page;
