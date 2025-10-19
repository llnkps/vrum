import React from 'react';
import { View } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';

interface SelectedBrandsSectionProps {
  selectedBrands: any[];
  getSelectedModelsByBrand: (brandId: number) => any[];
  selectedGenerations: any[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onPressModel: () => void;
  onPressGeneration: () => void;
}

export function SelectedBrandsSection({
  selectedBrands,
  getSelectedModelsByBrand,
  selectedGenerations,
  isCollapsed,
  onToggleCollapse,
  onPressModel,
  onPressGeneration,
}: SelectedBrandsSectionProps) {
  if (selectedBrands.length === 0) {
    return null;
  }

  return (
    <>
      {selectedBrands.map(brand => {
        const selectedModels = getSelectedModelsByBrand(brand.id);
        return (
          <React.Fragment key={brand.id}>
            <TouchableHighlightRow
              variant="button"
              label="Марка, модель, поколение"
              selectedValue={brand.name}
              selectedValueMode="replace"
              onPress={onToggleCollapse}
              showRightArrow
              rightIcon={isCollapsed ? 'chevron-down' : 'chevron-up'}
            />
            <Collapsible collapsed={isCollapsed}>
              <View className="ml-4 gap-y-1">
                <TouchableHighlightRow
                  variant="button"
                  label="Модель"
                  selectedValue={selectedModels.map(m => m.name).join(', ')}
                  selectedValueMode="replace"
                  onPress={onPressModel}
                  showRightArrow
                />

                {selectedModels.length > 0 && (
                  <TouchableHighlightRow
                    variant="button"
                    label="Поколение"
                    selectedValue={selectedGenerations.map(m => `${m.generation} поколение`).join(', ')}
                    selectedValueMode="replace"
                    onPress={onPressGeneration}
                    showRightArrow
                  />
                )}
              </View>
            </Collapsible>
          </React.Fragment>
        );
      })}
    </>
  );
}
