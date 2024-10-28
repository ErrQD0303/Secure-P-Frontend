import { IParkingLocation } from "../../types/parking";

export const FAKE_PARKING_LOCATIONS: IParkingLocation[] = [
  {
    id: "1",
    name: "Downtown Parking",
    address: "123 Main St, Anytown, USA",
    capacity: 100,
    availableSpaces: 20,
    rates: {
      hourly: 2.5,
      daily: 20,
      monthly: 150,
    },
  },
  {
    id: "2",
    name: "Airport Parking",
    address: "456 Airport Rd, Anytown, USA",
    capacity: 200,
    availableSpaces: 50,
    rates: {
      hourly: 3,
      daily: 25,
      monthly: 200,
    },
  },
  {
    id: "3",
    name: "Mall Parking",
    address: "789 Shopping Blvd, Anytown, USA",
    capacity: 300,
    availableSpaces: 100,
    rates: {
      hourly: 1.5,
      daily: 15,
      monthly: 100,
    },
  },
];
