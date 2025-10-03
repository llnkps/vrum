import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import { Text, View } from "react-native";

type CurrencyTypeOption = (typeof currencies)[number];

const currencies = [
  { label: "USD ($)", value: "USD" },
  { label: "EUR (€)", value: "EUR" },
  { label: "MDL (L)", value: "MDL" },
  { label: "RUB (₽)", value: "RUB" },
];

type props = {
  onChange: (currency: CurrencyTypeOption) => void;
};

export const CurrencySelect: FC<props> = ({ onChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyTypeOption | null>(null);

  const handleSelectCurrency = (currency: CurrencyTypeOption) => {
    setSelectedCurrency(currency);
    onChange(currency);
  };

  return (
    <View className="flex-row justify-center gap-2">
      {currencies.map((currency) => (
        <Button
          key={currency.value}
          onPress={() => handleSelectCurrency(currency)}
          isSelected={selectedCurrency?.value === currency.value}
        >
          <Text className="text-font dark:text-font-dark">
            {currency.label}
          </Text>
        </Button>
      ))}
    </View>
  );
};
