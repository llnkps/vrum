import CustomBottomSheetModal from "@/components/global/CustomBottomSheetModal";
import CustomWheelPicker from "@/components/global/CustomWheelPicker";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  PickerItem,
  ValueChangedEvent,
} from "@quidone/react-native-wheel-picker";
import React, { forwardRef, useCallback, useState } from "react";
import { Vibration, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { CustomFooter } from "./footer";
import { HeaderHandle } from "./header";

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

  const handleReleaseYear = (
    value: ValueChangedEvent<PickerItem<number>>
  ) => {
    setReleaseYear(value.item.value);
    if (props.onChange) props.onChange(value.item);
  };

  const renderHeaderHandle = useCallback(
    (props) => <HeaderHandle {...props} />,
    []
  );

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={["40%"]}
      handleComponent={renderHeaderHandle}
      footerComponent={CustomFooter}
    >
      <View className="flex-row justify-center gap-x-10">
        <View className="flex-row gap-x-8">
          <Text className="mt-[7.6rem] text-font dark:text-font-dark font-bold text-lg">
            Год выпуска
          </Text>
          <CustomWheelPicker
            data={years}
            value={releaseYear}
            onValueChanged={handleReleaseYear}
          />
        </View>
      </View>
    </CustomBottomSheetModal>
  );
});

YearModal.displayName = "YearModal";

export default YearModal;
