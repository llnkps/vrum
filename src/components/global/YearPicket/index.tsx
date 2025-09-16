import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';

const years = Array.from({ length: 50 }, (_, i) => 2025 - i); // 2025 → 1975

type YearPickerProps = {
  onSelect: (year: number | null) => void;
};

export function YearPicker({ onSelect }: YearPickerProps) {
  const [selected, setSelected] = useState<number | null>(null);


  const handleSelect = (year: number) => {
    setSelected(year);
    onSelect(year);
    close();
  };

  return (
    <View className="flex-1 px-4">
      {/* <ScrollView> */}
        <FlatList
          data={years}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelect(item)}
              className={`py-3 border-b border-gray-700 ${selected === item ? "bg-gray-700 rounded-md" : ""
                }`}
            >
              <Text className="text-white text-center text-base">{item}</Text>
            </Pressable>
          )}
        />
      {/* </ScrollView> */}
    </View>
  );
}
