// context/ModalContext.tsx
import {
  GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner,
  GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner,
} from "@/openapi/client";
import { createContext, useContext, useState } from "react";

type FilterContextType = {
  selectedBrand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null;
  setSelectedBrand: (
    brand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null
  ) => void;

  selectedModel: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner | null;
  setSelectedModel: (
    model: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner | null
  ) => void;

  selectedYear: string | null;
  setSelectedYear: (year: string | null) => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBrand, setSelectedBrand] =
    useState<GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null>(
      null
    );
  const [selectedModel, setSelectedModel] =
    useState<GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner | null>(
      null
    );
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  return (
    <FilterContext.Provider
      value={{
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useModalContext must be used within FilterProvider");
  }
  return ctx;
};
