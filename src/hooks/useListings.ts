import { useState } from 'react';
import { ListingsTab, ListingCategory } from '@/constants/navigation';

export const useListings = () => {
  const [tab, setTab] = useState<ListingsTab>(ListingsTab.ACTIVE);

  const handleAddAd = (category: ListingCategory) => {
    console.log('Добавить объявление категории:', category);
    // Здесь будет навигация на экран создания объявления
  };

  return {
    tab,
    setTab,
    handlers: {
      handleAddAd,
    },
  };
};
