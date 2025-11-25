import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow, TouchableHighlightRowProps } from '@/components/global/TouchableHighlightRow';
import { Region } from '@/openapi/client';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RegionBottomSheet } from './RegionBottomSheet';

interface RegionFilterControllerProps {
  value?: Region[];
  onChange: (value: Region[]) => void;
  error?: string;
  multiple?: boolean;
  appearance?: TouchableHighlightRowProps['appearance'];
  containerStyle?: TouchableHighlightRowProps['containerStyle'];
}

const RegionFilterController = React.memo(
  ({ value = [], onChange, error, containerStyle = undefined, multiple = true, appearance = 'default' }: RegionFilterControllerProps) => {
    const { t } = useTranslation();
    const regionModalRef = useRef<BottomSheetRef>(null);

    const handlePresentRegionModalPress = useCallback(() => {
      regionModalRef.current?.present();
    }, []);

    const selectedValue = React.useMemo(() => {
      if (!value || value.length === 0) return undefined;
      if (value.length === 1) return value[0].name;
      return `${value.length} ${t('searchScreen.simpleAuto.regionsSelected', { count: value.length })}`;
    }, [value, t]);

    return (
      <>
        <TouchableHighlightRow
          label={t('searchScreen.simpleAuto.allRegions')}
          selectedValue={selectedValue}
          onPress={handlePresentRegionModalPress}
          appearance={appearance}
          showRightArrow={false}
          error={error}
          containerStyle={containerStyle}
        />
        <RegionBottomSheet
          ref={regionModalRef}
          multiple={multiple}
          selectedRegions={value}
          onChange={regions => {
            const regionArray = Array.isArray(regions) ? regions : [regions];
            onChange(regionArray);
            regionModalRef.current?.close({ duration: 150 });
          }}
        />
      </>
    );
  }
);

RegionFilterController.displayName = 'RegionFilterController';

export { RegionFilterController };
