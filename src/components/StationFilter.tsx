type StationFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

function StationFilter({ value, onChange }: StationFilterProps) {
  return (
    <input
      type="text"
      placeholder="Filter by city..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-md w-64"
    />
  );
}

export default StationFilter;
