
import React, { useState, useMemo, useEffect } from 'react';
import { Screen, Restaurant, CartItem, MenuItem, CustomizationOption } from './types';
import HomeScreen from './screens/HomeScreen';
import RestaurantDetailScreen from './screens/RestaurantDetailScreen';
import CartScreen from './screens/CartScreen';
import TrackingScreen from './screens/TrackingScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (
    item: MenuItem, 
    selectedAddOns: CustomizationOption[] = [], 
    removedIngredients: string[] = [], 
    instructions: string = ''
  ) => {
    const customizationKey = JSON.stringify({
      id: item.id,
      selectedAddOns: selectedAddOns.map(a => a.id).sort(),
      removedIngredients: removedIngredients.sort(),
      instructions
    });

    setCart(prev => {
      const existing = prev.find(i => i.uniqueId === customizationKey);
      if (existing) {
        return prev.map(i => i.uniqueId === customizationKey ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { 
        ...item, 
        quantity: 1, 
        selectedAddOns, 
        removedIngredients, 
        instructions, 
        uniqueId: customizationKey 
      }];
    });
  };

  const updateQuantity = (uniqueId: string, delta: number) => {
    setCart(prev => {
      const item = prev.find(i => i.uniqueId === uniqueId);
      if (!item) return prev;
      if (item.quantity + delta <= 0) {
        return prev.filter(i => i.uniqueId !== uniqueId);
      }
      return prev.map(i => i.uniqueId === uniqueId ? { ...i, quantity: i.quantity + delta } : i);
    });
  };

  const clearCart = () => setCart([]);

  const navigateToDetails = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentScreen('DETAILS');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return <HomeScreen onSelectRestaurant={navigateToDetails} />;
      case 'DETAILS':
        return selectedRestaurant ? (
          <RestaurantDetailScreen 
            restaurant={selectedRestaurant} 
            onBack={() => setCurrentScreen('HOME')} 
            onAddToCart={addToCart}
          />
        ) : null;
      case 'CART':
        return (
          <CartScreen 
            cart={cart} 
            onUpdateQuantity={updateQuantity} 
            onPlaceOrder={() => setCurrentScreen('TRACKING')}
            onBack={() => setCurrentScreen('HOME')}
          />
        );
      case 'TRACKING':
        return <TrackingScreen onBack={() => {
          clearCart();
          setCurrentScreen('HOME');
        }} />;
      default:
        return <HomeScreen onSelectRestaurant={navigateToDetails} />;
    }
  };

  const totalItems = useMemo(() => cart.reduce((acc, curr) => acc + curr.quantity, 0), [cart]);
  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const addOnsPrice = item.selectedAddOns.reduce((sum, opt) => sum + (opt.price || 0), 0);
      return acc + (item.price + addOnsPrice) * item.quantity;
    }, 0);
  }, [cart]);

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[200] bg-chiliRed flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-6 animate-splash">
          <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl rotate-12">
            🍕
          </div>
          <h1 className="text-white text-4xl font-black tracking-tighter">Crave & Dash</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col shadow-xl bg-creamWhite animate-fade-in-up">
      <main className="flex-1 pb-24">
        {renderScreen()}
      </main>
      
      {currentScreen !== 'DETAILS' && currentScreen !== 'TRACKING' && (
        <BottomNav 
          currentScreen={currentScreen} 
          setCurrentScreen={setCurrentScreen} 
          cartCount={totalItems} 
        />
      )}

      {currentScreen === 'DETAILS' && totalItems > 0 && (
        <button 
          onClick={() => setCurrentScreen('CART')}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-chiliRed text-white py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-between px-6 transform transition-transform active:scale-95 animate-bounce-subtle z-50"
        >
          <div className="flex items-center gap-3">
            <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">{totalItems}</span>
            <span>View Cart</span>
          </div>
          <span className="font-black">${cartTotal.toFixed(2)}</span>
        </button>
      )}
    </div>
  );
};

export default App;
