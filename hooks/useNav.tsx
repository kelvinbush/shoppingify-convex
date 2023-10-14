import { create } from "zustand";

interface useNavStore {
  active: "add-item" | "view-item" | "list";
  isMobile: boolean;
  count: number;
  onSetActive: (active: "add-item" | "view-item" | "list") => void;
  onSetIsMobile: (isMobile: boolean) => void;
  onSetCount: (count: number) => void;
}

export const useNav = create<useNavStore>((set) => ({
  active: "list",
  isMobile: false,
  count: 0,
  onSetCount: (count: number) => set({ count }),
  onSetActive: (active: "add-item" | "view-item" | "list") => set({ active }),
  onSetIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
