import { FAKE_PARKING_LOCATIONS } from "../shared/constants/fakeParkingLocation";
import { FAKE_PARKING_ZONES } from "../shared/constants/fakeParkingZone";
import { IParkingLocation, IParkingZone } from "../types/parking";
import axios from "axios";
import { getAccessTokenFromCookie } from "./userService";

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

export const addNewParkingLocation = async (
  request: IAddNewParkingLocationRequest
): Promise<IAddNewParkingLocationResponse> => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const parkingLocationEndpoint =
    backEndUrl + import.meta.env.VITE_PARKING_LOCATION_URL;
  try {
    const response = await axios.post(parkingLocationEndpoint, request, {
      withCredentials: true,
      headers: {
        Authorization: getAccessTokenFromCookie(),
      },
    });
    return response.data as IAddNewParkingLocationResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
        ? (error.response?.data as IAddNewParkingLocationResponse)
        : {
            statusCode: error.response?.status || 500,
            message: error.message,
            success: false,
            errors: {
              summary: "An unexpected error occurred.",
            },
          };
    }

    return {
      statusCode: 500,
      message: "Internal server error. An unexpected error occurred.",
      success: false,
      errors: {
        summary: "An unexpected error occurred.",
      },
    };
  }
};

export interface IAddNewParkingLocationRequest {
  name: string;
  address: string;
  capacity: number;
  hourly_rate: number;
  monthly_rate: number;
  daily_rate: number;
}

export interface IAddNewParkingLocationResponse {
  statusCode: number;
  message: string;
  success: boolean;
  errors: IAddNewParkingLocationRequestError;
}

export interface IAddNewParkingLocationRequestError {
  summary?: string;
  name?: string;
  address?: string;
  capacity?: string;
  available_spaces?: string;
  monthly_rate?: string;
  hourly_rate?: string;
  daily_rate?: string;
}
