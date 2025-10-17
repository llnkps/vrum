import { useState } from 'react';
import { useRouter } from 'expo-router';
import { AdsTab, AdsCategory } from '@/constants/navigation';

export const useAds = () => {
  const [tab, setTab] = useState<AdsTab>(AdsTab.ACTIVE);
  const router = useRouter();

  const handleAddAd = (category: AdsCategory) => {
    console.log('Добавить объявление категории:', category);

    switch (category) {
      case AdsCategory.CARS:
        router.push('/add-car');
        break;
      case AdsCategory.MOTORCYCLES:
        // router.push('/add-motorcycle');
        console.log('Добавить мотоцикл - пока не реализовано');
        break;
      case AdsCategory.PARTS:
        // router.push('/add-parts');
        console.log('Добавить запчасти - пока не реализовано');
        break;
      default:
        console.log('Неизвестная категория:', category);
    }
  };

  return {
    tab,
    setTab,
    handlers: {
      handleAddAd,
    },
  };
};
