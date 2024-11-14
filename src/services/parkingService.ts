import { FAKE_PARKING_LOCATIONS } from "../shared/constants/fakeParkingLocation";
import { FAKE_PARKING_ZONES } from "../shared/constants/fakeParkingZone";
import { IParkingLocation, IParkingZone } from "../types/parking";

export const fetchUpdatedParkingLocations = async (
  parkingLocations: string | null = null
): Promise<IParkingLocation[]> => {
  // Replace this with your actual async logic to fetch updated parking locations
  return parkingLocations && parkingLocations.length > 0
    ? FAKE_PARKING_LOCATIONS.filter((pl) =>
        pl.name.match(new RegExp(parkingLocations, "g"))
      )
    : FAKE_PARKING_LOCATIONS;
};

export const fetchUpdatedParkingZones = async (
  parkinglocationId: string | undefined | null,
  parkingZones: string | null = null
): Promise<IParkingZone[]> => {
  // Replace this with your actual async logic to fetch updated parking locations
  if (!parkinglocationId) {
    return [];
  }
  return parkingZones && parkingZones.length > 0
    ? FAKE_PARKING_ZONES.filter(
        (pz) =>
          pz.parkingLocationId === parkinglocationId &&
          pz.name.match(new RegExp(parkingZones, "g"))
      )
    : FAKE_PARKING_ZONES.filter(
        (pz) => pz.parkingLocationId === parkinglocationId
      );
};
