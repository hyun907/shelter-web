import { create } from "zustand";

interface RouteState {
  destination: { lat: number; lng: number } | null;
  setDestination: (dest: { lat: number; lng: number }) => void;
}

export const useRouteStore = create<RouteState>(set => ({
  destination: null,
  setDestination: dest => set({ destination: dest })
}));
