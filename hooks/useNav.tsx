import { create } from "zustand";

interface useNavStore {
  active: "add-item" | "view-item" | "list";
  isMobile: boolean;
  count: number;
  itemId?: string;
  onSetActive: (active: "add-item" | "view-item" | "list", id?: string) => void;
  onSetIsMobile: (isMobile: boolean) => void;
  onSetCount: (count: number) => void;
}

export const useNav = create<useNavStore>((set) => ({
  active: "add-item",
  isMobile: false,
  count: 0,
  onSetCount: (count: number) => set({ count }),
  onSetActive: (active: "add-item" | "view-item" | "list", id?: string) =>
    set({ active, itemId: id }),
  onSetIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
