export interface ListingItem {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  status: 'active' | 'archived' | 'sold';
  createdAt: Date;
  updatedAt: Date;
}