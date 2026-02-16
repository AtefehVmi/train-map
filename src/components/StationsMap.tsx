import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import type { Station } from "../types/station";

const germanyCenter: [number, number] = [51.1657, 10.4515];

type StationsMapProps = {
  stations: Station[];
  selectedStation: Station | null;
  className?: string;
};

function MapZoom({ station }: { station: Station | null }) {
  const map = useMap();

  useEffect(() => {
    if (station) {
      map.setView([station.lat, station.lng], 13, { animate: true });
    }
  }, [station, map]);

  return null;
}

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
