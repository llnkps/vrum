import React, { FC, forwardRef, ReactNode, useCallback, useMemo, useState, useEffect } from "react";
import { Keyboard, Dimensions } from "react-native";

import { CustomTheme } from "@/theme";
import {
  BottomSheetBackdrop,
  BottomSheetFooterProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { BottomSheetVariables } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useTheme } from "@react-navigation/native";
import { HeaderHandle } from "./header";
import { DefaultFooter } from "./footer";

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

const CustomBottomSheetModal = forwardRef<
  BottomSheetRef,
  CustomBottomSheetProps
>((props, ref) => {
  const {
    snapPoints: initialSnapPoints = ["25%", "50%", "90%"],
    title,
    children,
    handleComponent,
    footerComponent,
    enableContentPanningGesture = false,
    footerProps,
  } = props;

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const memoizedSnapPoints = useMemo(() => {
    if (keyboardVisible) {
      const screenHeight = Dimensions.get('window').height;
      const availableHeight = screenHeight - keyboardHeight - 50; // Reduced from 100px to 50px for header/footer
      const maxSnapPoint = Math.max(availableHeight / screenHeight * 100, 80); // Increased minimum from 50% to 60%
      return [`${Math.min(maxSnapPoint, 95)}%`];
    }
    return initialSnapPoints;
  }, [initialSnapPoints, keyboardVisible, keyboardHeight]);

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

  const renderDefaultHeader = useCallback(
    (props: any) => <HeaderHandle {...props} title={title} />,
    [title]
  );

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
      index={keyboardVisible ? 0 : 0} // Stay at current index when keyboard is visible
      snapPoints={memoizedSnapPoints}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      handleComponent={handleComponent ?? renderDefaultHeader}
      footerComponent={finalFooterComponent}
      enableContentPanningGesture={enableContentPanningGesture}
      enablePanDownToClose={!keyboardVisible} // Disable pan down when keyboard is visible
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backgroundStyle={{
        backgroundColor: theme.colors.surface,
      }}
    >
      {children}
    </BottomSheetModal>
  );
});

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";

export default CustomBottomSheetModal;
