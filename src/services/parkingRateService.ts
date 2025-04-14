import axios from "axios";
import { ParkingRateSortBy } from "../types/enum";
import { IGetAllResponseDto } from "../types/response";
import { getAccessTokenFromCookie } from "./userService";

export const getAllParkingRates = async (
  request: IGetAllParkingRatesRequest
): Promise<IGetAllParkingRatesResponse> => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const parkingLocationEndpoint =
    backEndUrl + import.meta.env.VITE_PARKING_RATE_URL;
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
    return response.data as IGetAllParkingRatesResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
        ? (error.response?.data as IGetAllParkingRatesResponse)
        : {
            statusCode: error.response?.status || 500,
            message: error.message,
            success: false,
            data: {
              items: [],
              total_pages: 0,
              total_items: 0,
            } as IGetAllParkingRatesResponseDto,
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
      } as IGetAllParkingRatesResponseDto,
      errors: {
        summary: "An unexpected error occurred.",
      },
    };
  }
};

export interface IGetAllParkingRatesRequest {
  page: number;
  limit?: number;
  search?: string;
  sort?: ParkingRateSortBy;
  desc?: boolean;
}

export interface IGetAllParkingRatesResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: IGetAllParkingRatesResponseDto;
  errors: IGetAllParkingRatesRequestError;
}

export interface IGetAllParkingRatesRequestError {
  summary?: string;
}

export interface IGetAllParkingRatesResponseDto
  extends IGetAllResponseDto<IGetParkingRatesDto> {
  items: IGetParkingRatesDto[];
  total_pages: number;
  total_items: number;
}

export interface IGetParkingRatesDto {
  id: string;
  hourly_rate: number;
  daily_rate: number;
  monthly_rate: number;
  concurrency_stamp: string;
}
