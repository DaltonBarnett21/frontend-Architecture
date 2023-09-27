import { create } from "zustand";

type UserState = {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    profileImage: string | null;
  };
};

type Action = {
  updateUser: (user: UserState) => void;
  setToken: (token: string) => void;
  removeToken: () => void;
  getToken: () => void;
  hasToken: () => boolean;
};

// Create your store, which includes both state and (optionally) actions
const useUserStore = create<UserState & Action>((set) => ({
  user: {
    id: "",
    name: "",
    username: "",
    email: "",
    profileImage: null,
  },
  updateUser: (input) =>
    set((state) => ({
      user: { ...state.user, ...input.user },
    })),
  setToken: (token: string) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),
  getToken: () => localStorage.getItem("token"),
  hasToken: () => {
    if (localStorage?.getItem("token")) {
      return true;
    } else {
      return false;
    }
  },
}));

export default useUserStore;
