
export interface CustomizationOption {
  id: string;
  name: string;
  price?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  category: string;
  offer?: string;
  isPromo?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  addOns?: CustomizationOption[];
  removals?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedAddOns: CustomizationOption[];
  removedIngredients: string[];
  instructions: string;
  uniqueId: string;
}

export type Screen = 'HOME' | 'DETAILS' | 'CART' | 'TRACKING';
