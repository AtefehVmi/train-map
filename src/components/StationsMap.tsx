import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import type { Station } from "../types/station";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue (especially on mobile / deployment)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const germanyCenter: LatLngExpression = [51.1657, 10.4515];

type StationsMapProps = {
  stations: Station[];
  selectedStation: Station | null;
  className?: string;
};

// Component to zoom map to a selected station
function MapZoom({ station }: { station: Station | null }) {
  const map = useMap();

  useEffect(() => {
    if (station) {
      map.setView([station.lat, station.lng], 13, { animate: true });
    }
  }, [station, map]);

  return null;
}

// Main map component
function StationsMap({
  stations,
  selectedStation,
  className,
}: StationsMapProps) {
  return (
    <MapContainer center={germanyCenter} zoom={6} className={className}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {stations.map((station) => (
        <Marker key={station.id} position={[station.lat, station.lng]}>
          <Popup>
            <div>
              <h3 className="font-semibold">{station.name}</h3>
              <p>{station.city}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      <MapZoom station={selectedStation} />
    </MapContainer>
  );
}

export default StationsMap;
