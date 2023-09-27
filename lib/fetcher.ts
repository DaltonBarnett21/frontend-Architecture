import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

interface IFetcher extends AxiosRequestConfig {
  contentType?: string;
}

export const fetcher = async <T>({
  method,
  url,
  data,
  contentType = "application/json",
}: IFetcher): Promise<T> => {
  const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers: {
        "content-type": contentType,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
