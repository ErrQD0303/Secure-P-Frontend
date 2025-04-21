import { FAKE_PARKING_LOCATIONS } from "../shared/constants/fakeParkingLocation";
import { FAKE_PARKING_ZONES } from "../shared/constants/fakeParkingZone";
import { IParkingLocation, IParkingZone } from "../types/parking";
import axios from "axios";
import { getAccessTokenFromCookie } from "./userService";
import { ParkingLocationSortBy } from "../types/enum";
import { IGetAllResponseDto } from "../types/response";

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

export const getAllParkingLocations = async (
  request: IGetAllParkingLocationsRequest
): Promise<IGetAllParkingLocationsResponse> => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const parkingLocationEndpoint =
    backEndUrl + import.meta.env.VITE_PARKING_LOCATION_URL;
  try {
    const response = await axios.get(parkingLocationEndpoint, {
      withCredentials: true,
      headers: {
        Authorization: getAccessTokenFromCookie(),
      },
      params: {
        page: request.page,
        limit: request.limit,
        search: request.search,
        sort: request.sort,
        desc: request.desc,
      },
    });
    return response.data as IGetAllParkingLocationsResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
        ? (error.response?.data as IGetAllParkingLocationsResponse)
        : {
            statusCode: error.response?.status || 500,
            message: error.message,
            success: false,
            data: {
              items: [],
              total_pages: 0,
              total_items: 0,
            } as IGetAllParkingLocationResponseDto,
            errors: {
              summary: "An unexpected error occurred.",
            },
          };
    }

    return {
      statusCode: 500,
      message: "Internal server error. An unexpected error occurred.",
      success: false,
      data: {
        items: [],
        total_pages: 0,
        total_items: 0,
      } as IGetAllParkingLocationResponseDto,
      errors: {
        summary: "An unexpected error occurred.",
      },
    };
  }
};

export const deleteParkingLocation = async (
  request: IDeleteParkingLocationRequest
): Promise<IDeleteParkingLocationResponse> => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const parkingLocationEndpoint =
    backEndUrl + import.meta.env.VITE_PARKING_LOCATION_URL + "/" + request.id;
  try {
    const response = await axios.delete(parkingLocationEndpoint, {
      withCredentials: true,
      headers: {
        Authorization: getAccessTokenFromCookie(),
      },
    });
    return response.data as IDeleteParkingLocationResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
        ? (error.response?.data as IDeleteParkingLocationResponse)
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

export const getParkingLocationById = async (
  request: IGetParkingLocationByIdRequest
): Promise<IGetParkingLocationByIdResponse> => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const parkingLocationEndpoint =
    backEndUrl + import.meta.env.VITE_PARKING_LOCATION_URL + "/" + request.id;
  try {
    const response = await axios.get(parkingLocationEndpoint, {
      withCredentials: true,
      headers: {
        Authorization: getAccessTokenFromCookie(),
      },
    });
    return response.data as IGetParkingLocationByIdResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
        ? (error.response?.data as IGetParkingLocationByIdResponse)
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

export const updateParkingLocation = async (
  request: IUpdateParkingLocationRequest
): Promise<IUpdateParkingLocationResponse> => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const parkingLocationEndpoint =
    backEndUrl + import.meta.env.VITE_PARKING_LOCATION_URL + "/" + request.id;
  try {
    const response = await axios.put(parkingLocationEndpoint, request.body, {
      withCredentials: true,
      headers: {
        Authorization: getAccessTokenFromCookie(),
      },
    });
    return response.data as IUpdateParkingLocationResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
        ? (error.response?.data as IUpdateParkingLocationResponse)
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

export interface IUpdateParkingLocationRequest {
  id: string;
  body: IUpdateParkingLocationRequestBody;
}

export interface IUpdateParkingLocationRequestBody {
  name: string;
  address: string;
  parking_zones: IUpdateParkingLocationParkingZoneDto[];
  parking_rate_id: string | null;
  concurrency_stamp: string;
}

export interface IUpdateParkingLocationResponse {
  statusCode: number;
  message: string;
  success: boolean;
  errors: IUpdateParkingLocationRequestError;
}

export interface IUpdateParkingLocationRequestError {
  summary?: string;
  name?: string;
  address?: string;
  parking_rate_id?: string;
  parking_zones?: {
    [key: string]: IUpdateParkingLocationRequestParkingZoneError;
  };
  concurrency_stamp?: string;
}

export interface IUpdateParkingLocationRequestParkingZoneError {
  summary?: string;
  name?: string;
  capacity?: string;
  available_spaces?: string;
}

export interface IGetParkingLocationByIdRequest {
  id: string;
}

export interface IGetParkingLocationByIdResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data?: IGetParkingLocationDto;
  errors: IGetParkingLocationRequestError;
}

export interface IGetParkingLocationRequestError {
  summary?: string;
}

export interface IDeleteParkingLocationRequest {
  id: string;
}

export interface IDeleteParkingLocationResponse {
  statusCode: number;
  message: string;
  success: boolean;
  errors: IDeleteParkingLocationRequestError;
}

export interface IDeleteParkingLocationRequestError {
  summary?: string;
}

export interface IGetAllParkingLocationsRequest {
  page: number;
  limit: number;
  search?: string;
  sort?: ParkingLocationSortBy;
  desc?: boolean;
}

export interface IGetAllParkingLocationsResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: IGetAllParkingLocationResponseDto;
  errors: IGetAllParkingLocationRequestError;
}

export interface IGetAllParkingLocationRequestError {
  summary?: string;
}

export interface IGetAllParkingLocationResponseDto
  extends IGetAllResponseDto<IGetParkingLocationDto> {
  items: IGetParkingLocationDto[];
  total_pages: number;
  total_items: number;
}

export interface IGetParkingLocationDto {
  id: string;
  name: string;
  address: string;
  parking_zones: IGetParkingLocationParkingZoneDto[];
  parking_rate: IGetParkingLocationParkingRateDto;
  concurrency_stamp: string;
}

export interface IGetParkingLocationParkingZoneDto {
  id: string;
  name: string;
  capacity: number;
  available_spaces: number;
}

export interface IGetParkingLocationParkingRateDto {
  id: string;
  hourly_rate: number;
  daily_rate: number;
  monthly_rate: number;
}

export interface IUpdateParkingLocationParkingZonesObjectDto {
  [key: string]: IUpdateParkingLocationParkingZoneDto;
}

export interface IUpdateParkingLocationParkingZoneDto {
  id: string;
  name: string;
  capacity: number;
  available_spaces?: number;
}

export interface IAddNewParkingLocationParkingZoneDto {
  name: string;
  capacity: number;
  available_spaces?: number;
}

export interface IAddNewParkingLocationRequest {
  name: string;
  address: string;
  parking_zones: IAddNewParkingLocationParkingZoneDto[];
  parking_rate_id: string | null;
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
  parking_rate_id?: string;
  parking_zones?: {
    [key: string]: IAddNewParkingLocationRequestParkingZoneError;
  };
}

export interface IAddNewParkingLocationRequestParkingZoneError {
  name?: string;
  capacity?: string;
  available_spaces?: string;
}
