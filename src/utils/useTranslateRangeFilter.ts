import { RangeFilterType } from '@/types/filter';
import { TFunction } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const formatRangeFilterValue = (
  filterName: string,
  value: RangeFilterType | undefined,
  t: TFunction,
  formatCallback?: (value: RangeFilterType, t: TFunction) => { from?: string; to?: string }
): string | undefined => {
  if (!value) return undefined;

  // Apply custom formatting callback if provided
  const formattedValues = formatCallback ? formatCallback(value, t) : { from: value.from?.toString(), to: value.to?.toString() };

  const { from, to } = formattedValues;

  if (from && to) {
    return t(`filters.${filterName}.range`, { from, to });
  } else if (from) {
    return t(`filters.${filterName}.from`, { value: from });
  } else if (to) {
    return t(`filters.${filterName}.to`, { value: to });
  }

  return undefined;
};

export const useTranslateRangeFilter = (
  filterName: string,
  value: RangeFilterType | undefined,
  formatCallback?: (value: RangeFilterType, t: TFunction) => { from?: string; to?: string }
) => {
  const { t } = useTranslation();
  return React.useMemo(() => formatRangeFilterValue(filterName, value, t, formatCallback), [filterName, value, t, formatCallback]);
};

// Utility function to format numbers with appropriate units and abbreviations
const formatNumberWithUnit = (num: number, filterName: string, t: TFunction): string => {
  // Handle both frontend filter names and backend filter names
  const normalizedFilterName = filterName.replace(/_/g, '').toLowerCase();

  switch (normalizedFilterName) {
    case 'price':
      if (num >= 1000000) {
        const formattedNum = (num / 1000000).toFixed(1);
        return `${formattedNum} ${t('units.million')} ${t('units.currency')}`;
      } else if (num >= 1000) {
        const formattedNum = (num / 1000).toFixed(1);
        return `${formattedNum} ${t('units.thousand')} ${t('units.currency')}`;
      } else {
        return `${num} ${t('units.currency')}`;
      }

    case 'power':
      return `${num} ${t('units.power')}`;

    case 'enginecapacity':
      return `${num} ${t('units.engineCapacity')}`;

    case 'year':
      return `${num} ${t('units.year')}`;

    case 'mileage':
      return `${num} ${t('units.mileage')}`;

    default:
      return num.toString();
  }
};

// Callback factory for different filter types
export const createFilterFormatCallback = (filterName: string) => {
  return (value: RangeFilterType, t: TFunction): { from?: string; to?: string } => {
    return {
      from: value.from !== undefined ? formatNumberWithUnit(value.from, filterName, t) : undefined,
      to: value.to !== undefined ? formatNumberWithUnit(value.to, filterName, t) : undefined,
    };
  };
};
