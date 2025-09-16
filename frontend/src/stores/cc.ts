// stores/useUserStore.ts
import { create } from "zustand";
import axios, { AxiosError, AxiosResponse } from "../lib/axios";
import { toast } from "react-hot-toast";

// Define types for user and store state
interface User {
  // Add specific user properties as needed
  id?: string;
  name?: string;
  email?: string;
  // Add other user properties here
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  
  signup: (data: SignupData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<any>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }: SignupData) => {
    console.log("[SIGNUP] Triggered");
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res: AxiosResponse<User> = await axios.post("/auth/signup", { name, email, password });
      console.log("[SIGNUP] Success", res.data);
      set({ user: res.data, loading: false });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("[SIGNUP] Error", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "An error occurred");
      set({ loading: false });
    }
  },

  login: async (email: string, password: string) => {
    console.log("[LOGIN] Attempting login");
    set({ loading: true });

    try {
      const res: AxiosResponse<User> = await axios.post("/auth/login", { email, password });
      console.log("[LOGIN] Success", res.data);
      set({ user: res.data, loading: false });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("[LOGIN] Error", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "An error occurred");
      set({ loading: false });
    }
  },

  logout: async () => {
    console.log("[LOGOUT] Logging out user");
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      console.log("[LOGOUT] Success");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("[LOGOUT] Error", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "An error occurred during logout");
    }
  },

  checkAuth: async () => {
    console.log("[AUTH CHECK] Checking auth status");
    set({ checkingAuth: true });
    try {
      const response: AxiosResponse<User> = await axios.get("/auth/profile");
      console.log("[AUTH CHECK] User is authenticated", response.data);
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      const err = error as Error;
      console.error("[AUTH CHECK] Failed", err.message);
      set({ checkingAuth: false, user: null });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) {
      console.log("[REFRESH] Already refreshing. Skip.");
      return;
    }

    set({ checkingAuth: true });
    console.log("[REFRESH] Refreshing token...");

    try {
      const response: AxiosResponse<any> = await axios.post("/auth/refresh-token");
      console.log("[REFRESH] Success");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error("[REFRESH] Failed", err.message);
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

// Axios interceptor
let refreshPromise: Promise<any> | null = null;

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("[INTERCEPTOR] 401 error caught. Trying token refresh.");

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        console.error("[INTERCEPTOR] Token refresh failed.");
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);