import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { BACKEND_FILTERS, FilterOptionType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TradeAllowFilterBottomSheet } from './TradeAllowFilterBottomSheet';
import { useFilterConfigs } from '@/shared/filter';

interface TradeAllowFilterControllerProps {
  selectedOption?: FilterOptionType;
  onChange: (value: FilterOptionType | undefined) => void;
  error?: string;
}

const TradeAllowFilterController = ({ selectedOption, onChange, error }: TradeAllowFilterControllerProps) => {
  const { t } = useTranslation();
  const tradeAllowModalRef = useRef<BottomSheetRef>(null);

  const filterConfigs = useFilterConfigs();
  const tradeAllowConfig = filterConfigs[BACKEND_FILTERS.TRADE_ALLOW];
  const options = tradeAllowConfig?.options || [];

  const handlePresentTradeAllowModalPress = useCallback(() => {
    tradeAllowModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    return selectedOption?.label;
  }, [selectedOption]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.tradeAllow.label')}
        selectedValue={selectedValue}
        onPress={handlePresentTradeAllowModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        error={error}
      />
      <TradeAllowFilterBottomSheet
        ref={tradeAllowModalRef}
        options={options}
        title={tradeAllowConfig?.label || 'Trade Allow'}
        onSelect={option => {
          onChange(option);
          tradeAllowModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { TradeAllowFilterController };
