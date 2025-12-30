export interface Review {
  id: number;
  text: string;
}

export type TabType = 'form' | 'selection' | 'explore';

export interface FilterOption {
  label: string;
  value: string;
}

export interface CategoryGroup {
  title: string;
  icon: any;
  options: FilterOption[];
}