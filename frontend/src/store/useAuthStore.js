import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth:true,
  loading: false,
  signup: async (signupData) => {
    try {
        set({loading: true});
        const res = await axiosInstance.post("/auth/signup", signupData);
        set({authUser: res.data.user});
        toast.success("Signup successful");
    } catch (error) {
        toast.error(error.response.data.message || "An error occurred");
    } finally {
        set({loading: false});
    }
  },
  checkAuth: async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
  }
}));