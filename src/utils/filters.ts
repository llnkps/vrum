// Filter types that the backend can handle
export const BACKEND_FILTERS = {
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
} as const;

export type BackendFilterKey = (typeof BACKEND_FILTERS)[keyof typeof BACKEND_FILTERS];

// Range filter types for numeric ranges
export const RANGE_FILTERS = {
  ENGINE_CAPACITY: 'engine_capacity',
  POWER: 'power',
  MILEAGE: 'mileage',
  YEAR: 'year',
  PRICE: 'price',
} as const;

export type RangeFilterKey = (typeof RANGE_FILTERS)[keyof typeof RANGE_FILTERS];

// Boolean filter types
export const BOOLEAN_FILTERS = {
  UNSOLD: 'unsold',
  WITH_IMAGE: 'with_image',
  TRADE_ALLOW: 'trade_allow',
} as const;

export type BooleanFilterKey = (typeof BOOLEAN_FILTERS)[keyof typeof BOOLEAN_FILTERS];

// Array filter types (multiple selection)
export const ARRAY_FILTERS = {
  TRANSMISSION: 'transmission',
  FUEL_TYPE: 'fuel_type',
  DRIVETRAIN_TYPE: 'drivetrain_type',
  FRAME_TYPE: 'frame_type',
  COLOR: 'color',
  DOCUMENT_TYPE: 'document_type',
  DAMANGED_TYPE: 'damanged_type',
  WHEEL_TYPE: 'wheel_type',
  FIRM_COUNTRY_GROUP: 'firm_country_group',
  SELLER: 'seller',
  SELL_LOCATION: 'sell_location',
  NUMBER_OF_OWNER: 'number_of_owner',
  CONDITION: 'condition',
} as const;

export type ArrayFilterKey = (typeof ARRAY_FILTERS)[keyof typeof ARRAY_FILTERS];
