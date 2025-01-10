import { createContext } from "react";

type StoreContextType = {
  data: any[]; // Update this type based on your actual data structure
  setData: (data: any[]) => void;
};

export const StoreContext = createContext<StoreContextType | null>(null);
