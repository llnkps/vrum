import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";

import { CustomTheme } from "@/theme";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { CustomFooter } from "./footer";
import { HeaderHandle } from "./header";
import CloseIcon from "../CloseIcon";

export type BottomSheetRef = BottomSheetModal;

type CustomBottomSheetProps = {
  /** Custom snap points (default: ['50%']) */
  snapPoints?: string[];
  /** Optional title at the top */
  title?: string;
  /** Content to render inside the bottom sheet */
  children: ReactNode;
};

const CustomBottomSheetModal = forwardRef<
  BottomSheetRef,
  CustomBottomSheetProps
>((props, ref) => {
  const { snapPoints = ["50%"], title, children } = props;

  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  const theme = useTheme() as CustomTheme;

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

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
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={memoizedSnapPoints}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      handleComponent={renderHeaderHandle}
      footerComponent={CustomFooter}
			enableContentPanningGesture={false}
      backgroundStyle={{
        backgroundColor: theme.colors.surface,
      }}
    >
      {/* <BottomSheetView className="flex flex-1 bg-background-page">
				<View className="bg-surface dark:bg-surface-dark p-4">
					{children}
				</View>
			</BottomSheetView>
			<BottomSheetScrollView>
          {data.map(renderItem)}
        </BottomSheetScrollView> */}
      {children}
    </BottomSheetModal>
  );
});

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";

export default CustomBottomSheetModal;


const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	}
});
