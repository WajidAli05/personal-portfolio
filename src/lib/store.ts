import { create } from "zustand";

// Shared UI state across independent client components.
type UI = {
  introDone: boolean;
  setIntroDone: () => void;
  cursor: string; // label shown in the custom cursor ("" = none)
  setCursor: (label: string) => void;
};

export const useUI = create<UI>((set) => ({
  introDone: false,
  setIntroDone: () => set({ introDone: true }),
  cursor: "",
  setCursor: (cursor) => set({ cursor }),
}));
