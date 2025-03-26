import axios from "axios";
import { getAccessTokenFromCookie } from "./userService";

export const uploadAvatar = async (file: File): Promise<boolean> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const uploadAvatarUrl = backendUrl + import.meta.env.VITE_UPLOAD_AVATAR_URL;
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    await axios.post(uploadAvatarUrl, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getAccessTokenFromCookie(),
      },
    });

    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return false;
    }

    throw error;
  }
};
