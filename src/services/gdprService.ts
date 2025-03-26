import axios from "axios";

export const acceptGDPR = async (): Promise<boolean> => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const gdprEndpoint = backEndUrl + import.meta.env.VITE_ACCEPT_GDPR_URL;

  try {
    axios.get(gdprEndpoint, {
      withCredentials: true,
    });

    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return false;
    }

    throw error;
  }
};
