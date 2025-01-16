import AmenityData from "./AmenityData";

export default interface StreamlinePropertyData {
  id: number;
  max_occupants: number;
  bedrooms_number: number;
  bathrooms_number: number;
  location_area_name: string;
  neighborhood_name: string;
  total: number;
  latitude: number;
  longitude: number;
  unit_amenities: AmenityData;
  seo_page_name: string;
  default_thumbnail_path: string;
  name: string;
  rating_average: number;
}
