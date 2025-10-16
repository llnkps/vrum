import CloseIcon from "@/components/global/CloseIcon";
import {
  BottomSheetHandle,
  useBottomSheetModal,
  type BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderHandleProps extends BottomSheetHandleProps {
  title?: string;
}

const HeaderHandleComponent = ({ title, ...rest }: HeaderHandleProps) => {
  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetHandle {...rest}>
      <View style={styles.header}>
        <Text className="text-font dark:text-font-dark text-lg font-bold">
          {title ?? "Title modal"}
        </Text>
        <CloseIcon onPress={() => dismiss()} className={"p-2"} />
      </View>
    </BottomSheetHandle>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
  },
});

export const HeaderHandle = memo(HeaderHandleComponent);
