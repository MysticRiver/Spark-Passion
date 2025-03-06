import { create } from "zustand";

//create a hook called useAuthStore
export const useAuthStore = create((set) => ({
    authUserName: "john",
    authUserLastName:"doe",
}));