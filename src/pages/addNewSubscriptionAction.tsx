import dayjs from "dayjs";
import { LoaderFunctionArgs } from "react-router-dom";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  IUserParkingSubscriptionError,
  IUserParkingSubscriptionRequest,
} from "../services/userService";
import { validateUserParkingSubscription } from "../services/modelValidateService";
import { isAddNewUserParkingSubscritionException } from "../shared/helpers/errors";

// Removed redundant dayjs.extend(customParseFormat);

const action = async ({ request }: LoaderFunctionArgs) => {
  if (request.method !== "POST") {
    return null;
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as {
    "product-type": string;
    "parking-location": string;
    "parking-zone": string;
    startDate: string;
    endDate: string;
    changeSignageFee: string;
    clampingFee: string;
  };

  dayjs.extend(customParseFormat);
  const startDate = typeof data?.startDate === "string" ? data.startDate : "";
  const endDate = typeof data?.endDate === "string" ? data.endDate : "";

  const subscriptionRequestModel = {
    product_type: +data["product-type"],
    parking_location: data["parking-location"],
    parking_zone: data["parking-zone"],
    start_date: dayjs(startDate, "DD/MM/YYYY HH:mm").toDate(),
    end_date: dayjs(endDate, "DD/MM/YYYY HH:mm").toDate(),
    change_signage_fee: data["changeSignageFee"] === "on",
    clamping_fee: data["clampingFee"] === "on",
  } as unknown as IUserParkingSubscriptionRequest;

  try {
    validateUserParkingSubscription(subscriptionRequestModel);
  } catch (error: unknown) {
    if (isAddNewUserParkingSubscritionException(error)) {
      return {
        statusCode: 400,
        success: false,
        message: error.message,
        errors: error.errors as IUserParkingSubscriptionError,
      };
    }

    return {
      statusCode: 500,
      success: false,
      message: "An unexpected error occurred",
      errors: {
        summary: "An unexpected error occurred",
      },
    };
  }

  return {
    statusCode: 200,
    success: true,
    message: "Subscription request created successfully",
  };
};

export default action;
