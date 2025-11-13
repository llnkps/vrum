// Backend filter keys (from existing filters.ts)
export const BACKEND_FILTERS = {
  BRAND: 'brand',
  MODEL: 'model',
  GENERATION: 'generation',
  MODIFICATION: 'modification',

  TRANSMISSION: 'transmission',
  FUEL_TYPE: 'fuel_type',
  ENGINE_CAPACITY: 'engine_capacity',
  DRIVETRAIN_TYPE: 'drivetrain_type',
  UNSOLD: 'unsold',
  WITH_IMAGE: 'with_image',
  FRAME_TYPE: 'frame_type',
  COLOR: 'color',
  DOCUMENT_TYPE: 'document_type',
  DAMANGED_TYPE: 'damanged_type',
  WHEEL_TYPE: 'wheel_type',
  POWER: 'power',
  MILEAGE: 'mileage',
  FIRM_COUNTRY_GROUP: 'firm_country_group',
  SELLER: 'seller',
  SELL_LOCATION: 'sell_location',
  NUMBER_OF_OWNER: 'number_of_owner',
  TRADE_ALLOW: 'trade_allow',
  CONDITION: 'condition',
  YEAR: 'year',
  PRICE: 'price',
} as const;

export type BackendFilterKey = (typeof BACKEND_FILTERS)[keyof typeof BACKEND_FILTERS];

export type RangeFilterType = {
  from?: number;
  to?: number;
};

// for storage of filter values
export type SelectFilterType = {
  [index: number | string]: string;
};

export type FilterValue = string | number | boolean | string[] | RangeFilterType | SelectFilterType;

// for select fields
export type FilterOptionType = {
  label: string;
  value: string;
}
