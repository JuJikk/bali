import Container from "@/components/container/Container";
import Listings from "@/components/listings/Listings";
import { PagePropertiesListings, PropertiesListings } from "@/models/basic";
import { getListing, getPropertiesDetails } from "@/utils/api";

const ListingsPage = async () => {
  const villasData: PagePropertiesListings = await getListing(
    "SALE",
    "USD",
    true,
    false,
    "VILLA"
  );

  const unfinishedConstructionData: PagePropertiesListings = await getListing(
    "SALE",
    "USD",
    true,
    false,
    "VILLA",
    true
  );

  const apartmentsData: PagePropertiesListings = await getListing(
    "SALE",
    "USD",
    false,
    true,
    "APARTMENT"
  );

  const propertyDataContent: PropertiesListings[] = [
    ...villasData.content,
    ...apartmentsData.content,
    ...unfinishedConstructionData.content,
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

export default ListingsPage;
