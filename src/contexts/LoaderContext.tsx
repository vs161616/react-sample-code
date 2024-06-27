/* eslint-disable react/function-component-definition */
import React, { createContext, useContext, useMemo, useState } from "react";

// Define LoaderType as an enum or union type
export enum LoaderType {
  HalfWindow = "half-window",
  FullWindow = "full-window",
}

interface LoaderContextType {
  loading: boolean;
  loaderType: LoaderType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoaderType: React.Dispatch<React.SetStateAction<LoaderType>>;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

/**
 * LoaderProvider component to provide loading state management via context.
 * @param {React.ReactNode} children - The child components that will consume the context.
 * @returns {JSX.Element} The LoaderContext provider wrapping the children components.
 */
export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [loaderType, setLoaderType] = useState<LoaderType>(
    LoaderType.FullWindow,
  );
  const loaderContext = useMemo(
    () => ({ loading, loaderType, setLoading, setLoaderType }),
    [loading, loaderType, setLoading, setLoaderType],
  );

  return (
    <LoaderContext.Provider value={loaderContext}>
      {children}
    </LoaderContext.Provider>
  );
};

/**
 * Custom hook to use the LoaderContext.
 * @returns {LoaderContextType} The context value.
 * @throws {Error} If used outside of a LoaderProvider.
 */
export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
