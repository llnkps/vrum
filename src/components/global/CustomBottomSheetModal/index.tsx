import React, { FC, forwardRef, ReactNode, useCallback, useMemo } from 'react';

import { CustomTheme } from '@/theme';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFooterProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetVariables } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTheme } from '@react-navigation/native';
import { DefaultFooter } from './footer';
import { HeaderHandle } from './header';

export type BottomSheetRef = BottomSheetModal;

type CustomBottomSheetProps = {
  /** Custom snap points (default: ['50%']) */
  snapPoints?: string[];

  title?: string;
  handleComponent?: FC<BottomSheetVariables>;
  footerComponent?: FC<BottomSheetFooterProps>;
  enableContentPanningGesture?: boolean;
  enablePanDownToClose?: boolean;
  backdropComponent?: React.FC<BottomSheetBackdropProps> | null;
  bottomInset?: number;
  showCloseButton?: boolean;
  /** Content to render inside the bottom sheet */
  children: ReactNode;
  /** Footer callbacks */
  footerProps?: {
    selectedValue?: any;
    onConfirm?: (value?: any) => void;
    onCancel?: () => void;
  };
  initialIndex?: number;
  /** Called when the bottom sheet is dismissed */
  onDismiss?: () => void;
};

const CustomBottomSheetModal = forwardRef<BottomSheetRef, CustomBottomSheetProps>((props, ref) => {
  const {
    snapPoints = ['25%', '50%', '90%'],
    title,
    children,
    handleComponent,
    footerComponent,
    enableContentPanningGesture = false,
    enablePanDownToClose = true,
    backdropComponent,
    bottomInset = 0,
    showCloseButton = true,
    footerProps,
    initialIndex = 0,
    onDismiss,
  } = props;

  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  const theme = useTheme() as CustomTheme;

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

  const renderDefaultHeader = useCallback(
    (props: any) => <HeaderHandle {...props} title={title} showCloseButton={showCloseButton} />,
    [title, showCloseButton]
  );

  const renderDefaultFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <DefaultFooter {...props} selectedValue={footerProps?.selectedValue} onConfirm={footerProps?.onConfirm} onCancel={footerProps?.onCancel} />
    ),
    [footerProps]
  );

  const finalFooterComponent = footerComponent || (footerProps ? renderDefaultFooter : undefined);

  // Faster animation configuration
  const animationConfigs = useMemo(
    () => ({
      duration: 150, // Faster animation duration (default is usually 500ms)
    }),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={initialIndex} // initially closed
      snapPoints={memoizedSnapPoints}
      enableDynamicSizing={false}
      animationConfigs={animationConfigs}
      backdropComponent={backdropComponent === null ? undefined : (backdropComponent ?? renderBackdrop)}
      handleComponent={handleComponent ?? renderDefaultHeader}
      footerComponent={finalFooterComponent}
      enableContentPanningGesture={enableContentPanningGesture}
      enablePanDownToClose={footerProps ? false : enablePanDownToClose}
      keyboardBehavior="interactive"
      onDismiss={onDismiss}
      // keyboardBlurBehavior="restore"
      // android_keyboardInputMode="adjustResize"
      backgroundStyle={{
        backgroundColor: theme.colors.surface,
      }}
      bottomInset={bottomInset}
    >
      {children}
    </BottomSheetModal>
  );
});

CustomBottomSheetModal.displayName = 'CustomBottomSheetModal';

export default CustomBottomSheetModal;
