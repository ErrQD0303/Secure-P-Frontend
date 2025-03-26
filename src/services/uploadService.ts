import axios from "axios";
import { getAccessTokenFromCookie } from "./userService";

export const uploadAvatar = async (file: File): Promise<string | null> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const uploadAvatarUrl = backendUrl + import.meta.env.VITE_UPLOAD_AVATAR_URL;
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axios.post(uploadAvatarUrl, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getAccessTokenFromCookie(),
      },
    });

    return (response.data as IUploadAvatarResponse)?.avatarUrl ?? null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return null;
    }

    throw error;
  }
};

interface IUploadAvatarResponse {
  statusCode: number;
  success: boolean;
  message: string;
  avatarUrl?: string;
  error: IUploadAvatarError;
}

interface IUploadAvatarError {
  summary: string;
}
