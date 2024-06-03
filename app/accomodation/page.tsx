import HeroSection from "@/components/home/HeroSection";
import Container from "@/components/container/Container";
import { PagePropertiesListings, PropertiesListings } from "@/models/basic";
import { getListing, getPropertiesDetails } from "@/utils/api";
import PropertyListings from "@/components/home/PropertyListings";

export default async function AccomodationPage() {
  const villasData: PagePropertiesListings = await getListing(
    "RENT",
    "USD",
    true,
    false,
    "VILLA"
  );
  const unfinishedConstructionData: PagePropertiesListings = await getListing(
    "RENT",
    "USD",
    true,
    false,
    "VILLA",
    true
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
    ...unfinishedConstructionData.content,
  ];

  const propertiesDetails = await getPropertiesDetails(
    propertyDataContent,
    false
  );

  return (
    <div className="pt-[133px] lg:pt-0">
      <HeroSection propertiesDetails={propertiesDetails} />
      <Container>
        <PropertyListings propertiesDetails={propertiesDetails} />
      </Container>
    </div>
  );
}
