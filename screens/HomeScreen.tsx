
import React from 'react';
import { MapPin, Bell, Search, Star, Clock } from 'lucide-react';
import { CATEGORIES, RESTAURANTS } from '../data';
import { Restaurant } from '../types';

interface HomeScreenProps {
  onSelectRestaurant: (r: Restaurant) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectRestaurant }) => {
  return (
    <div className="px-5 py-6 space-y-8 animate-fade-in-up">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-chiliRed/10 rounded-full flex items-center justify-center text-chiliRed">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Deliver to</p>
            <h3 className="text-sm font-bold flex items-center gap-1">
              San Francisco, CA <span className="text-chiliRed">▼</span>
            </h3>
          </div>
        </div>
        <button className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
          <Bell size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative h-44 w-full bg-gradient-to-r from-chiliRed to-tomatoOrange rounded-3xl overflow-hidden p-6 text-white shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="relative z-10 space-y-2 w-3/5">
          <span className="bg-cheeseYellow/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-cheeseYellow/50">Limited Offer</span>
          <h2 className="text-2xl font-extrabold leading-tight">Get 40% OFF on your first order</h2>
          <button className="bg-white text-chiliRed px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm active:scale-95 transition-transform">
            Order Now
          </button>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400" 
          alt="Delicious Food"
          className="absolute -right-10 -bottom-10 w-64 h-64 object-cover opacity-60 rotate-12 blur-sm"
        />
      </div>

      {/* Sticky Search Hint */}
      <div className="sticky top-4 z-40 bg-white/90 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-3">
        <Search size={20} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="What are you craving today?" 
          className="bg-transparent border-none outline-none text-sm w-full font-medium"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold tracking-tight">Categories</h2>
          <button className="text-chiliRed text-xs font-bold">View all</button>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2">
          {CATEGORIES.map((cat, idx) => (
            <button 
              key={cat.name} 
              className="flex flex-col items-center gap-2 group shrink-0 animate-fade-in-up" 
              style={{ animationDelay: `${0.3 + idx * 0.05}s` }}
            >
              <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-active:scale-90 transition-transform">
                {cat.icon}
              </div>
              <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-tighter">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Restaurants List */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold tracking-tight">Popular Near You</h2>
          <button className="text-chiliRed text-xs font-bold">Sort By ▼</button>
        </div>
        <div className="space-y-6">
          {RESTAURANTS.map((res, idx) => (
            <div 
              key={res.id} 
              onClick={() => onSelectRestaurant(res)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform cursor-pointer group animate-fade-in-up"
              style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img src={res.image} alt={res.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                {res.offer && (
                  <div className="absolute top-4 left-4 bg-tomatoOrange text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 animate-bounce-subtle">
                    {res.offer}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md">
                    <Star size={14} className="text-cheeseYellow fill-cheeseYellow" />
                    <span className="text-xs font-extrabold">{res.rating}</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md">
                    <Clock size={14} className="text-chiliRed" />
                    <span className="text-xs font-extrabold">{res.deliveryTime}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-extrabold text-charcoal tracking-tight">{res.name}</h3>
                <p className="text-gray-400 text-sm font-medium">{res.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
