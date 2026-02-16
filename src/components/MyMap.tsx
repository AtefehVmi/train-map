import { useEffect, useMemo, useState } from "react";
import { fetchStations } from "../api/stations";
import type { Station } from "../types/station";

import StationFilter from "../components/StationFilter";
import StationList from "../components/StationList";
import StationsMap from "../components/StationsMap";

function MyMap() {
  const [stations, setStations] = useState<Station[]>([]);
  const [cityFilter, setCityFilter] = useState("");
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStations = async () => {
      try {
        setLoading(true);
        const data = await fetchStations();
        setStations(data);
      } catch {
        setError("Failed to load stations.");
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, []);

  const filteredStations = useMemo(() => {
    return stations.filter((station) =>
      station.city.toLowerCase().includes(cityFilter.toLowerCase())
    );
  }, [stations, cityFilter]);

  if (loading) return <div>Loading stations...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <StationFilter value={cityFilter} onChange={setCityFilter} />

      <div className="flex gap-4">
        <div className="w-1/3">
          <StationList
            stations={filteredStations}
            selectedStation={selectedStation}
            onSelect={setSelectedStation}
          />
        </div>

        <div className="w-2/3">
          <StationsMap
            className="h-150 w-full rounded-xl"
            stations={filteredStations}
            selectedStation={selectedStation}
          />
        </div>
      </div>
    </div>
  );
}

export default MyMap;
