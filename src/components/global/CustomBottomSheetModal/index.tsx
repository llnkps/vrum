import React, { FC, forwardRef, ReactNode, useCallback, useMemo } from "react";

import { CustomTheme } from "@/theme";
import {
  BottomSheetBackdrop,
  BottomSheetFooterProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { BottomSheetVariables } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useTheme } from "@react-navigation/native";
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
};

const CustomBottomSheetModal = forwardRef<
  BottomSheetRef,
  CustomBottomSheetProps
>((props, ref) => {
  const {
    snapPoints = ["50%"],
    title,
    children,
    handleComponent,
    footerComponent,
    enableContentPanningGesture = false,
  } = props;

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

  const renderDefaultHeader = useCallback(
    (props: any) => <HeaderHandle {...props} title={title} />,
    [title]
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0} // initially closed
      snapPoints={memoizedSnapPoints}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      handleComponent={handleComponent ?? renderDefaultHeader}
      footerComponent={footerComponent}
      enableContentPanningGesture={enableContentPanningGesture}
      enablePanDownToClose={true}
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
