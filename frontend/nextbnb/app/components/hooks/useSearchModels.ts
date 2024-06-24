"use client";
import { create } from "zustand";

export type SearchQuery = {
  country: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  bathrooms: number;
  bedrooms: number;
  category: string;
};

interface SearchModalStore {
  isOpen: boolean;
  step: string;
  open: (step: string) => void;
  close: () => void;
  query: SearchQuery;
  setQuery: (query: SearchQuery) => void;
}

const useSearchLoginModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  step: "location",
  open: (step) => set({ isOpen: true, step: step }),
  close: () => set({ isOpen: false }),
  query: {
    country: "",
    checkIn: null,
    checkOut: null,
    guests: 1,
    bathrooms: 0,
    bedrooms: 0,
    category: "",
  },
  setQuery: (query) => set({ query: query }),
}));

export default useSearchLoginModal;
