import Container from "@/components/container/Container";
import Listings from "@/components/listings/Listings";
import { PagePropertiesListings, PropertiesListings } from "@/models/basic";
import { getListing, getPropertiesDetails } from "@/utils/api";

const AccomodationListingsPage = async () => {
  const villasData: PagePropertiesListings = await getListing(
    "RENT",
    "USD",
    true,
    false,
    "VILLA"
  );
  const apartmentsData: PagePropertiesListings = await getListing(
    "RENT",
    "USD",
    false,
    true,
    "APARTMENT"
  );

  const propertyDataContent: PropertiesListings[] = [
    ...villasData.content,
    ...apartmentsData.content,
  ];

  const propertiesDetails = await getPropertiesDetails(
    propertyDataContent,
    false
  );

  return (
    <Container restClasses="pt-[235px] lg:pt-0">
      <Listings propertiesDetails={propertiesDetails} />
    </Container>
  );
};

export default AccomodationListingsPage;
