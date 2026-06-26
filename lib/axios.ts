import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { API_ROUTES } from "@/constants/api";
import { ROUTES } from "@/constants/routes";

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest: RetryConfig = error.config;
    const requestUrl = originalRequest?.url;
    const isLoginOrRefreshRequest = requestUrl === API_ROUTES.AUTH.LOGIN;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isLoginOrRefreshRequest
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until the in-flight refresh settles
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => api(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await api.post("/auth/refresh");

      processQueue(null);

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      if (typeof window !== "undefined") {
        window.location.href = ROUTES.AUTH.LOGIN;
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
