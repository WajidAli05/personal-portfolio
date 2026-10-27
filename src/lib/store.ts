import { create } from "zustand";

export type Theme = "dark" | "light";

// Shared UI state across independent client components.
type UI = {
  introDone: boolean;
  setIntroDone: () => void;
  cursor: string; // label shown in the custom cursor ("" = none)
  setCursor: (label: string) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  particles: number; // live count from the hero portrait
  setParticles: (n: number) => void;
};

export const useUI = create<UI>((set) => ({
  introDone: false,
  setIntroDone: () => set({ introDone: true }),
  cursor: "",
  setCursor: (cursor) => set({ cursor }),
  theme: "dark",
  setTheme: (theme) => set({ theme }),
  particles: 0,
  setParticles: (particles) => set({ particles }),
}));
