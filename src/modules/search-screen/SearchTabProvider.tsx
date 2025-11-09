import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { ActiveScreen } from '@/modules/search-screen/types';
import { useSimpleGetCollectionPagination } from '@/hooks/api/useSimpleGetCollectionPagination';
import { AutoHeaderScreen } from '@/modules/search-screen/simple-auto-tab/auto-screen';
import { AutoDetailHeaderScreen } from '@/modules/search-screen/(components-tabs)/details-screen';
import { MotoHeaderScreen } from '@/modules/search-screen/(components-tabs)/moto-screen';
import { SpecAutoHeaderScreen } from '@/modules/search-screen/(components-tabs)/spec_auto-screen';
import { CustomRectButton } from '@/components/ui/button';
import { DefaultConfig } from '@/openapi/client';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';

interface SearchTabContextType {
  // State
  activeScreen: ActiveScreen;
  setActiveScreen: React.Dispatch<React.SetStateAction<ActiveScreen>>;

  // Data fetching
  data: any[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
  isRefetching: boolean;

  // Components
  HeaderComponent: React.ComponentType | null;
  ItemComponent: React.ComponentType<{ item: any; onPress: () => void }> | null;

  // Navigation
  getDetailUrl: (item: any) => string;

  // Request params management
  updateRequestParams: (params: Record<string, any>) => void;
  fetchParams: Record<string, any>;
}

const SearchTabContext = createContext<SearchTabContextType | null>(null);

export const useSearchTab = () => {
  const context = useContext(SearchTabContext);
  if (!context) {
    throw new Error('useSearchTab must be used within a SearchTabProvider');
  }
  return context;
};

interface SearchTabProviderProps {
  children: React.ReactNode;
}

const MiniAdvertisementCard = ({ item, onPress }: { item: any; onPress: () => void }) => {
  return (
    <CustomRectButton onPress={onPress} size="small" appearance="subtle">
      <View>
        {item.images && item.images.length > 0 ? (
          <Image
            source={{
              uri: DefaultConfig.basePath + '/' + item.images[0],
            }}
            style={{ width: '100%', height: 150, borderRadius: 8 }}
            contentFit="cover"
          />
        ) : (
          <View style={{ width: '100%', height: 150, borderRadius: 8, backgroundColor: '#ccc' }} />
        )}
        <Text className="text-lg font-bold text-font dark:text-font-dark">
          {item.brand} {item.model}, {item.releaseYear}
        </Text>
        <Text className="text-font-subtle dark:text-font-subtle-dark">
          {item.price} {item.currency}
        </Text>
        {item.region && <Text className="text-font-subtlest dark:text-font-subtlest-dark">{item.region}</Text>}
      </View>
    </CustomRectButton>
  );
};

const TAB_CONFIGS: Record<ActiveScreen, {
  header: React.ComponentType;
  item: React.ComponentType<{ item: any; onPress: () => void }>;
  useDataHook: (params: Record<string, any>) => {
    data: any;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    refetch: () => void;
    isRefetching: boolean;
  };
  fetchParams?: Record<string, any>;
  getDetailUrl: (item: any) => string;
}> = {
  auto: {
    header: AutoHeaderScreen,
    item: MiniAdvertisementCard,
    useDataHook: useSimpleGetCollectionPagination,
    fetchParams: {},
    getDetailUrl: (item) => `/(app)/advertisement-info/simple-auto/${item.id}`,
  },
  auto_detail: {
    header: AutoDetailHeaderScreen,
    item: MiniAdvertisementCard,
    useDataHook: useSimpleGetCollectionPagination,
    fetchParams: {},
    getDetailUrl: (item) => `/(app)/advertisement-info/auto-detail/${item.id}`,
  },
  spec_auto: {
    header: SpecAutoHeaderScreen,
    item: MiniAdvertisementCard,
    useDataHook: useSimpleGetCollectionPagination,
    fetchParams: {},
    getDetailUrl: (item) => `/(app)/advertisement-info/spec-auto/${item.id}`,
  },
  moto: {
    header: MotoHeaderScreen,
    item: MiniAdvertisementCard,
    useDataHook: useSimpleGetCollectionPagination,
    fetchParams: {},
    getDetailUrl: (item) => `/(app)/advertisement-info/moto/${item.id}`,
  },
};

export const SearchTabProvider: React.FC<SearchTabProviderProps> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('auto');
  const [dynamicParams, setDynamicParams] = useState<Record<string, any>>({});
  const store = useAutoSelectStore();
  const config = TAB_CONFIGS[activeScreen];

  // Function to update dynamic params from tab content
  const updateRequestParams = useCallback((params: Record<string, any>) => {
    setDynamicParams(params);
  }, []);

  // Get fetch parameters based on the active screen and store state
  const fetchParams = useMemo(() => {
    const baseParams = {
      ...config.fetchParams,
      ...dynamicParams, // Merge dynamic params from tab content
    };

    // Add screen-specific parameters here if needed
    switch (activeScreen) {
      case 'auto':
        // Auto specific params
        break;
      case 'auto_detail':
        // Auto detail specific params
        break;
      case 'spec_auto':
        // Special auto specific params
        break;
      case 'moto':
        // Moto specific params
        break;
    }

    return baseParams;
  }, [activeScreen, config.fetchParams, dynamicParams]);

  // Use the fetch hook with computed parameters
  const fetchResult = config.useDataHook(fetchParams);

  // Flatten the infinite query data
  const flattenedData = useMemo(() => {
    return fetchResult.data?.pages?.flatMap((page: any) => page.data) || [];
  }, [fetchResult.data]);

  // Create header component
  const HeaderComponent = useMemo(() => {
    const Component = () => <config.header />;
    Component.displayName = `HeaderComponent_${activeScreen}`;
    return Component;
  }, [config.header, activeScreen]);

  const contextValue: SearchTabContextType = {
    // State
    activeScreen,
    setActiveScreen,

    // Data fetching
    data: flattenedData,
    fetchNextPage: fetchResult.fetchNextPage,
    hasNextPage: fetchResult.hasNextPage,
    isFetchingNextPage: fetchResult.isFetchingNextPage,
    refetch: fetchResult.refetch,
    isRefetching: fetchResult.isRefetching,

    // Components
    HeaderComponent,
    ItemComponent: config.item,

    // Navigation
    getDetailUrl: config.getDetailUrl,

    // Request params management
    updateRequestParams,
    fetchParams,
  };

  return (
    <SearchTabContext.Provider value={contextValue}>
      {children}
    </SearchTabContext.Provider>
  );
};