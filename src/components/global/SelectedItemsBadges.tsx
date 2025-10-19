import { ScrollView, View } from 'react-native';

import FilterBadge from './FilterBadge';

interface SelectedItemsBadgesProps<T> {
  items: T[];
  getId: (item: T) => string | number;
  getLabel: (item: T) => string;
  onRemove: (item: T) => void;
}

export const SelectedItemsBadges = <T,>({ items, getId, getLabel, onRemove }: SelectedItemsBadgesProps<T>) => {
  if (items.length === 0) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {items.map(item => (
        <View key={getId(item)} className="mr-2">
          <FilterBadge label={getLabel(item)} onRemove={() => onRemove(item)} />
        </View>
      ))}
    </ScrollView>
  );
};

// For backward compatibility with regions
interface SelectedRegionsBadgesProps {
  selectedRegions: any[];
  onRemove: (region: any) => void;
}

export const SelectedRegionsBadges = ({ selectedRegions, onRemove }: SelectedRegionsBadgesProps) => {
  return <SelectedItemsBadges items={selectedRegions} getId={region => region.id} getLabel={region => region.name || ''} onRemove={onRemove} />;
};
