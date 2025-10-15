// It needs to pass data from models: brand, model.
// And to display label of field.

import {
  GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner,
  GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInnerModificationsInner,
  GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner,
} from "@/openapi/client";
import { createContext, useContext, useState } from "react";

type GenerationType = {
  id: number;
  generation: number | null;
  modification: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInnerModificationsInner | null;
};

type SimpleAutoFormContextType = {
  selectedBrand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null;
  setSelectedBrand: (
    brand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null
  ) => void;
  selectedModel: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner | null;
  setSelectedModel: (
    model: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner | null
  ) => void;
  selectedGeneration: GenerationType | null;
  setSelectedGeneration: (generation: GenerationType | null) => void;
  selectedReleaseYear: string | null;
  setSelectedReleaseYear: React.Dispatch<string>;
  selectedRegion: string | null;
  setSelectedRegion: React.Dispatch<string>;
  selectedCurrency: string | null;
  setSelectedCurrency: React.Dispatch<string>;

  selectedTransmissionType: string | null;
  setSelectedTransmissionType: React.Dispatch<string>;
  selectedFuelType: string | null;
  setSelectedFuelType: React.Dispatch<string>;
  selectedBodyType: string | null;
  setSelectedBodyType: React.Dispatch<string>;
  selectedDriveTrain: string | null;
  setSelectedDriveTrain: React.Dispatch<string>;
  selectedColor: string | null;
  setSelectedColor: React.Dispatch<string>;
  selectedPower: number | null;
  setSelectedPower: React.Dispatch<number>;
  selectedEngineCapacity: number | null;
  setSelectedEngineCapacity: React.Dispatch<number>;

  selectedTradeAllow: boolean | null;
  setSelectedTradeAllow: React.Dispatch<boolean>;
  selectedCondition: string | null;
  setSelectedCondition: React.Dispatch<string>;
  selectedNumberOfOwner: string | null;
  setSelectedNumberOfOwner: React.Dispatch<string>;
  selectedDocumentOk: boolean | null;
  setSelectedDocumentOk: React.Dispatch<boolean>;

  selectedSeller: string | null;
  setSelectedSeller: React.Dispatch<string>;
};

const SimpleAutoFormContext = createContext<SimpleAutoFormContextType | null>(
  null
);

export const SimpleAutoFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedBrand, setSelectedBrand] =
    useState<GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null>(
      null
    );
  const [selectedModel, setSelectedModel] =
    useState<GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner | null>(
      null
    );
  const [selectedReleaseYear, setSelectedReleaseYear] = useState<string | null>(
    null
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedTransmissionType, setSelectedTransmissionType] = useState<
    string | null
  >(null);
  const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedDriveTrain, setSelectedDriveTrain] = useState<string | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPower, setSelectedPower] = useState<number | null>(null);
  const [selectedEngineCapacity, setSelectedEngineCapacity] = useState<
    number | null
  >(null);
  const [selectedTradeAllow, setSelectedTradeAllow] = useState<boolean | null>(
    null
  );
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    null
  );
  const [selectedNumberOfOwner, setSelectedNumberOfOwner] = useState<
    string | null
  >(null);
  const [selectedDocumentOk, setSelectedDocumentOk] = useState<boolean | null>(
    null
  );
  const [selectedGeneration, setSelectedGeneration] =
    useState<GenerationType | null>(null);

  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  return (
    <SimpleAutoFormContext.Provider
      value={{
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        selectedGeneration,
        setSelectedGeneration,
        selectedReleaseYear,
        setSelectedReleaseYear,
        selectedRegion,
        setSelectedRegion,
        selectedCurrency,
        setSelectedCurrency,
        selectedTransmissionType,
        setSelectedTransmissionType,
        selectedFuelType,
        setSelectedFuelType,
        selectedBodyType,
        setSelectedBodyType,
        selectedDriveTrain,
        setSelectedDriveTrain,
        selectedColor,
        setSelectedColor,
        selectedPower,
        setSelectedPower,
        selectedEngineCapacity,
        setSelectedEngineCapacity,
        selectedTradeAllow,
        setSelectedTradeAllow,
        selectedCondition,
        setSelectedCondition,
        selectedNumberOfOwner,
        setSelectedNumberOfOwner,
        selectedDocumentOk,
        setSelectedDocumentOk,
        selectedSeller,
        setSelectedSeller,
      }}
    >
      {children}
    </SimpleAutoFormContext.Provider>
  );
};

export const useSimpleAutoFormContext = () => {
  const ctx = useContext(SimpleAutoFormContext);
  if (!ctx) {
    throw new Error(
      "useModalContext must be used within SimpleAutoFormProvider"
    );
  }
  return ctx;
};
