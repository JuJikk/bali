import Icon from "@/components/ui/Icon";
import TheButton from "@/components/ui/TheButton";
import TheInput from "@/components/ui/TheInput";
import { FormValues } from "@/models/formikModels";
import { FormikProps } from "formik";
import React, { FC, useEffect, useRef, useState } from "react";
import Modal from "../MapBoxModal";
import Map, { Marker, NavigationControl } from "react-map-gl";
const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type AddressSelectorProps = {
  formik: FormikProps<FormValues>;
};

const AddressSelector: FC<AddressSelectorProps> = ({ formik }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondaryModalOpen, setIsSecondaryModalOpen] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );

  const [viewport, setViewport] = useState({
    latitude: -8.409518,
    longitude: 115.188919,
    zoom: 9,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: -8.409518,
    longitude: 115.188919,
  });
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationType, setSelectedLocationType] = useState<
    "EXACT" | "GENERAL"
  >("EXACT");

  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const address = e.target.value;
    setInputValue(address);
    if (address.length === 0) {
      formik.setFieldValue("location", "");
    } else if (
      address.match(
        /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|(\d{1,2}))(\.\d+)?)$/
      )
    ) {
      const [latitude, longitude] = address
        .split(",")
        .map((coord) => parseFloat(coord.trim()));
      setMarkerPosition({ latitude, longitude });
      setViewport({ latitude, longitude, zoom: 12 });
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API_KEY}`
      );
      const data = await response.json();
      setLocationSuggestions(data.features);
    } else if (address.length > 2) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_API_KEY}`
      );
      const data = await response.json();
      setLocationSuggestions(data.features);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSuggestionClick = (place_name: string, center: number[]) => {
    setSelectedLocation(place_name);
    setInputValue(place_name);
    setViewport({
      latitude: center[1],
      longitude: center[0],
      zoom: 12,
    });
    setMarkerPosition({
      latitude: center[1],
      longitude: center[0],
    });
    setLocationSuggestions([]);
    setIsModalOpen(true);
  };

  const handleMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setMarkerPosition({
      latitude: lat,
      longitude: lng,
    });
    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          setSelectedLocation(data.features[0].place_name);
          setInputValue(data.features[0].place_name);
        }
      });
  };

  const handleOpenMap = async () => {
    if (selectedLocation) {
      const address = selectedLocation;
      const isCoordinates = address.match(
        /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|(\d{1,2}))(\.\d+)?)$/
      );
      if (isCoordinates) {
        const [longitude, latitude] = address
          .split(",")
          .map((coord) => parseFloat(coord.trim()));
        setMarkerPosition({ latitude, longitude });
        setViewport({ latitude, longitude, zoom: 12 });
        handleSuggestionClick(address, [longitude, latitude]);
      } else {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_API_KEY}`
        );
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const center = data.features[0].center;
          setMarkerPosition({ latitude: center[1], longitude: center[0] });
          setViewport({ latitude: center[1], longitude: center[0], zoom: 12 });
          handleSuggestionClick(address, center);
        }
      }
    } else {
      setViewport({
        latitude: -8.409518,
        longitude: 115.188919,
        zoom: 8,
      });
      setMarkerPosition({
        latitude: -8.409518,
        longitude: 115.188919,
      });
    }
    setIsModalOpen(true);
  };

  const handleSelectAddress = () => {
    setIsModalOpen(false);
    setIsSecondaryModalOpen(true);
  };

  const handleLocationTypeSelect = (type: "EXACT" | "GENERAL") => {
    setSelectedLocationType(type);
  };

  const handleCloseSecondModalAndSave = () => {
    formik.setFieldValue("location", selectedLocation);
    formik.setFieldValue("locationType", selectedLocationType);
    formik.setFieldValue("latitude", markerPosition.latitude.toString());
    formik.setFieldValue("longitude", markerPosition.longitude.toString());
    setIsSecondaryModalOpen(false);
  };

  const handleBlur = () => {
    if (!selectedLocation) {
      setInputValue("");
    }
  };

  const firstModalClose = () => {
    setInputValue(formik.values.location);
    setSelectedLocation(formik.values.location);
    setIsModalOpen(false);
  };

  const secondModalClose = () => {
    setInputValue(formik.values.location);
    setSelectedLocation(formik.values.location);
    setIsSecondaryModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setLocationSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMapStyle = () => {
    setMapStyle((prevStyle) =>
      prevStyle === "mapbox://styles/mapbox/streets-v12"
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/streets-v12"
    );
  };

  return (
    <>
      <div className="relative" ref={suggestionsRef}>
        <div className="absolute top-1/2 -translate-y-1/2 left-[18px] z-[2]">
          <Icon iconName="map2" fill="none" stroke="#292D32" width="16" />
        </div>
        <TheInput
          id="location"
          name="location"
          type="text"
          onBlur={handleBlur}
          placeholder="Add address or coordinates"
          onChange={handleAddressChange}
          value={inputValue}
          className="w-full pr-28 pl-11 body_xs placeholder-grays-500"
        />
        {formik.touched.location && formik.errors.location ? (
          <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.location}
          </div>
        ) : null}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-[18px] underline body_xs text-grays-900"
          onClick={handleOpenMap}
        >
          Select on map
        </button>
        {formik.touched.latitude && formik.errors.latitude ? (
          <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.latitude}
          </div>
        ) : null}
        {locationSuggestions.length > 0 && (
          <ul className="absolute bg-white rounded-2xl w-full mt-5 max-h-40 overflow-auto z-10 bg-grays-0 shadow-user-menu">
            {locationSuggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() =>
                  handleSuggestionClick(
                    suggestion.place_name,
                    suggestion.center
                  )
                }
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* MAP MODAL */}
      <Modal isOpen={isModalOpen} onClose={firstModalClose}>
        <div className="w-[900px]">
          <Map
            initialViewState={viewport}
            style={{ width: "100%", height: "600px" }}
            mapStyle={mapStyle}
            mapboxAccessToken={MAPBOX_API_KEY}
            onMove={(evt) => setViewport(evt.viewState)}
            onClick={handleMapClick}
          >
            <Marker
              latitude={markerPosition.latitude}
              longitude={markerPosition.longitude}
              offset={[0, -10]}
            >
              <div className="marker">
                {selectedLocationType === "EXACT" ? (
                  <Icon iconName="marker" width="48" height="55" />
                ) : (
                  <div className="bg-map-blue bg-opacity-30 border border-map-blue rounded-full w-[90px] h-[90px] "></div>
                )}
              </div>
            </Marker>
            <NavigationControl position="top-right" showCompass={false} />
          </Map>
          <button
            onClick={toggleMapStyle}
            className="absolute top-36 right-4 flex justify-center items-center rounded-2xl shadow-md bg-grays-0 w-[54px] h-[54px] hover:bg-[#f2f2f2]"
          >
            <Icon iconName="map" stroke="#3c3e3d" fill="none" width="18" />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-grays-0 max-w-[406px] w-full p-6 rounded-2xl shadow-user-menu flex flex-col gap-8 items-center">
            <p className="text-center mb-2">{selectedLocation}</p>
            <TheButton
              type="button"
              variant={!selectedLocation ? "disabled" : "primary"}
              onClick={handleSelectAddress}
              className="w-full"
              disabled={!selectedLocation}
            >
              Select this address
            </TheButton>
          </div>
        </div>
      </Modal>
      {/* SECONDARY MODAL */}
      <Modal isOpen={isSecondaryModalOpen} onClose={secondModalClose}>
        <div className="flex flex-col gap-4 w-[454px] bg-grays-0 p-6 rounded-2xl">
          <h3 className="heading_h6">
            Choose how location is shown on the map
          </h3>
          <div className="flex flex-col gap-3">
            <TheButton
              type="button"
              variant={
                selectedLocationType === "EXACT" ? "selected" : "notSelected"
              }
              onClick={() => handleLocationTypeSelect("EXACT")}
              className="flex flex-col !items-start gap-2"
            >
              <h6 className="heading_h6">Exact location (default)</h6>
              <p className="text-start body_xs text-grays-900">
                Indicate the precise location of your property on the map.
              </p>
            </TheButton>
            <TheButton
              type="button"
              variant={
                selectedLocationType === "GENERAL" ? "selected" : "notSelected"
              }
              onClick={() => handleLocationTypeSelect("GENERAL")}
              className="flex flex-col !items-start gap-2"
            >
              <h6 className="heading_h6">General location</h6>
              <p className="text-start body_xs text-grays-900">
                Show only the general area of this listing to anyone searching
                for a property.
              </p>
            </TheButton>
          </div>
          <Map
            initialViewState={viewport}
            style={{ width: "100%", height: "200px" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_API_KEY}
          >
            <Marker
              latitude={markerPosition.latitude}
              longitude={markerPosition.longitude}
              offset={[0, -10]}
            >
              <div className="marker">
                {selectedLocationType === "EXACT" ? (
                  <Icon iconName="marker" width="48" height="55" />
                ) : (
                  <div className="bg-map-blue bg-opacity-30 border border-map-blue rounded-full w-[90px] h-[90px] "></div>
                )}
              </div>
            </Marker>
            <NavigationControl position="top-right" />
          </Map>

          <TheButton
            type="button"
            onClick={handleCloseSecondModalAndSave}
            className=""
          >
            Save
          </TheButton>
        </div>
      </Modal>
    </>
  );
};

export default AddressSelector;
