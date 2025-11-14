import { TFunction } from 'i18next';
import { RangeFilterType } from '@/types/filter';
import { useTranslation } from 'react-i18next';
import React from 'react';

export const formatRangeFilterValue = (
  filterName: string,
  value: RangeFilterType | undefined,
  t: TFunction
): string | undefined => {
  if (!value) return undefined;
  const { from, to } = value;
  if (from && to) return t(`filters.${filterName}.range`, { from: t(`filters.${filterName}.from`, { value: from }), to: t(`filters.${filterName}.to`, { value: to }) });
  if (from) return t(`filters.${filterName}.from`, { value: from });
  if (to) return t(`filters.${filterName}.to`, { value: to });
  return undefined;
};

export const useTranslateRangeFilter = (filterName: string, value: RangeFilterType | undefined) => {
  const { t } = useTranslation();
  return React.useMemo(() => formatRangeFilterValue(filterName, value, t), [filterName, value, t]);
};
