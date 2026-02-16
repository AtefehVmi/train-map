import type { Station } from "../types/station";

type StationListProps = {
  stations: Station[];
  selectedStation: Station | null;
  onSelect: (station: Station) => void;
};

function StationList({
  stations,
  selectedStation,
  onSelect,
}: StationListProps) {
  if (stations.length === 0) {
    return <div className="text-red-500 font-medium">No stations found</div>;
  }

  return (
    <div className="overflow-y-auto h-150 border p-2 rounded-md">
      {stations.map((station) => (
        <div
          key={station.id}
          onClick={() => onSelect(station)}
          className={`p-2 cursor-pointer rounded transition ${
            selectedStation?.id === station.id
              ? "bg-blue-100"
              : "hover:bg-gray-200"
          }`}
        >
          <p className="font-semibold">{station.name}</p>
          <p className="text-sm text-gray-600">{station.city}</p>
        </div>
      ))}
    </div>
  );
}

export default StationList;
