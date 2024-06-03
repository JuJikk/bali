import { PropertiesDetailsList } from "@/models/basic";

export const findMatchingProperties = (
  properties: PropertiesDetailsList,
  searchTerm: string
): PropertiesDetailsList => {
  if (!searchTerm) {
    return properties;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return properties.filter((property) =>
    property.listing.title
      .toLowerCase()
      .split(" ")
      .some((word) => word.startsWith(lowerCaseSearchTerm))
  );
};
