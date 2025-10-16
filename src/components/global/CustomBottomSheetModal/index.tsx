import React, { FC, forwardRef, ReactNode, useCallback, useMemo } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { CustomTheme } from "@/theme";
import { BottomSheetBackdrop, BottomSheetFooterProps, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetVariables } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useTheme } from "@react-navigation/native";
import { DefaultFooter } from "./footer";
import { HeaderHandle } from "./header";

export type BottomSheetRef = BottomSheetModal;

type CustomBottomSheetProps = {
  /** Custom snap points (default: ['50%']) */
  snapPoints?: string[];

  title?: string;
  handleComponent?: FC<BottomSheetVariables>;
  footerComponent?: FC<BottomSheetFooterProps>;
  enableContentPanningGesture?: boolean;
  /** Content to render inside the bottom sheet */
  children: ReactNode;
  /** Footer callbacks */
  footerProps?: {
    selectedValue?: any;
    onConfirm?: (value?: any) => void;
    onCancel?: () => void;
  };
};

const CustomBottomSheetModal = forwardRef<BottomSheetRef, CustomBottomSheetProps>((props, ref) => {
  const {
    snapPoints = ["25%", "50%", "90%"],
    title,
    children,
    handleComponent,
    footerComponent,
    enableContentPanningGesture = false,
    footerProps,
  } = props;

  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  const theme = useTheme() as CustomTheme;

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  const renderDefaultHeader = useCallback((props: any) => <HeaderHandle {...props} title={title} />, [title]);

  const renderDefaultFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <DefaultFooter
        {...props}
        selectedValue={footerProps?.selectedValue}
        onConfirm={footerProps?.onConfirm}
        onCancel={footerProps?.onCancel}
      />
    ),
    [footerProps]
  );

  const finalFooterComponent = footerComponent || (footerProps ? renderDefaultFooter : undefined);

  return (
    <BottomSheetModal
      ref={ref}
      index={0} // initially closed
      snapPoints={memoizedSnapPoints}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      handleComponent={handleComponent ?? renderDefaultHeader}
      footerComponent={finalFooterComponent}
      enableContentPanningGesture={enableContentPanningGesture}
      enablePanDownToClose={true}
      keyboardBehavior="interactive"
      // keyboardBlurBehavior="restore"
      // android_keyboardInputMode="adjustResize"
      backgroundStyle={{
        backgroundColor: theme.colors.surface,
      }}
    >
      {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}> */}
        {children}
      {/* </KeyboardAvoidingView> */}
    </BottomSheetModal>
  );
});

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";

export default CustomBottomSheetModal;
