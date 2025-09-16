import React, { forwardRef, ReactNode, useMemo } from 'react';
import { View } from 'react-native';

import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

export type BottomSheetRef = BottomSheetModal;

type CustomBottomSheetProps = {
	/** Custom snap points (default: ['50%']) */
	snapPoints?: string[];
	/** Optional title at the top */
	title?: string;
	/** Content to render inside the bottom sheet */
	children: ReactNode;
};


const CustomBottomSheetModal = forwardRef<BottomSheetRef, CustomBottomSheetProps>((props, ref) => {
	const { snapPoints = ["50%"], title, children } = props;

	const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

	return (
		<BottomSheetModal ref={ref} index={0} snapPoints={memoizedSnapPoints} enableDynamicSizing={false}>
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
