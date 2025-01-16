export default interface AmenityData {
  amenity: Array<{
    amenity_id: number;
    group_description: string;
    amenity_description: string;
    amenity_name: string;
    amenity_show_on_website: string;
    group_name: string;
  }>;
}
