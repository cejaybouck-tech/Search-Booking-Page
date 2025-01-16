import Property from "@/models/property";
import { connectToDB } from "@/utils/database";
import Filters from "../interfaces/Filters";
import FetchData from "@/utils/streamline-request/FetchData";
import StreamlinePropertyData from "../interfaces/StreamlinePropertyData";
import PropertyData from "../interfaces/PropertyData";
import tokens from "@/models/tokens";

async function getBasicInfo() {
  const properties = await Property.find(
    {},
    {
      _id: false,
      id: true,
      name: true,
      seoPageName: true,
      location: true,
      neighborhood: true,
      maxOccupants: true,
      longitude: true,
      latitude: true,
    },
  );
  return properties;
}

async function getAmenities() {
  const amenities = await Property.find(
    {},
    {
      _id: false,
      id: true,
      amenities: true, //
    },
  );
  return amenities;
}

async function getBathrooms() {
  const bathrooms = await Property.find(
    {},
    {
      _id: false,
      id: true,
      bathrooms: true,
    },
  );
  return bathrooms;
}

async function getBedrooms() {
  const bedrooms = await Property.find(
    {},
    {
      _id: false,
      id: true,
      bedrooms: true,
    },
  );
  return bedrooms;
}

async function getPhotos() {
  const photos = await Property.find(
    {},
    {
      _id: false,
      id: true,
      photos: true,
    },
  );
  return photos;
}

async function getRatings() {
  const reviews: unknown = await Property.find(
    {},
    {
      _id: false,
      id: true,
      reviews: true,
    },
  );
  return reviews as { id: string; reviews: { rating: number } };
}

export async function GetAllProperties() {
  await connectToDB();
  const [
    basicInfoPromise,
    amenitiesPromise,
    bathsPromise,
    bedsPromise,
    photosPromise,
    ratingsPromise,
  ] = await Promise.allSettled([
    getBasicInfo(),
    getAmenities(),
    getBathrooms(),
    getBedrooms(),
    getPhotos(),
    getRatings(),
  ]);

  const basicInfo =
    basicInfoPromise.status == "fulfilled" ? basicInfoPromise.value : [];
  const amenities =
    amenitiesPromise.status == "fulfilled" ? amenitiesPromise.value : [];
  const baths = bathsPromise.status == "fulfilled" ? bathsPromise.value : [];
  const beds = bedsPromise.status == "fulfilled" ? bedsPromise.value : [];
  const homesPhotos =
    photosPromise.status == "fulfilled" ? photosPromise.value : [];
  const ratings =
    ratingsPromise.status == "fulfilled" ? ratingsPromise.value : [];

  const newHomes = basicInfo.map((unit, index) => {
    if (unit.id === null) return null;
    const ratingNumber = getAverageRating(ratings[index].reviews);
    const home = {
      ...unit._doc,
      id: Number(unit.id),
      baths: baths[index].bathrooms,
      beds: beds[index].bedrooms,
      total: 0, //todo: replace with starting at price
      photo: homesPhotos[index].photos[0].thumbnail_path,
      isHidden: false,
      isHovered: false,
      amenities: amenities[index].amenities,
      rating: ratingNumber,
    };
    return home;
  });

  const final = newHomes.filter((unit) => unit !== null);
  return final;
}

function getAverageRating(reviews: Array<{ rating: number }>) {
  if (reviews.length < 1) return 0;
  const totalRating = reviews.reduce(
    (total, review) => total + review.rating,
    0,
  );
  return Math.floor(totalRating / reviews.length);
}

function convertToPropertyData(properties: Array<StreamlinePropertyData>) {
  const convertedHomes = properties.map((home: StreamlinePropertyData) => {
    const newHome: PropertyData = {
      id: Number(home.id),
      maxOccupants: Number(home.max_occupants),
      bedrooms: Number(home.bedrooms_number),
      bathrooms: Number(home.bathrooms_number),
      location: home.location_area_name,
      neighborhood: home.neighborhood_name,
      total: Number(home.total),
      latitude: home.latitude,
      longitude: home.longitude,
      amenities: home.unit_amenities,
      seoPageName: home.seo_page_name,
      name: home.name,
      photo: home.default_thumbnail_path,
      rating: home.rating_average,
      isHidden: false,
      isHovered: false,
    };
    return newHome;
  });
  return convertedHomes;
}

async function pullKeys() {
  await connectToDB();
  const keys = await tokens.findOne({
    name: "Tokens",
  });
  return keys;
}

export async function getAvailableHomes(filters: Filters) {
  const keys = await pullKeys();
  const requestBody = {
    methodName: "GetPropertyAvailabilityWithRatesWordPress",
    params: {
      token_key: "",
      token_secret: "",
      startdate: filters.startDate,
      enddate: filters.endDate,
      occupants: filters.occupants,
      show_additional_fees: 1,
      use_amenities: 1,
    },
  };

  try {
    const res = await FetchData.fetchFromStreamline(requestBody, keys);
    if (!res.data.available_properties) {
      console.log("Streamline Error: ");
      console.log(res);
      return [];
    }
    const properties = res.data.available_properties.property;
    const convertedHomes = convertToPropertyData(properties);
    return convertedHomes;
  } catch (error) {
    console.log("Error while fetching properties for bookings search");
    console.log(error);
    return [];
  }
}
