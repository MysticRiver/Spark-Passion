import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth:true,
  checkAuth: async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
  }
}));