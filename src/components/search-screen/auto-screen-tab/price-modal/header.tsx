import CloseIcon from "@/components/global/CloseIcon";
import {
  BottomSheetHandle,
  type BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderHandleProps extends BottomSheetHandleProps {}

const HeaderHandleComponent = ({ ...rest }: HeaderHandleProps) => {
  return (
    <BottomSheetHandle {...rest}>
      <View style={styles.header}>
        <Text className="text-font dark:text-font-dark font-bold text-2xl">
          Цена
        </Text>
        <CloseIcon onPress={() => {}} />
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
  },
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.075)",
    zIndex: 99999,
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  indicator: {
    height: 4,
    opacity: 0.5,
  },
});

export const HeaderHandle = memo(HeaderHandleComponent);
