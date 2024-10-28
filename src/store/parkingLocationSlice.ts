import { createSlice } from "@reduxjs/toolkit";
import { IParkingLocations } from "../types/parking";

const initialState: IParkingLocations = {
  parkingLocations: [],
};

const store = createSlice({
  name: "parkingLocation",
  initialState,
  reducers: {
    setParkingLocation: (state, action) => {
      state.parkingLocations = action.payload;
    },
    clearParkingLocation: (state) => {
      state.parkingLocations = initialState.parkingLocations;
    },
  },
});

export default store.reducer;

export const { setParkingLocation, clearParkingLocation } = store.actions;
