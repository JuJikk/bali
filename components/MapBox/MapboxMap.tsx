import React, { useRef, useEffect, useState, FC } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { createRoot } from "react-dom/client";
import MarkerIcon from "./MarkerIcon";
import {
  LandDetails,
  LandDetailsList,
  Price,
  PropertiesDetails,
  PropertiesDetailsList,
} from "@/models/basic";
import ListingCardServer from "../home/ListingCard";
import ListingCardServerMobile from "../home/ListingCardMobile";
import LandListingCardServer from "../home/LandListingCard";
import LandListingCardServerMobile from "../home/LandListingCardMobile";
import { usePathname } from "next/navigation";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onCreated?(map: mapboxgl.Map): void;
  onLoaded?(map: mapboxgl.Map): void;
  onRemoved?(): void;
  propertyItems?: PropertiesDetailsList;
  landItems?: LandDetailsList;
  hoveredItemId: number | null;
  fullWidth?: boolean;
  center?: { latitude: number; longitude: number } | any;
  markerStyle?: "price" | "EXACT" | "GENERAL";
  enableUI?: boolean;
}

const MapboxMap: FC<MapboxMapProps> = ({
  initialOptions = {},
  onCreated,
  onLoaded,
  onRemoved,
  propertyItems,
  landItems,
  hoveredItemId,
  fullWidth,
  markerStyle,
  center = [115.16, -8.705],
  enableUI = true,
}) => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [markerColors, setMarkerColors] = useState<{ [id: string]: string }>(
    {}
  );
  const pathname = usePathname();
  const isAccomodation = pathname.startsWith("/accomodation");
  const mapNode = useRef(null);
  const markerRefs = useRef<{ [id: string]: mapboxgl.Marker }>({});

  const items =
    propertyItems && propertyItems?.length > 0
      ? propertyItems
      : landItems && landItems;

  useEffect(() => {
    if (items) {
      const colors = items.reduce((acc, item) => {
        acc[item.listingId] =
          item.listingId === hoveredItemId ? "#000000" : "#ffffff";
        return acc;
      }, {} as { [id: string]: string });
      setMarkerColors(colors);
    }
  }, [items, hoveredItemId, fullWidth]);

  useEffect(() => {
    const handleResize = () => {
      if (map) {
        map.resize();
      }
    };

    handleResize();
  }, [fullWidth, map]);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const validCenter = {
      latitude: isNaN(center.latitude) ? -8.705 : center.latitude,
      longitude: isNaN(center.longitude) ? 115.16 : center.longitude,
    };

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [validCenter.longitude, validCenter.latitude],
      zoom: 10.5,

      ...initialOptions,
    });

    mapboxMap.addControl(new mapboxgl.NavigationControl(), "top-right");

    setMap(mapboxMap);
    if (onCreated) onCreated(mapboxMap);

    if (onLoaded) mapboxMap.once("load", () => onLoaded(mapboxMap));

    return () => {
      mapboxMap.remove();
      setMap(undefined);
      if (onRemoved) onRemoved();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!map) return;

    const slowZoomIn = () => {
      map.zoomTo(map.getZoom() + 1, { duration: 1000 }); 
    };

    const slowZoomOut = () => {
      map.zoomTo(map.getZoom() - 1, { duration: 1000 });
    };

    const navControl = document.querySelector(
      ".mapboxgl-ctrl.mapboxgl-ctrl-group"
    );
    if (navControl) {
      const zoomInButton = navControl.children[0];
      const zoomOutButton = navControl.children[1];

      zoomInButton.removeEventListener("click", slowZoomIn);
      zoomOutButton.removeEventListener("click", slowZoomOut);

      zoomInButton.addEventListener("click", slowZoomIn);
      zoomOutButton.addEventListener("click", slowZoomOut);
    }

    return () => {
      const navControl = document.querySelector(
        ".mapboxgl-ctrl.mapboxgl-ctrl-group"
      );
      if (navControl) {
        const zoomInButton = navControl.children[0];
        const zoomOutButton = navControl.children[1];

        zoomInButton.removeEventListener("click", slowZoomIn);
        zoomOutButton.removeEventListener("click", slowZoomOut);
      }
    };
  }, [map]);

  useEffect(() => {
    if (!map || !items || Object.keys(markerColors).length === 0) return;

    items.forEach((item) => {
      const existingMarker = markerRefs.current[item.listingId];

      if (existingMarker) {
        updateMarker(existingMarker, item);
      } else {
        const marker = createAndAddMarker(item);
        markerRefs.current[item.listingId] = marker!;
      }
    });

    return () => {
      Object.keys(markerRefs.current).forEach((key) => {
        if (!items.find((item) => item.listingId.toString() === key)) {
          markerRefs.current[key].remove();
          delete markerRefs.current[key];
        }
      });
    };
    // eslint-disable-next-line
  }, [map, items, markerColors, hoveredItemId, fullWidth]);

  function updateMarker(
    marker: mapboxgl.Marker,
    item: PropertiesDetails | LandDetails
  ) {
    const color = markerColors[item.listingId];
    const markerElement = marker.getElement();
    if (markerElement) {
      const markerDiv = markerElement.querySelector("div");
      const markertext = markerElement.querySelector("p");
      const markerSign = markerElement.querySelector("span");
      if (markerDiv && markertext && markerSign) {
        markerDiv.style.backgroundColor = color;
        markertext.style.color = color === "#000000" ? "#ffffff" : "#000000";
        markerSign.style.color = color === "#000000" ? "#ffffff" : "#000000";
      }
    }
  }

  function createAndAddMarker(item: PropertiesDetails | LandDetails) {
    if (!map) return null;

    const getPrice = (prices: Price) => {
      return (
        prices.leaseholdPrice ??
        prices.freeholdPrice ??
        prices.yearlyPrice ??
        prices.monthlyPrice ??
        0
      );
    };

    const price = getPrice(item.firstContent.prices[0]);
    let customMarkerElement: HTMLElement | null = null;

    if (typeof price === "number") {
      customMarkerElement = createCustomMarker(price, item.listingId);
    } else {
      console.error("Invalid price value:", price);
      return null;
    }

    const longitude = parseFloat(item.listing.longitude);
    const latitude = parseFloat(item.listing.latitude);

    if (isNaN(longitude) || isNaN(latitude)) {
      return null;
    }

    const marker = new mapboxgl.Marker(customMarkerElement)
      .setLngLat([longitude, latitude])
      .addTo(map);

    attachPopup(item, marker);
    return marker;
  }

  const createCustomMarker = (price: number, id: number) => {
    const markerDiv = document.createElement("div");
    markerDiv.className = "marker";
    const root = createRoot(markerDiv);
    root.render(<MarkerIcon price={price} markerStyle={markerStyle} />);
    return markerDiv;
  };

  const attachPopup = (
    item: PropertiesDetails | LandDetails,
    marker: mapboxgl.Marker
  ) => {
    const popupNode = document.createElement("div");
    const root = createRoot(popupNode);

    if (window.innerWidth > 1024) {
      root.render(
        propertyItems && propertyItems?.length > 0 ? (
          <ListingCardServer
            isAccomodation={isAccomodation}
            item={item as PropertiesDetails}
          />
        ) : (
          <LandListingCardServer item={item as LandDetails} />
        )
      );
    } else {
      root.render(
        propertyItems && propertyItems?.length > 0 ? (
          <ListingCardServerMobile
            isAccomodation={isAccomodation}
            item={item as PropertiesDetails}
          />
        ) : (
          <LandListingCardServerMobile item={item as LandDetails} />
        )
      );
    }

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      maxWidth: "380px",
    }).setDOMContent(popupNode);
    popup.on("open", () => {
      marker.getElement()?.classList.add("marker--active");
    });

    popup.on("close", () => {
      marker.getElement()?.classList.remove("marker--active");
    });

    marker.setPopup(popup);
  };

  return (
    <>
      <div ref={mapNode} className="h-full w-full" />
    </>
  );
};

export default MapboxMap;
