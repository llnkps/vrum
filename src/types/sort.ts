export type SortDirection = 3 | 4; // 3 = ascending, 4 = descending

export type SortMethod = {
  fieldName: string;
  direction: SortDirection;
};
