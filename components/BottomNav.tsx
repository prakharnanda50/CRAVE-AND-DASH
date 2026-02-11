
import React from 'react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  setCurrentScreen: (s: Screen) => void;
  cartCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, setCurrentScreen, cartCount }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex items-center justify-around py-3 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
      <button 
        onClick={() => setCurrentScreen('HOME')}
        className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'HOME' ? 'text-chiliRed' : 'text-gray-400'}`}
      >
        <Home size={24} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Explore</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <Search size={24} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Search</span>
      </button>
      
      <button 
        onClick={() => setCurrentScreen('CART')}
        className={`flex flex-col items-center gap-1 relative transition-colors ${currentScreen === 'CART' ? 'text-chiliRed' : 'text-gray-400'}`}
      >
        <ShoppingBag size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-tomatoOrange text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-bold uppercase tracking-wider">Orders</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <User size={24} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
