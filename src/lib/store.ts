import { create } from "zustand";

// Shared UI state: which section the reader is in (read by the sidebar menu and the
// phone top bar) and whether the phone menu is open.
type UI = {
  active: string; // section id, e.g. "projects"
  setActive: (id: string) => void;
  menu: boolean;
  setMenu: (open: boolean) => void;
};

export const useUI = create<UI>((set) => ({
  active: "about",
  setActive: (active) => set({ active }),
  menu: false,
  setMenu: (menu) => set({ menu }),
}));
