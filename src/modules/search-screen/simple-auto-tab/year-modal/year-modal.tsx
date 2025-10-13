import CustomBottomSheetModal from "@/components/global/CustomBottomSheetModal";
import CustomWheelPicker from "@/components/global/CustomWheelPicker";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  PickerItem,
  ValueChangedEvent,
} from "@quidone/react-native-wheel-picker";
import React, { forwardRef, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-gesture-handler";

export type BottomSheetRef = BottomSheetModal;

type props = {
  /** Custom snap points (default: ['50%']) */
  snapPoints?: string[];
  /** Optional title at the top */
  title?: string;
  /** Content to render inside the bottom sheet */
};

const years = [...Array(100).keys()].map((index) => ({
  value: 2025 - index,
  label: (2025 - index).toString(),
}));

type YearModalProps = props & {
  onChange?: (releaseYear: any) => void;
};

const YearModal = forwardRef<BottomSheetRef, YearModalProps>((props, ref) => {
  const [releaseYear, setReleaseYear] = useState(years[0].value);

  const handleReleaseYear = (value: ValueChangedEvent<PickerItem<number>>) => {
    setReleaseYear(value.item.value);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={["40%"]}
      footerProps={{
        selectedValue: releaseYear,
        onConfirm: props.onChange,
      }}
      title="Год выпуска"
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-center gap-x-10">
          <View className="mr-3">
            <Text className="text-font dark:text-font-dark font-bold text-lg">
              Год
            </Text>
          </View>
          <CustomWheelPicker
            data={years}
            value={releaseYear}
            onValueChanged={handleReleaseYear}
          />
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});

YearModal.displayName = "YearModal";

export default YearModal;
