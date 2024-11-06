import { createSlice } from "@reduxjs/toolkit";
import { IParking } from "../types/parking";
import { FAKE_PARKING_LOCATIONS } from "../shared/constants/fakeParkingLocation";
import { FAKE_PARKING_ZONES } from "../shared/constants/fakeParkingZone";
import { RootState } from "./store";

const initialState: IParking = {
  parkingLocations: FAKE_PARKING_LOCATIONS ?? [],
  parkingZones: FAKE_PARKING_ZONES ?? [],
};

const store = createSlice({
  name: "parking",
  initialState,
  reducers: {
    setParkingLocation: (state, action) => {
      state.parkingLocations = action.payload;
    },
    clearParkingLocation: (state) => {
      state.parkingLocations = initialState.parkingLocations;
    },
    setParkingZone: (state, action) => {
      state.parkingZones = action.payload;
    },
    clearParkingZone: (state) => {
      state.parkingZones = initialState.parkingZones;
    },
  },
});

export default store.reducer;

export const {
  setParkingLocation,
  clearParkingLocation,
  setParkingZone,
  clearParkingZone,
} = store.actions;

export const getParkingLocation = (id: string) => (state: RootState) =>
  state.parking.parkingLocations.find(({ id: elementId }) => id === elementId);

export const getParkingZone = (id: string) => (state: RootState) =>
  state.parking.parkingZones.find(({ id: elementId }) => id === elementId);
