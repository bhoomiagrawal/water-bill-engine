"use client";
import { useEffect, useState } from "react";
import { StoreContext } from "../context";
import { useInternalService } from "@/components/hook/useInternalService";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any[]>([]); // Initialize with an empty array

  const [
    fetchResourceConnectionType,
    resourceResultConnectionType,
    connectionTypeInProgress,
    resourceError,
  ] = useInternalService("ConnectionType", "GET", null);

  useEffect(() => {
    fetchResourceConnectionType(); // Fetch data on mount
  }, []);

  useEffect(() => {
    if (resourceResultConnectionType?.data?.data?.connectionType) {
      setData(resourceResultConnectionType.data.data.connectionType);
    }
  }, [resourceResultConnectionType]); // Re-run when resourceResultConnectionType changes

  console.log("resourceResultConnectionType", resourceResultConnectionType);

  return (
    <StoreContext.Provider value={{ data, setData }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
