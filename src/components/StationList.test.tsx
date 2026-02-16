import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import StationList from "./StationList";
import { expect, test } from "vitest";

const mockStations = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 1, lng: 1 },
  { id: 2, name: "Munich Hbf", city: "Munich", lat: 1, lng: 1 },
];

test("renders stations", () => {
  render(
    <StationList
      stations={mockStations}
      selectedStation={null}
      onSelect={() => {}}
    />
  );

  expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();
  expect(screen.getByText("Munich Hbf")).toBeInTheDocument();
});
