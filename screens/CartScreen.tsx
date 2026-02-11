
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Minus, Plus, Ticket, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (uniqueId: string, delta: number) => void;
  onPlaceOrder: () => void;
  onBack: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ cart, onUpdateQuantity, onPlaceOrder, onBack }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isCouponApplying, setIsCouponApplying] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const subtotal = cart.reduce((acc, item) => {
    const addOnsPrice = item.selectedAddOns.reduce((sum, opt) => sum + (opt.price || 0), 0);
    return acc + (item.price + addOnsPrice) * item.quantity;
  }, 0);
  
  const deliveryFee = 2.99;
  const serviceFee = 1.50;
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = subtotal + deliveryFee + serviceFee - discountAmount;

  const applyCoupon = () => {
    if (!couponCode) return;
    setIsCouponApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsCouponApplying(false);
      if (couponCode.toUpperCase() === 'CRAVE20') {
        setAppliedDiscount(20);
        triggerConfetti();
      } else {
        alert("Invalid coupon code. Try 'CRAVE20'");
      }
    }, 1200);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    // Simulate kitchen confirmation animation
    setTimeout(() => {
      onPlaceOrder();
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 space-y-6 text-center animate-fade-in-up">
        <div className="w-48 h-48 bg-creamWhite rounded-full flex items-center justify-center text-8xl animate-bounce-subtle">
          🥡
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black">Your cart is empty</h2>
          <p className="text-gray-400 font-medium">Looks like you haven't discovered your craving yet.</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-chiliRed text-white px-8 py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-transform"
        >
          Explore Food
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 flex flex-col min-h-screen bg-white relative">
      {/* Confetti Elements */}
      {showConfetti && Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="confetti" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            backgroundColor: ['#E63946', '#FF6B35', '#FFC857', '#2ECC71'][Math.floor(Math.random() * 4)],
            animationDelay: `${Math.random() * 0.5}s`
          }} 
        />
      ))}

      {/* Placing Order Overlay */}
      {isPlacingOrder && (
        <div className="fixed inset-0 z-[110] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-10 text-center animate-fade-in">
          <div className="relative w-32 h-32 mb-8">
            <Loader2 className="w-32 h-32 text-chiliRed animate-spin stroke-[3px]" />
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🍳</div>
          </div>
          <h2 className="text-3xl font-black mb-2 animate-bounce-subtle">Sending to Kitchen...</h2>
          <p className="text-gray-400 font-medium">Prepping the freshest ingredients for you!</p>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-gray-50 rounded-xl active:scale-90 transition-transform">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black tracking-tight">My Order</h1>
      </div>

      <div className="flex-1 space-y-8 pb-10 overflow-y-auto">
        {cart.map((item, idx) => {
          const itemBasePlusAddOns = item.price + item.selectedAddOns.reduce((sum, o) => sum + (o.price || 0), 0);
          return (
            <div key={item.uniqueId} className="flex gap-4 items-start animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 shrink-0 shadow-sm">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="font-extrabold tracking-tight text-charcoal">{item.name}</h4>
                  <p className="text-chiliRed font-black text-sm">${itemBasePlusAddOns.toFixed(2)}</p>
                </div>
                
                <div className="space-y-1">
                  {item.selectedAddOns.length > 0 && (
                    <p className="text-[10px] text-gray-500 font-bold leading-tight">
                      <span className="text-basilGreen">Add:</span> {item.selectedAddOns.map(a => a.name).join(', ')}
                    </p>
                  )}
                  {item.removedIngredients.length > 0 && (
                    <p className="text-[10px] text-gray-500 font-bold leading-tight">
                      <span className="text-chiliRed/60">Remove:</span> {item.removedIngredients.join(', ')}
                    </p>
                  )}
                  {item.instructions && (
                    <p className="text-[10px] text-tomatoOrange font-bold italic leading-tight">
                      "{item.instructions}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                    <button 
                      onClick={() => onUpdateQuantity(item.uniqueId, -1)}
                      className="p-1 text-gray-400 hover:text-chiliRed transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-black text-xs w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.uniqueId, 1)}
                      className="p-1 text-gray-400 hover:text-chiliRed transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-black text-charcoal text-sm">
                    ${(itemBasePlusAddOns * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Promo Code Section */}
        <div className={`transition-all duration-500 ${appliedDiscount > 0 ? 'bg-basilGreen/10 border-basilGreen animate-success-pop' : 'bg-cheeseYellow/10 border-cheeseYellow/30'} border-2 border-dashed p-4 rounded-2xl flex items-center gap-3`}>
          <Ticket className={appliedDiscount > 0 ? 'text-basilGreen' : 'text-cheeseYellow'} />
          <input 
            type="text" 
            placeholder={appliedDiscount > 0 ? "COUPON APPLIED!" : "Apply Promo Code"} 
            value={couponCode}
            disabled={appliedDiscount > 0}
            onChange={(e) => setCouponCode(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 font-bold text-sm uppercase placeholder:text-gray-400"
          />
          {appliedDiscount > 0 ? (
            <CheckCircle className="text-basilGreen animate-check" size={20} />
          ) : (
            <button 
              onClick={applyCoupon}
              disabled={isCouponApplying}
              className="text-chiliRed font-black text-xs flex items-center gap-1 active:scale-95 transition-transform"
            >
              {isCouponApplying ? <Loader2 size={12} className="animate-spin" /> : 'APPLY'}
            </button>
          )}
        </div>
      </div>

      {/* Bill Breakdown */}
      <div className="space-y-4 pt-6 border-t border-gray-50 mt-auto bg-white">
        <div className="flex justify-between text-gray-400 font-bold text-sm">
          <span>Subtotal</span>
          <span className="text-charcoal">${subtotal.toFixed(2)}</span>
        </div>
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-basilGreen font-bold text-sm animate-fade-in">
            <span>Discount ({appliedDiscount}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-400 font-bold text-sm">
          <span>Delivery Fee</span>
          <span className="text-charcoal">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400 font-bold text-sm">
          <span>Service Fee</span>
          <span className="text-charcoal">${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-xl font-black">Total</span>
          <span className="text-3xl font-black text-chiliRed">${total.toFixed(2)}</span>
        </div>

        <button 
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="w-full bg-chiliRed text-white py-5 rounded-3xl font-extrabold text-lg shadow-2xl active:scale-95 transition-transform mt-4 flex items-center justify-center gap-2 group"
        >
          {isPlacingOrder ? 'Processing...' : (
            <>
              Confirm & Place Order <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
