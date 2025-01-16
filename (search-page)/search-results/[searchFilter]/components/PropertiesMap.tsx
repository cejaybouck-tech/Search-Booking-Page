"use client";

import React, { useContext } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MarkerInfo } from "../interfaces/MarkerInfo";
import CustomPin from "./CustomPin";
import { VisibleAmount, VisibleProperties } from "./SearchView";
import PropertyData from "../interfaces/PropertyData";

const defaultMapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultMapCenter = {
  lat: 37.099768,
  lng: -113.54,
};

const defaultMapZoom = 11;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
};

function PropertiesMap({
  mapDetails,
}: {
  mapDetails?: { center: { lat: number; lng: number }; zoom };
}) {
  const { visibleProperties } = useContext(VisibleProperties);
  const { visibleAmount } = useContext(VisibleAmount);

  return (
    <div className="hidden h-full w-full overflow-x-hidden md:flex md:justify-center md:border-t md:border-gray-600">
      {typeof window !== "undefined" && window.innerWidth < 768 ? (
        ""
      ) : (
        <div className="w-full">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <Map
              mapId="unit-map"
              style={defaultMapContainerStyle}
              defaultCenter={!mapDetails ? defaultMapCenter : mapDetails.center}
              defaultZoom={!mapDetails ? defaultMapZoom : mapDetails.zoom}
              gestureHandling={"auto"}
            >
              {visibleProperties
                .slice(0, visibleAmount)
                .map((homeData: PropertyData, index) => {
                  const position = {
                    lat: Number(homeData.latitude),
                    lng: Number(homeData.longitude),
                  };
                  return Number.isNaN(position.lat) ||
                    Number.isNaN(position.lng) ? (
                    ""
                  ) : (
                    <AdvancedMarker
                      key={index + "-map-pin"}
                      position={position}
                    >
                      <CustomPin
                        price={homeData.total}
                        homeId={homeData.id}
                      ></CustomPin>
                    </AdvancedMarker>
                  );
                })}
            </Map>
          </APIProvider>
        </div>
      )}
    </div>
  );
}

export default PropertiesMap;
