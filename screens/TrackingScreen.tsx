
import React, { useEffect, useState } from 'react';
// Added Star to the lucide-react imports to fix line 91
import { ArrowLeft, Phone, MessageSquare, CheckCircle, Package, Bike, Home, Star } from 'lucide-react';

interface TrackingScreenProps {
  onBack: () => void;
}

const TrackingScreen: React.FC<TrackingScreenProps> = ({ onBack }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { icon: <CheckCircle size={20} />, label: 'Confirmed', desc: 'Order is being processed' },
    { icon: <Package size={20} />, label: 'Preparing', desc: 'Chef is working on it' },
    { icon: <Bike size={20} />, label: 'On the Way', desc: 'Your rider is nearby' },
    { icon: <Home size={20} />, label: 'Delivered', desc: 'Enjoy your meal!' },
  ];

  return (
    <div className="bg-creamWhite min-h-screen">
      {/* Map Mockup */}
      <div className="h-[45vh] w-full relative bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
          alt="Map" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center active:scale-90 transition-transform"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Floating Rider Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-chiliRed p-3 rounded-full shadow-2xl animate-bounce-subtle border-4 border-white">
          <Bike className="text-white" size={32} />
        </div>
      </div>

      {/* Tracking Details */}
      <div className="relative -mt-10 bg-white rounded-t-[3rem] p-8 shadow-2xl space-y-8 min-h-[55vh]">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight">Estimated Arrival</h1>
            <p className="text-4xl font-black text-chiliRed">15-20 mins</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order ID</p>
            <p className="font-bold">#CRV-92384</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="relative flex justify-between items-start">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-100 -z-10">
            <div 
              className="h-full bg-basilGreen transition-all duration-1000" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-colors ${idx <= step ? 'bg-basilGreen text-white' : 'bg-gray-100 text-gray-400'}`}>
                {s.icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${idx <= step ? 'text-basilGreen' : 'text-gray-300'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Rider Info */}
        <div className="bg-gray-50/80 p-5 rounded-[2.5rem] border border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" alt="Rider" />
          </div>
          <div className="flex-1">
            <h4 className="font-black">Carlos Mendoza</h4>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-cheeseYellow fill-cheeseYellow" />
              <span className="text-xs font-bold">4.9 Rider</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-chiliRed active:scale-90 transition-transform">
              <MessageSquare size={20} />
            </button>
            <button className="w-12 h-12 bg-basilGreen rounded-2xl shadow-sm flex items-center justify-center text-white active:scale-90 transition-transform">
              <Phone size={20} />
            </button>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="w-full py-4 text-gray-400 text-xs font-black uppercase tracking-widest hover:text-chiliRed transition-colors"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default TrackingScreen;
