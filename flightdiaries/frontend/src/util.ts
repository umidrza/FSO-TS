import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (data?.error) {
      return data.error.map((e: { message: string }) => e.message).join(", ");
    }
  }
  return "Something went wrong";
};