export type FavoriteItem = {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  tag?: string;
  description?: string;
  location?: string;
  images?: string[];
};

export type SubscriptionItem = {
  id: string;
  brand: string;
  model: string;
  info: string;
  count: string;
  logo: string;
};
