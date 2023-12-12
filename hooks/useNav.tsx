import { create } from "zustand";
import { Id } from "@/convex/_generated/dataModel";

interface useNavStore {
  active: "add-item" | "view-item" | "list";
  isMobile: boolean;
  itemId?: Id<"items">;
  onSetActive: (
    active: "add-item" | "view-item" | "list",
    id?: Id<"items">,
  ) => void;
  onSetIsMobile: (isMobile: boolean) => void;
}

export const useNav = create<useNavStore>((set) => ({
  active: "add-item",
  isMobile: false,
  onSetActive: (active: "add-item" | "view-item" | "list", id?: Id<"items">) =>
    set({ active, itemId: id }),
  onSetIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
