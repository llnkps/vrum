import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type TradeOptionType = (typeof options)[number];

type TradeAllowModalProps = {
  onSelect: (value: TradeOptionType) => void;
};

const options = [
  { label: 'Торг возможен', value: 'trade_allow' },
  { label: 'Без торга', value: 'trade_disallow' },
];

const TradeAllowModal = forwardRef<BottomSheetRef, TradeAllowModalProps>(({ onSelect }, ref) => {
  const [selectedBodyType, setSelectedBodyType] = React.useState<string | undefined>(undefined);

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['35%']}
      enableContentPanningGesture={true}
      title="Торг"
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            onPress={() => {
              onSelect(opt);
              setSelectedBodyType(opt.value);
            }}
            title={opt.label}
            isSelected={selectedBodyType === opt.value}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
TradeAllowModal.displayName = 'TradeAllowModal';

export default TradeAllowModal;
