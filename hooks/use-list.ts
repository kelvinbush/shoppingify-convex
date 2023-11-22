import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type CartState = {
  name: string;
  items: CartItem[];
  activeItemId: string;
  totalItems: number;
};

type CartActions = {
  addItem: (itemId: string, name: string) => void;
  removeItem: (cartItemId: string) => void;
  setActiveItem: (cartItemId: string) => void;
  updateItem: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  setNewListName: (name: string) => void;
  decrementItem: (cartItemId: string) => void;
  incrementItem: (cartItemId: string) => void;
};

export const useListStore = create<CartState & CartActions>()(
  immer((set) => ({
    name: "Shopping List",
    items: [],
    activeItemId: "0",
    totalItems: 0,

    addItem: (itemId: string, name: string) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.itemId === itemId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({
            itemId,
            quantity: 1,
            isActive: false,
            name,
          });
        }
        state.totalItems += 1;
      });
    },

    removeItem: (cartItemId: string) => {
      set((state) => {
        const itemIndex = state.items.findIndex(
          (item) => item.itemId === cartItemId,
        );
        if (itemIndex !== -1) {
          state.totalItems -= 1;
          state.items.splice(itemIndex, 1);
        }
      });
    },

    setActiveItem: (cartItemId: string) => {
      set((state) => {
        state.activeItemId = cartItemId;
      });
    },

    updateItem: (cartItemId: string, quantity: number) => {
      set((state) => {
        const item = state.items.find((item) => item.itemId === cartItemId);
        if (item) {
          item.quantity = quantity;
        }
      });
    },

    clearCart: () => {
      set(() => ({
        items: [],
        totalItems: 0,
      }));
    },

    setNewListName: (name: string) => {
      set((state) => {
        state.name = name;
      });
    },

    decrementItem: (cartItemId: string) => {
      set((state) => {
        const item = state.items.find((item) => item.itemId === cartItemId);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        } else if (item && item.quantity === 1) {
          state.totalItems -= 1;
          state.items.splice(
            state.items.findIndex((item) => item.itemId === cartItemId),
            1,
          );
        }
      });
    },

    incrementItem: (cartItemId: string) => {
      set((state) => {
        const item = state.items.find((item) => item.itemId === cartItemId);
        if (item) {
          item.quantity += 1;
        }
      });
    },
  })),
);
