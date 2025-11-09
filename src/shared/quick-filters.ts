import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export interface QuickFilter {
  label: string;
  type: string;
  onSelect?: () => any;
}

export const useQuickFilters = (): QuickFilter[] => {
  const { t } = useTranslation();

  return useMemo(() => [
    { label: t('searchScreen.simpleAuto.recommendations'), type: 'recommended', onSelect: () => {
      return {
        recommended: true
      }
    } },
    { label: t('searchScreen.simpleAuto.fromOwners'), type: 'seller', onSelect: () => {
      return {
        seller: [{ value: 'owner' }]
      }
    } },
    { label: t('searchScreen.simpleAuto.new'), type: 'new', onSelect: () => {
      const currentYear = new Date().getFullYear();
      return {
        releaseYear: { min: currentYear - 1 }
      }
    } },
    { label: t('searchScreen.simpleAuto.upTo5k'), type: 'upTo5k', onSelect: () => {
      return {
        priceRange: { min: 0, max: 5000 }
      }
    } },
    { label: t('searchScreen.simpleAuto.upTo10k'), type: 'upTo10k', onSelect: () => {
      return {
        priceRange: { min: 0, max: 10000 }
      }
    } },
    { label: t('searchScreen.simpleAuto.upTo15k'), type: 'upTo15k', onSelect: () => {
      return {
        priceRange: { min: 0, max: 15000 }
      }
    } },
  ], [t]);
};
