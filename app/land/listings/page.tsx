import Container from "@/components/container/Container";
import Listings from "@/components/listings/Listings";
import { PageLandListings } from "@/models/basic";
import { getLandDetails, getListing } from "@/utils/api";

const ListingsPage = async () => {
  const landData: PageLandListings = await getListing(
    "land",
    "USD",
    true,
    false
  );

  const landDataContent = [...landData.content];
  const landDetails = await getLandDetails(landDataContent);

  return (
    <Container restClasses="pt-[235px] lg:pt-0">
      <Listings landDetails={landDetails} />
    </Container>
  );
};

export default ListingsPage;
