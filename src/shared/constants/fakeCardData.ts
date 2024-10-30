import { ISubscriptionCard } from "../../types/subscription";

export const FAKE_CARDS: ISubscriptionCard[] = [
  {
    id: "1",
    expireDate: new Date("2024-10-29 18:00:00"),
    licensePlate: "50F.18577",
    parkingZone: "Hall 15",
    parkingLocation: "No. 3 Jalan Pjs 11/15, Petaling Jaya 46150 Malaysia",
    isPaid: true,
  },
  {
    id: "2",
    expireDate: new Date("2023-12-15 12:00:00"),
    licensePlate: "60A.12345",
    parkingZone: "Hall 10",
    parkingLocation: "No. 5 Jalan Pjs 11/20, Petaling Jaya 46150 Malaysia",
    isPaid: false,
  },
  {
    id: "3",
    expireDate: new Date("2025-01-20 08:30:00"),
    licensePlate: "70B.67890",
    parkingZone: "Hall 5",
    parkingLocation: "No. 7 Jalan Pjs 11/25, Petaling Jaya 46150 Malaysia",
    isPaid: true,
  },
  {
    id: "4",
    expireDate: new Date("2024-07-10 14:45:00"),
    licensePlate: "80C.54321",
    parkingZone: "Hall 20",
    parkingLocation: "No. 9 Jalan Pjs 11/30, Petaling Jaya 46150 Malaysia",
    isPaid: false,
  },
];
