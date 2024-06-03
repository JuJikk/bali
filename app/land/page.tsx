import HeroSection from "@/components/home/HeroSection";
import Container from "@/components/container/Container";
import { PageLandListings } from "@/models/basic";
import { getLandDetails, getListing } from "@/utils/api";
import LandListing from "@/components/home/LandListing";

export default async function LandPage() {
  const landData: PageLandListings = await getListing(
    "land",
    "USD",
    true,
    false
  );

  const landDataContent = [...landData.content];
  const landDetails = await getLandDetails(landDataContent);

  return (
    <div className="pt-[133px] lg:pt-0">
      <HeroSection landDetails={landDetails} />

      <Container>
        <LandListing landDetails={landDetails} />
      </Container>
    </div>
  );
}
