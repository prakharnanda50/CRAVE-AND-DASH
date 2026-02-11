
import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Info, Heart, Plus, X, ChevronRight } from 'lucide-react';
import { Restaurant, MenuItem, CustomizationOption } from '../types';
import { MENU_ITEMS } from '../data';

interface RestaurantDetailScreenProps {
  restaurant: Restaurant;
  onBack: () => void;
  onAddToCart: (item: MenuItem, addOns: CustomizationOption[], removals: string[], instructions: string) => void;
}

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({ restaurant, onBack, onAddToCart }) => {
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<CustomizationOption[]>([]);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');

  const handleAddClick = (item: MenuItem) => {
    if ((item.addOns && item.addOns.length > 0) || (item.removals && item.removals.length > 0)) {
      setCustomizingItem(item);
      setSelectedAddOns([]);
      setRemovedIngredients([]);
      setInstructions('');
    } else {
      onAddToCart(item, [], [], '');
    }
  };

  const toggleAddOn = (opt: CustomizationOption) => {
    setSelectedAddOns(prev => 
      prev.find(i => i.id === opt.id) ? prev.filter(i => i.id !== opt.id) : [...prev, opt]
    );
  };

  const toggleRemoval = (ing: string) => {
    setRemovedIngredients(prev => 
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  const currentTotalPrice = customizingItem 
    ? customizingItem.price + selectedAddOns.reduce((sum, opt) => sum + (opt.price || 0), 0)
    : 0;

  return (
    <div className="bg-white min-h-screen relative">
      {/* Header Image */}
      <div className="relative h-[300px] w-full">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-12 h-12 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button className="absolute top-6 right-6 w-12 h-12 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform">
          <Heart size={24} />
        </button>

        <div className="absolute -bottom-1 left-0 right-0 h-8 bg-white rounded-t-[3rem]"></div>
      </div>

      {/* Restaurant Info */}
      <div className="px-6 pb-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-charcoal">{restaurant.name}</h1>
            <p className="text-gray-400 font-medium text-sm">{restaurant.category}</p>
          </div>
          <div className="bg-cheeseYellow/20 px-3 py-2 rounded-2xl flex flex-col items-center">
            <Star size={20} className="text-cheeseYellow fill-cheeseYellow" />
            <span className="text-sm font-black text-charcoal mt-1">{restaurant.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 py-4 border-y border-gray-50">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-chiliRed" />
            <span className="text-sm font-bold">{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Info size={18} className="text-gray-400" />
            <span className="text-sm font-bold">Store Info</span>
          </div>
        </div>

        {/* Categories Menu */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 py-2">
          {['All Items', 'Best Sellers', 'Pizza', 'Sides', 'Beverages'].map((cat, idx) => (
            <button key={cat} className={`shrink-0 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${idx === 0 ? 'bg-chiliRed text-white shadow-lg' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-6 pt-4">
          <h2 className="text-xl font-extrabold tracking-tight">Menu Items</h2>
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-3xl bg-gray-50/50 border border-gray-100 group">
              <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-extrabold text-charcoal tracking-tight">{item.name}</h4>
                  <span className="text-chiliRed font-black">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2">{item.description}</p>
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => handleAddClick(item)}
                    className="flex items-center gap-2 bg-chiliRed text-white px-3 py-2 rounded-xl shadow-md active:scale-90 transition-transform font-bold text-xs"
                  >
                    <Plus size={16} />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customization Modal (Bottom Sheet) */}
      {customizingItem && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCustomizingItem(null)}></div>
          <div className="relative w-full max-w-md bg-white rounded-t-[3rem] p-8 shadow-2xl animate-slide-up space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between sticky top-0 bg-white py-2 z-10">
              <h3 className="text-2xl font-black tracking-tight">Customize Your Meal</h3>
              <button onClick={() => setCustomizingItem(null)} className="p-2 bg-gray-50 rounded-full text-gray-400">
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-4 items-center">
               <img src={customizingItem.image} className="w-20 h-20 rounded-2xl object-cover" />
               <div className="space-y-1">
                 <h4 className="text-xl font-bold">{customizingItem.name}</h4>
                 <p className="text-gray-400 text-sm font-medium">Base price: ${customizingItem.price.toFixed(2)}</p>
               </div>
            </div>

            {/* Add-ons */}
            {customizingItem.addOns && customizingItem.addOns.length > 0 && (
              <div className="space-y-4">
                <h5 className="font-black text-xs uppercase tracking-widest text-gray-400">Add-ons</h5>
                <div className="space-y-3">
                  {customizingItem.addOns.map(opt => (
                    <div 
                      key={opt.id} 
                      onClick={() => toggleAddOn(opt)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${selectedAddOns.find(i => i.id === opt.id) ? 'bg-chiliRed/5 border-chiliRed' : 'bg-gray-50 border-gray-100'}`}
                    >
                      <div className="flex items-center gap-3">
                         <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedAddOns.find(i => i.id === opt.id) ? 'bg-chiliRed border-chiliRed text-white' : 'bg-white border-gray-200'}`}>
                           {selectedAddOns.find(i => i.id === opt.id) && <Plus size={14} strokeWidth={4} />}
                         </div>
                         <span className="font-bold text-sm">{opt.name}</span>
                      </div>
                      <span className="text-chiliRed font-black text-sm">+${opt.price?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Removals */}
            {customizingItem.removals && customizingItem.removals.length > 0 && (
              <div className="space-y-4">
                <h5 className="font-black text-xs uppercase tracking-widest text-gray-400">Ingredients (Select to remove)</h5>
                <div className="flex flex-wrap gap-2">
                  {customizingItem.removals.map(ing => (
                    <button 
                      key={ing}
                      onClick={() => toggleRemoval(ing)}
                      className={`px-4 py-2 rounded-xl text-xs font-black tracking-tight border transition-all ${removedIngredients.includes(ing) ? 'bg-charcoal text-white border-charcoal' : 'bg-gray-50 text-gray-500 border-gray-100'}`}
                    >
                      {removedIngredients.includes(ing) ? `No ${ing}` : ing}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-4">
              <h5 className="font-black text-xs uppercase tracking-widest text-gray-400">Special Instructions</h5>
              <textarea 
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="E.g. Extra spicy, no cutlery please..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-chiliRed/20 outline-none h-24 transition-all"
              />
            </div>

            {/* Footer Add button */}
            <button 
              onClick={() => {
                onAddToCart(customizingItem, selectedAddOns, removedIngredients, instructions);
                setCustomizingItem(null);
              }}
              className="w-full bg-chiliRed text-white py-5 rounded-3xl font-extrabold text-lg shadow-2xl active:scale-95 transition-transform flex items-center justify-between px-8"
            >
              <span>Add to Cart</span>
              <span>${currentTotalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default RestaurantDetailScreen;
