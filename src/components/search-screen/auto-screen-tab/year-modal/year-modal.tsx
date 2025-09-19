import CloseIcon from "@/components/global/CloseIcon";
import CustomBottomSheetModal from "@/components/global/CustomBottomSheetModal";
import CustomWheelPicker from "@/components/global/CustomWheelPicker";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  PickerItem,
  ValueChangedEvent,
} from "@quidone/react-native-wheel-picker";
import React, { forwardRef, useCallback, useState } from "react";
import { StyleSheet, Vibration, View } from "react-native";
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

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const YearModal = forwardRef<BottomSheetRef, props>((props, ref) => {
  const [fromYear, setFromYear] = useState(years[0].value);
  const [tillYear, setTillYear] = useState(years[0].value);

  const handleChangeFromYear = (
    value: ValueChangedEvent<PickerItem<number>>
  ) => {
    setFromYear(value.item.value);
  };

  const handleChangeTillYear = (
    value: ValueChangedEvent<PickerItem<number>>
  ) => {
    setTillYear(value.item.value);
  };

  const handleChangingWithVibration = () => {
    Vibration.vibrate(1)
  }

  const renderHeaderHandle = useCallback(
    (props) => (
      <HeaderHandle {...props}>
        <View style={styles.header}>
          <Text className="text-font dark:text-font-dark font-bold text-lg">
            Год
          </Text>
          <CloseIcon onPress={() => {}} />
        </View>
      </HeaderHandle>
    ),
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
