import axios, { AxiosRequestConfig } from "axios";
import environment from "environment";
import { ApiResponse } from "../interfaces/ApiResponse";

export const uploadFileRequest = async (
  userId: string,
  formData: FormData,
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    method: "POST",
    headers: { "content-type": "multipart/form-data" },
    params: { userId },
    onUploadProgress: progressCallback,
    validateStatus: (_status) => true,
  };
  const response = await axios.post("/api/v1/upload", formData, config);

  return response.data;
};

export const deleteFileRequest = async (
  userId: string,
  fileName: string,
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string>> => {
  const config: AxiosRequestConfig = {
    headers: { "content-type": "multipart/form-data" },
    params: { userId, fileName },
    onUploadProgress: progressCallback,
    validateStatus: (_status) => true,
  };
  const response = await axios.delete("/api/v1/upload", config);

  return response.data;
};

export const getListFiles = async (
  userId: string,
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string>> => {
  const config: AxiosRequestConfig = {
    headers: {
      "content-type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
    params: { userId },
    onUploadProgress: progressCallback,
    validateStatus: (_status) => true,
  };
  const response = await axios.get(environment.app.upload, config);

  return response.data;
};
