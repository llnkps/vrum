import { CustomIconButton, CustomRectButton } from '@/components/ui/button';
import { SortMethod } from '@/types/sort';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import CustomBottomSheetModal from '../CustomBottomSheetModal';

type props = {
  sortMethod: SortMethod | undefined;
  setSortMethod: (method: SortMethod) => void;
};

export const SimpleAutoSortBottomSheet: FC<props> = ({ sortMethod, setSortMethod }) => {
  console.log(sortMethod);
  const { t } = useTranslation();
  const sortModalRef = useRef<BottomSheetModal>(null);

  const handleSortChange = (method: SortMethod) => {
    setSortMethod(method);
    sortModalRef.current?.dismiss();
  };

  const sortMethods: Map<string, SortMethod> = new Map([
    [t('sort.byRelevance'), { fieldName: 'createdAt', direction: 3 }],
    [t('sort.lowPrice'), { fieldName: 'price', direction: 4 }],
    [t('sort.highPrice'), { fieldName: 'price', direction: 3 }],
    [t('sort.newYear'), { fieldName: 'releasedYear', direction: 4 }],
    [t('sort.oldYear'), { fieldName: 'releasedYear', direction: 3 }],
    [t('sort.lowMileage'), { fieldName: 'mileage', direction: 4 }],
    [t('sort.bestPrice'), { fieldName: 'price', direction: 3 }],
    [t('sort.largeEngine'), { fieldName: 'engineCapacity', direction: 3 }],
  ]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 14,
        }}
      >
        <CustomIconButton
          appearance="subtle"
          onPress={() => sortModalRef.current?.present()}
          iconComponent={MaterialIcons}
          iconName="sort"
          size="large"
        />
      </View>

      <CustomBottomSheetModal ref={sortModalRef} title="Сортировка по" snapPoints={['50%']}>
        <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {Array.from(sortMethods).map(([label, method]) => (
            <CustomRectButton
              appearance="subtle"
              key={label}
              title={label}
              isSelected={sortMethod?.fieldName === method.fieldName && sortMethod?.direction === method.direction}
              onPress={() => handleSortChange(method)}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    </>
  );
};
