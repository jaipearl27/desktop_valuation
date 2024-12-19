import { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
const MapComponent: React.FC<{
  initialLatitude: number;
  initialLongitude: number;
  isDraggable: boolean;
  mapTypeId: any | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ initialLatitude, initialLongitude, isDraggable, setOpen, setIsDraggable }) => {
  const [map, setMap] = useState<any>(null);
  const [markerPosition, setMarkerPosition] = useState<any>({
    lat: initialLatitude,
    lng: initialLongitude,
  });
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState<boolean>(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_YOUR_API_KEY,
  });

  const handleMapLoad = (map: any) => {
    setMap(map);
  };

  const handleMarkerDrag = (e: any) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleMapClick = (e: any) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleMarkerDragEnd = () => {
    setIsInfoWindowOpen(true);
  };

  const handleInfoWindowClose = () => {
    setIsInfoWindowOpen(false);
  };

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        zoom={5}
        center={{ lat: initialLatitude, lng: initialLongitude }}
        onLoad={handleMapLoad}
        onClick={handleMapClick}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
      >
        <Marker
          position={markerPosition}
          draggable={isDraggable}
          onDrag={handleMarkerDrag}
          onDragEnd={handleMarkerDragEnd}
        />
        {isInfoWindowOpen && (
          <InfoWindow
            position={markerPosition}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <p style={{ color: "black" }}>
                Click yes if the location is correct
              </p>
              <button
                style={{
                  backgroundColor: "#003F32",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  globalThis?.window?.localStorage.setItem('distance', '200')
                  setOpen(true)
                  handleInfoWindowClose()
                  setIsDraggable(false)
                }}
              >
                Yes
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
  ) : (
    <></>
  );
};

export default MapComponent;
