import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
  LandDetailsList,
  LandListings,
  PropertiesDetailsList,
  PropertiesListings,
} from "@/models/basic";
import { getServerSession } from "next-auth";

const basicUrl = process.env.NEXT_PUBLIC_API_URL;

type GroupedPropertiesListings = {
  listingId: number;
  properties: PropertiesListings[];
};

function groupPropertiesByListingId(
  propertiesListings: PropertiesListings[]
): GroupedPropertiesListings[] {
  const grouped: { [key: number]: PropertiesListings[] } =
    propertiesListings.reduce((acc, item) => {
      const listingId = item.property.listingId;
      if (!acc[listingId]) {
        acc[listingId] = [];
      }
      acc[listingId].push(item);
      return acc;
    }, {} as { [key: number]: PropertiesListings[] });

  return Object.keys(grouped).map((listingId) => ({
    listingId: +listingId,
    properties: grouped[+listingId],
  }));
}

export async function getPropertiesDetails(
  propertiesListings: PropertiesListings[],
  isRevenue: boolean
): Promise<PropertiesDetailsList> {
  const groupedListings = groupPropertiesByListingId(propertiesListings);

  const session = isRevenue ? await getServerSession(authOptions) : null;
  const token = session?.accessToken;

  const detailsPromises = groupedListings.map(async (group) => {
    const fetchUrls = [
      `${basicUrl}/listings/public?id=${group.listingId}`,
      `${basicUrl}/constructions/public?listingId=${group.listingId}`,
      `${basicUrl}/images/public?listingId=${group.listingId}`,
    ];

    const fetchOptions = (url: string) => {
      if (token && url.includes("/revenues")) {
        return {
          headers: { Authorization: `Bearer ${token}` },
        };
      }
      return {};
    };

    const details = await Promise.all(
      fetchUrls.map((url) =>
        fetch(url, fetchOptions(url)).then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok, status: ${response.status}`
            );
          }
          return response.json();
        })
      )
    );

    let revenue = undefined;
    if (isRevenue && token) {
      try {
        const revenueResponse = await fetch(
          `${basicUrl}/revenues?propertiesId=${group.listingId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (revenueResponse.ok) {
          revenue = await revenueResponse.json();
        } else {
          console.error(`Error fetching revenue: ${revenueResponse.status}`);
        }
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    }

    const [listing, construction, images] = details;

    const properties = await Promise.all(
      group.properties.map((item) =>
        fetch(`${basicUrl}/properties/public?id=${item.property.propertiesId}`)
          .then((response) => response.json())
          .then((property) => ({
            ...item,
            property,
          }))
      )
    );

    return {
      listingId: group.listingId,
      firstContent: group.properties[0],
      properties: properties.map((p) => p.property),
      construction,
      listing,
      images,
      revenue,
    };
  });

  let propertiesDetails: PropertiesDetailsList;
  try {
    propertiesDetails = await Promise.all(detailsPromises);
  } catch (error) {
    console.error("Error fetching property details:", error);
    propertiesDetails = [];
  }

  return propertiesDetails;
}

export const fetchImages = async (listingId: number) => {
  try {
    const response = await fetch(`/api/proxy?listingId=${listingId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export async function getListing(
  listingType: string,
  currency: string,
  leasehold: boolean,
  freehold: boolean,
  propertyType?: string,
  unfinishedConstruction?: boolean
) {
  if (leasehold && freehold) {
    throw new Error(
      "Both leasehold and freehold cannot be true simultaneously."
    );
  }

  const params = new URLSearchParams({ currency });

  if (leasehold) {
    params.append("leasehold", "true");
  } else if (freehold) {
    params.append("freehold", "true");
  }

  if (propertyType) {
    params.append(propertyType.toLowerCase(), "true");
  }
  if (unfinishedConstruction) {
    params.append("equipment", "UNFINISHED_CONSTRUCTION");
  }

  const response = await fetch(
    `${basicUrl}/listings/public/${listingType.toLowerCase()}?${params.toString()}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

type GroupedLandListings = {
  listingId: number;
  lands: LandListings[];
};

function groupLandsByListingId(
  landListings: LandListings[]
): GroupedLandListings[] {
  const grouped: { [key: number]: LandListings[] } = landListings.reduce(
    (acc, item) => {
      const listingId = item.land.listingId;
      if (!acc[listingId]) {
        acc[listingId] = [];
      }
      acc[listingId].push(item);
      return acc;
    },
    {} as { [key: number]: LandListings[] }
  );

  return Object.keys(grouped).map((listingId) => ({
    listingId: +listingId,
    lands: grouped[+listingId],
  }));
}

export async function getLandDetails(
  landListings: LandListings[]
): Promise<LandDetailsList> {
  const groupedListings = groupLandsByListingId(landListings);

  const detailsPromises = groupedListings.map(async (group) => {
    const fetchUrls = [
      `${basicUrl}/listings/public?id=${group.listingId}`,
      `${basicUrl}/constructions/public?listingId=${group.listingId}`,
      `${basicUrl}/images/public?listingId=${group.listingId}`,
    ];

    const details = await Promise.all(
      fetchUrls.map((url) =>
        fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok, status: ${response.status}`
            );
          }
          return response.json();
        })
      )
    );

    const [listing, construction, images] = details;

    const lands = await Promise.all(
      group.lands.map((item) =>
        fetch(`${basicUrl}/properties/public?id=${item.land.propertiesId}`)
          .then((response) => response.json())
          .then((land) => ({
            ...item,
            land,
          }))
      )
    );

    return {
      listingId: group.listingId,
      firstContent: group.lands[0],
      lands: lands.map((l) => l.land),
      construction,
      listing,
      images,
    };
  });

  let landDetails: LandDetailsList;
  try {
    landDetails = await Promise.all(detailsPromises);
  } catch (error) {
    console.error("Error fetching land details:", error);
    landDetails = [];
  }

  return landDetails;
}

export async function getPropertiesDetailsFilter(
  propertiesListings: PropertiesListings[]
): Promise<PropertiesDetailsList> {
  const detailsPromises = propertiesListings.map(async (item) => {
    const fetchUrls = [
      `/get/api/properties/public?id=${item.property.propertiesId}`,
      `/get/api/constructions/public?listingId=${item.property.listingId}`,
      `/get/api/listings/public?id=${item.property.listingId}`,
      `/get/api/images/public?listingId=${item.property.listingId}`,
    ];

    const details = await Promise.all(
      fetchUrls.map((url) =>
        fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok, status: ${response.status}`
            );
          }
          return response.json();
        })
      )
    );

    return {
      listingId: item.property.listingId,
      firstContent: item,
      properties: details,
      construction: details[1],
      listing: details[2],
      images: details[3],
    };
  });

  let propertiesDetails: PropertiesDetailsList;
  try {
    propertiesDetails = await Promise.all(detailsPromises);
  } catch (error) {
    console.error("Error fetching property details:", error);
    propertiesDetails = [];
  }

  return propertiesDetails;
}

export async function getLandDetailsFilter(
  landListings: LandListings[]
): Promise<LandDetailsList> {
  const detailsPromises = landListings.map(async (item) => {
    const fetchUrls = [
      `/get/api/properties/public?id=${item.land.propertiesId}`,
      `/get/api/constructions/public?listingId=${item.land.listingId}`,
      `/get/api/listings/public?id=${item.land.listingId}`,
      `/get/api/images/public?listingId=${item.land.listingId}`,
    ];

    const details = await Promise.all(
      fetchUrls.map((url) =>
        fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok, status: ${response.status}`
            );
          }
          return response.json();
        })
      )
    );

    return {
      listingId: item.land.listingId,
      firstContent: item,
      lands: details[0],
      construction: details[1],
      listing: details[2],
      images: details[3],
    };
  });

  let landDetails: LandDetailsList;
  try {
    landDetails = await Promise.all(detailsPromises);
  } catch (error) {
    console.error("Error fetching land details:", error);
    landDetails = [];
  }

  return landDetails;
}

export const fetchUserData = async (token: string, cookie: string) => {
  const response = await fetch(`${basicUrl}/user`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      Cookie: cookie,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  return data;
};
