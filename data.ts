
import { Restaurant, MenuItem } from './types';

export const CATEGORIES = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burgers', icon: '🍔' },
  { name: 'Biryani', icon: '🍛' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Healthy', icon: '🥗' },
  { name: 'Sushi', icon: '🍣' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'The Pizza Palace',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    deliveryTime: '25-35 min',
    category: 'Italian • Pizza',
    offer: '50% OFF up to $10',
    isPromo: true
  },
  {
    id: 'r2',
    name: 'Burger Bliss',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    deliveryTime: '15-25 min',
    category: 'American • Burgers',
    offer: 'Free Delivery',
  },
  {
    id: 'r3',
    name: 'Spice Route',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    deliveryTime: '30-45 min',
    category: 'Indian • Biryani',
    offer: 'Buy 1 Get 1 Free',
    isPromo: true
  },
  {
    id: 'r4',
    name: 'Sushi Zen',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    deliveryTime: '40-50 min',
    category: 'Japanese • Sushi',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Margherita Pizza',
    price: 12.99,
    description: 'Fresh basil, mozzarella, and sun-ripened tomatoes on a sourdough base.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=300',
    category: 'Best Sellers',
    addOns: [
      { id: 'a1', name: 'Extra Cheese', price: 2.50 },
      { id: 'a2', name: 'Fresh Garlic', price: 0.50 },
      { id: 'a3', name: 'Spicy Honey', price: 1.50 }
    ],
    removals: ['Basil', 'Fresh Tomato']
  },
  {
    id: 'm2',
    name: 'Double Cheeseburger',
    price: 9.50,
    description: 'Two smashed patties, secret sauce, and melted cheddar.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300',
    category: 'Best Sellers',
    addOns: [
      { id: 'a4', name: 'Bacon Strips', price: 3.00 },
      { id: 'a5', name: 'Extra Patty', price: 4.50 },
      { id: 'a6', name: 'Caramelized Onions', price: 1.00 }
    ],
    removals: ['Onions', 'Pickles', 'Secret Sauce']
  },
  {
    id: 'm3',
    name: 'Pepperoni Supreme',
    price: 15.99,
    description: 'Crispy pepperoni, black olives, and spicy jalapenos.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=300',
    category: 'Pizza',
    addOns: [
      { id: 'a7', name: 'Extra Pepperoni', price: 3.50 },
      { id: 'a8', name: 'Jalapenos', price: 1.00 }
    ],
    removals: ['Black Olives']
  },
  {
    id: 'm4',
    name: 'Truffle Fries',
    price: 6.99,
    description: 'Hand-cut fries tossed in truffle oil and parmesan.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=300',
    category: 'Sides',
    addOns: [
      { id: 'a9', name: 'Extra Parmesan', price: 1.50 },
      { id: 'a10', name: 'Spicy Mayo Dip', price: 1.00 }
    ]
  },
];
