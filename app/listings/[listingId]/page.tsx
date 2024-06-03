import Property from "@/components/home/properties/Property";
import { PagePropertiesListings, PropertiesListings } from "@/models/basic";
import { getListing, getPropertiesDetails } from "@/utils/api";

export default async function Listing({
  params,
}: {
  params: { listingId: string };
}) {
  const { listingId } = params;
  const villasData: PagePropertiesListings = await getListing(
    "SALE",
    "USD",
    true,
    false,
    "VILLA"
  );
  const apartmentsData: PagePropertiesListings = await getListing(
    "SALE",
    "USD",
    true,
    false,
    "APARTMENT"
  );

  const propertyDataContent: PropertiesListings[] = [
    ...villasData.content,
    ...apartmentsData.content,
  ];

  const propertiesDetails = await getPropertiesDetails(
    propertyDataContent,
    true
  );

  const propertyDetails = propertiesDetails.find(
    (el) => String(el.firstContent.property.listingId) === String(listingId)
  );

  return (
    <div className="pt-[133px] lg:pt-0">
       <Property propertyDetails={propertyDetails!} />
    </div>
  );
}
