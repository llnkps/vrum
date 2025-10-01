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
  onChange?: (from: number, till: number) => void;
};

const YearModal = forwardRef<BottomSheetRef, YearModalProps>((props, ref) => {
  const [fromYear, setFromYear] = useState(years[0].value);
  const [tillYear, setTillYear] = useState(years[0].value);

  const handleChangeFromYear = (
    value: ValueChangedEvent<PickerItem<number>>
  ) => {
    setFromYear(value.item.value);
    if (props.onChange) props.onChange(value.item.value, tillYear);
  };

  const handleChangeTillYear = (
    value: ValueChangedEvent<PickerItem<number>>
  ) => {
    setTillYear(value.item.value);
    if (props.onChange) props.onChange(fromYear, value.item.value);
  };

  const handleChangingWithVibration = () => {
    Vibration.vibrate(1);
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
            от
          </Text>
          <CustomWheelPicker
            data={years}
            value={fromYear}
            onValueChanged={handleChangeFromYear}
            onValueChanging={handleChangingWithVibration}
          />
        </View>

        <View className="flex-row justify-center gap-x-10">
          <Text className="mt-[7.6rem] text-font dark:text-font-dark font-bold text-lg">
            до
          </Text>
          <CustomWheelPicker
            data={years}
            value={tillYear}
            onValueChanged={handleChangeTillYear}
            onValueChanging={handleChangingWithVibration}
          />
        </View>
      </View>
    </CustomBottomSheetModal>
  );
});

YearModal.displayName = "YearModal";

export default YearModal;
