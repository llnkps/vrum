// context/ModalContext.tsx
import {
  GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner,
  GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner,
} from "@/openapi/client";
import { createContext, useContext, useState } from "react";

type SimpleAutoFormContextType = {
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

  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;

  selectedTransmission: string | null;
  setSelectedTransmission: (transmission: string | null) => void;

  selectedCondition: string | null;
  setSelectedCondition: (condition: string | null) => void;

  selectedFuelType: string | null;
  setSelectedFuelType: (fuelType: string | null) => void;

  selectedSellerName: string | null;
  setSelectedSellerName: (sellerName: string | null) => void;

  selectedCurrency: string | null;
  setSelectedCurrency: (currency: string | null) => void;
};

const SimpleAutoFormContext = createContext<SimpleAutoFormContextType | null>(null);

export const SimpleAutoFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBrand, setSelectedBrand] =
    useState<GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null>(
      null
    );
  const [selectedModel, setSelectedModel] =
    useState<GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner | null>(
      null
    );
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);
  const [selectedSellerName, setSelectedSellerName] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);


  return (
    <SimpleAutoFormContext.Provider
      value={{
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        selectedYear,
        setSelectedYear,
        selectedRegion,
        setSelectedRegion,
        selectedTransmission,
        setSelectedTransmission,
        selectedCondition,
        setSelectedCondition,
        selectedFuelType,
        setSelectedFuelType,
        selectedSellerName,
        setSelectedSellerName,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </SimpleAutoFormContext.Provider>
  );
};

export const useSimpleAutoFormContext = () => {
  const ctx = useContext(SimpleAutoFormContext);
  if (!ctx) {
    throw new Error("useModalContext must be used within SimpleAutoFormProvider");
  }
  return ctx;
};
