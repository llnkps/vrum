import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { BACKEND_FILTERS, BackendFilterKey, FilterOptionType } from '@/types/filter';

// Base filter config
interface BaseFilterConfig {
  key: BackendFilterKey;
  type: 'range' | 'boolean' | 'array' | 'single';
  labelKey: string;
}

// Range filter config
interface RangeFilterConfig extends BaseFilterConfig {
  type: 'range';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

// Boolean filter config
interface BooleanFilterConfig extends BaseFilterConfig {
  type: 'boolean';
}

// Array filter config
interface ArrayFilterConfig extends BaseFilterConfig {
  type: 'array';
  options: ReadonlyArray<{
    labelKey: string;
    value: string | number;
    disabled?: boolean;
  }>;
}

// Single filter config
interface SingleFilterConfig extends BaseFilterConfig {
  type: 'single';
  options: ReadonlyArray<{
    labelKey: string;
    value: string | number;
    disabled?: boolean;
  }>;
}

// Exported FilterConfig interface for consumers
export interface FilterConfig {
  key: BackendFilterKey;
  type: 'range' | 'boolean' | 'array' | 'single';
  label: string;
  placeholder?: string;
  options?: readonly FilterOptionType[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

// Main filter registry with translations
const FILTER_CONFIGS = {
  // Transmission
  [BACKEND_FILTERS.TRANSMISSION]: {
    key: BACKEND_FILTERS.TRANSMISSION,
    type: 'array' as const,
    labelKey: 'filters.transmission.label',
    options: [
      { labelKey: 'filters.transmission.manual', value: 'manual' },
      { labelKey: 'filters.transmission.automatic', value: 'automatic' },
      { labelKey: 'filters.transmission.robot', value: 'robot' },
      { labelKey: 'filters.transmission.variator', value: 'variator' },
    ],
  },

  // Fuel Type
  [BACKEND_FILTERS.FUEL_TYPE]: {
    key: BACKEND_FILTERS.FUEL_TYPE,
    type: 'array' as const,
    labelKey: 'filters.fuelType.label',
    options: [
      { labelKey: 'filters.fuelType.petrol', value: 'petrol' },
      { labelKey: 'filters.fuelType.diesel', value: 'diesel' },
      { labelKey: 'filters.fuelType.electric', value: 'electric' },
      { labelKey: 'filters.fuelType.hybrid', value: 'hybrid' },
      { labelKey: 'filters.fuelType.gas', value: 'gas' },
    ],
  },

  // Drivetrain
  [BACKEND_FILTERS.DRIVETRAIN_TYPE]: {
    key: BACKEND_FILTERS.DRIVETRAIN_TYPE,
    type: 'array' as const,
    labelKey: 'filters.drivetrain.label',
    options: [
      { labelKey: 'filters.drivetrain.fwd', value: 'fwd' },
      { labelKey: 'filters.drivetrain.rwd', value: 'rwd' },
      { labelKey: 'filters.drivetrain.awd', value: 'awd' },
      { labelKey: 'filters.drivetrain.fourwd', value: 'fourwd' },
    ],
  },

  // Frame Type
  [BACKEND_FILTERS.FRAME_TYPE]: {
    key: BACKEND_FILTERS.FRAME_TYPE,
    type: 'array' as const,
    labelKey: 'filters.frameType.label',
    options: [
      { labelKey: 'filters.frameType.sedan', value: 'sedan' },
      { labelKey: 'filters.frameType.hatchback', value: 'hatchback' },
      { labelKey: 'filters.frameType.suv', value: 'suv' },
      { labelKey: 'filters.frameType.crossover', value: 'crossover' },
      { labelKey: 'filters.frameType.coupe', value: 'coupe' },
      { labelKey: 'filters.frameType.convertible', value: 'convertible' },
      { labelKey: 'filters.frameType.wagon', value: 'wagon' },
      { labelKey: 'filters.frameType.pickup', value: 'pickup' },
      { labelKey: 'filters.frameType.van', value: 'van' },
      { labelKey: 'filters.frameType.minivan', value: 'minivan' },
    ],
  },

  // Color
  [BACKEND_FILTERS.COLOR]: {
    key: BACKEND_FILTERS.COLOR,
    type: 'array' as const,
    labelKey: 'filters.color.label',
    options: [
      { labelKey: 'filters.color.white', value: 'white' },
      { labelKey: 'filters.color.black', value: 'black' },
      { labelKey: 'filters.color.silver', value: 'silver' },
      { labelKey: 'filters.color.gray', value: 'gray' },
      { labelKey: 'filters.color.blue', value: 'blue' },
      { labelKey: 'filters.color.red', value: 'red' },
      { labelKey: 'filters.color.green', value: 'green' },
      { labelKey: 'filters.color.brown', value: 'brown' },
      { labelKey: 'filters.color.beige', value: 'beige' },
      { labelKey: 'filters.color.orange', value: 'orange' },
      { labelKey: 'filters.color.purple', value: 'purple' },
      { labelKey: 'filters.color.yellow', value: 'yellow' },
      { labelKey: 'filters.color.other', value: 'other' },
    ],
  },

  // Condition
  [BACKEND_FILTERS.CONDITION]: {
    key: BACKEND_FILTERS.CONDITION,
    type: 'array' as const,
    labelKey: 'filters.condition.label',
    options: [
      { labelKey: 'filters.condition.excellent', value: 'excellent' },
      { labelKey: 'filters.condition.good', value: 'good' },
      { labelKey: 'filters.condition.satisfactory', value: 'satisfactory' },
      { labelKey: 'filters.condition.requiresRepair', value: 'requires_repair' },
      { labelKey: 'filters.condition.damaged', value: 'damaged' },
    ],
  },

  // Seller
  [BACKEND_FILTERS.SELLER]: {
    key: BACKEND_FILTERS.SELLER,
    type: 'array' as const,
    labelKey: 'filters.seller.label',
    options: [
      { labelKey: 'filters.seller.owner', value: 'owner' },
      { labelKey: 'filters.seller.private', value: 'private' },
      { labelKey: 'filters.seller.company', value: 'company' },
    ],
  },

  // Document Type
  [BACKEND_FILTERS.DOCUMENT_TYPE]: {
    key: BACKEND_FILTERS.DOCUMENT_TYPE,
    type: 'array' as const,
    labelKey: 'filters.documentType.label',
    options: [
      { labelKey: 'filters.documentType.original', value: 'original' },
      { labelKey: 'filters.documentType.duplicate', value: 'duplicate' },
      { labelKey: 'filters.documentType.missing', value: 'missing' },
    ],
  },

  // Number of Owners
  [BACKEND_FILTERS.NUMBER_OF_OWNER]: {
    key: BACKEND_FILTERS.NUMBER_OF_OWNER,
    type: 'array' as const,
    labelKey: 'filters.numberOfOwners.label',
    options: [
      { labelKey: 'filters.numberOfOwners.1', value: 1 },
      { labelKey: 'filters.numberOfOwners.2', value: 2 },
      { labelKey: 'filters.numberOfOwners.3', value: 3 },
      { labelKey: 'filters.numberOfOwners.4plus', value: '4+' },
    ],
  },

  // Wheel Type
  [BACKEND_FILTERS.WHEEL_TYPE]: {
    key: BACKEND_FILTERS.WHEEL_TYPE,
    type: 'array' as const,
    labelKey: 'filters.wheelType.label',
    options: [
      { labelKey: 'filters.wheelType.left', value: 'left' },
      { labelKey: 'filters.wheelType.right', value: 'right' },
    ],
  },

  // Trade Allow
  [BACKEND_FILTERS.TRADE_ALLOW]: {
    key: BACKEND_FILTERS.TRADE_ALLOW,
    type: 'boolean' as const,
    labelKey: 'filters.tradeAllow.label',
  },

  // With Image
  [BACKEND_FILTERS.WITH_IMAGE]: {
    key: BACKEND_FILTERS.WITH_IMAGE,
    type: 'boolean' as const,
    labelKey: 'filters.withImage.label',
  },

  // Unsold
  [BACKEND_FILTERS.UNSOLD]: {
    key: BACKEND_FILTERS.UNSOLD,
    type: 'boolean' as const,
    labelKey: 'filters.unsold.label',
  },

  // Engine Capacity (Range)
  [BACKEND_FILTERS.ENGINE_CAPACITY]: {
    key: BACKEND_FILTERS.ENGINE_CAPACITY,
    type: 'range' as const,
    labelKey: 'filters.engine_capacity.label',
    placeholder: 'filters.engine_capacity.placeholder',
    min: 0.5,
    max: 10.0,
    step: 0.1,
    unit: 'L',
  },

  // Power (Range)
  [BACKEND_FILTERS.POWER]: {
    key: BACKEND_FILTERS.POWER,
    type: 'range' as const,
    labelKey: 'filters.power.label',
    placeholder: 'filters.power.placeholder',
    min: 50,
    max: 1000,
    step: 10,
    unit: 'HP',
  },

  // Mileage (Range)
  [BACKEND_FILTERS.MILEAGE]: {
    key: BACKEND_FILTERS.MILEAGE,
    type: 'range' as const,
    labelKey: 'filters.mileage.label',
    placeholder: 'filters.mileage.placeholder',
    min: 0,
    max: 500000,
    step: 1000,
    unit: 'km',
  },

  // Year (Range) - Note: This might be handled separately
  [BACKEND_FILTERS.FIRM_COUNTRY_GROUP]: {
    key: BACKEND_FILTERS.FIRM_COUNTRY_GROUP,
    type: 'array' as const,
    labelKey: 'filters.firmCountryGroup.label',
    options: [
      { labelKey: 'filters.firmCountryGroup.european', value: 'european' },
      { labelKey: 'filters.firmCountryGroup.asian', value: 'asian' },
      { labelKey: 'filters.firmCountryGroup.american', value: 'american' },
    ],
  },

  // Damaged Type
  [BACKEND_FILTERS.DAMANGED_TYPE]: {
    key: BACKEND_FILTERS.DAMANGED_TYPE,
    type: 'array' as const,
    labelKey: 'filters.damagedType.label',
    options: [
      { labelKey: 'filters.damagedType.notDamaged', value: 'not_damaged' },
      { labelKey: 'filters.damagedType.lightDamage', value: 'light_damage' },
      { labelKey: 'filters.damagedType.mediumDamage', value: 'medium_damage' },
      { labelKey: 'filters.damagedType.heavyDamage', value: 'heavy_damage' },
    ],
  },

  // Sell Location
  [BACKEND_FILTERS.SELL_LOCATION]: {
    key: BACKEND_FILTERS.SELL_LOCATION,
    type: 'array' as const,
    labelKey: 'filters.sellLocation.label',
    options: [
      // This would typically be populated with region data
      { labelKey: 'filters.sellLocation.kyiv', value: 'kyiv' },
      { labelKey: 'filters.sellLocation.lviv', value: 'lviv' },
      { labelKey: 'filters.sellLocation.odesa', value: 'odesa' },
    ],
  },
} as const;

// Hook to get translated filter configurations
export const useFilterConfigs = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    const translatedConfigs: Record<BackendFilterKey, FilterConfig> = {} as any;

    Object.entries(FILTER_CONFIGS).forEach(([key, config]) => {
      const baseConfig = {
        key: config.key,
        type: config.type,
        label: t(config.labelKey),
      };

      // Handle different config types
      if (config.type === 'range') {
        translatedConfigs[key as BackendFilterKey] = {
          ...baseConfig,
          placeholder: (config as RangeFilterConfig).placeholder ? t((config as RangeFilterConfig).placeholder!) : undefined,
          min: (config as RangeFilterConfig).min,
          max: (config as RangeFilterConfig).max,
          step: (config as RangeFilterConfig).step,
          unit: (config as RangeFilterConfig).unit,
        } as FilterConfig;
      } else if (config.type === 'array') {
        translatedConfigs[key as BackendFilterKey] = {
          ...baseConfig,
          options: (config as ArrayFilterConfig).options?.map(option => ({
            label: t(option.labelKey),
            value: option.value,
            disabled: option.disabled,
          })),
        } as FilterConfig;
      } else {
        // boolean
        translatedConfigs[key as BackendFilterKey] = baseConfig as FilterConfig;
      }
    });

    return translatedConfigs;
  }, [t]);
};

// Utility functions
export const getFilterConfig = (key: BackendFilterKey) => {
  return FILTER_CONFIGS[key];
};

export const isRangeFilter = (key: BackendFilterKey): boolean => {
  return FILTER_CONFIGS[key]?.type === 'range';
};

export const isBooleanFilter = (key: BackendFilterKey): boolean => {
  return FILTER_CONFIGS[key]?.type === 'boolean';
};

export const isArrayFilter = (key: BackendFilterKey): boolean => {
  return FILTER_CONFIGS[key]?.type === 'array';
};
