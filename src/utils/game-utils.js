import { fleetPositions } from "./fleet-positions";
import { createFleet } from "./ui-utils";

export function randomlyPlaceFleet() {
  const fleet = createFleet();
  const fleetPos =
    fleetPositions[Math.floor(Math.random() * fleetPositions.length)];
  for (let i = fleet.length - 1; i >= 0; i--) {
    fleet[i].setStart(fleetPos[i].start);
    fleet[i].setEnd(fleetPos[i].end);
  }
  return fleet;
}
