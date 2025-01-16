import AmenityData from "./AmenityData";

export default interface PropertyData {
  id: number;
  name: string;
  seoPageName: string;
  amenities: AmenityData;
  bathrooms: number;
  bedrooms: number;
  location: string;
  neighborhood: string;
  total: number;
  maxOccupants: number;
  longitude: number;
  latitude: number;
  photo: string; //thumbnail image
  isHidden: boolean;
  isHovered: boolean;
  rating: number;
}
