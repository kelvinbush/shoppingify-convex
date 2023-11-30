import { create } from "zustand";

interface useNavStore {
  active: "add-item" | "view-item" | "list";
  isMobile: boolean;
  itemId?: string;
  onSetActive: (active: "add-item" | "view-item" | "list", id?: string) => void;
  onSetIsMobile: (isMobile: boolean) => void;
}

export const useNav = create<useNavStore>((set) => ({
  active: "add-item",
  isMobile: false,
  onSetActive: (active: "add-item" | "view-item" | "list", id?: string) =>
    set({ active, itemId: id }),
  onSetIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
