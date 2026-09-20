export interface ProductItem {
  id: string;
  name: string;
  subtitle?: string;
  category: 'combo' | 'promo' | 'tradicional' | 'especial';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  badge?: string;
  ingredients?: string[];
  popular?: boolean;
}

export interface ToppingOption {
  id: string;
  name: string;
  category: 'calda' | 'fruta' | 'crocante' | 'creme';
  price: number;
  image?: string;
  freeCountAllowed?: boolean;
}

export interface CustomAcaiOrder {
  id: string;
  size: {
    name: string;
    ml: string;
    price: number;
  };
  base: string;
  syrups: string[];
  fruits: string[];
  toppings: string[];
  observation?: string;
  totalPrice: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  type: 'product' | 'custom';
  title: string;
  details?: string[];
  unitPrice: number;
  quantity: number;
  image?: string;
}
