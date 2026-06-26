import React from 'react';
import { motion } from 'framer-motion';
import { Compass, BookOpen, UtensilsCrossed, Landmark, Navigation2, Store, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeOverlayProps {
  onSelect: (choice: string) => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onSelect }) => {
  const choices = [
    { id: 'ghats', label: 'Explore Ghats', icon: Compass, color: 'from-orange-500 to-amber-500' },
    { id: 'temples', label: 'Explore Temples', icon: Landmark, color: 'from-red-500 to-orange-600' },
    { id: 'food', label: 'Explore Food', icon: UtensilsCrossed, color: 'from-yellow-500 to-amber-600' },
    { id: 'markets', label: 'Explore Markets', icon: Store, color: 'from-blue-600 to-indigo-600' },
    { id: 'attractions', label: 'Explore Heritage', icon: BookOpen, color: 'from-teal-600 to-emerald-600' },
    { id: 'route', label: 'Plan a Route', icon: Navigation2, color: 'from-purple-600 to-indigo-600' },
    { id: 'festivals', label: 'Explore Festivals', icon: Sparkles, color: 'from-pink-500 to-rose-600' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="glass-panel w-full max-w-2xl p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
      >
        {/* Glow ambient background sphere */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-holyblue/20 rounded-full blur-3xl" />

        <motion.div variants={itemVariants} className="relative z-10">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 uppercase">
            Spiritual Center of the Universe
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-display font-black tracking-tight text-white">
            Welcome to Varanasi
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-300 font-medium italic">
            "Where would you like to begin your journey?"
          </p>
        </motion.div>

        {/* Options grid */}
        <motion.div 
          variants={itemVariants} 
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10"
        >
          {choices.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="group relative flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-500/25 rounded-2xl transition-all duration-300 text-left shadow-sm overflow-hidden"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-sans font-semibold text-white tracking-wide">{item.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 flex justify-center gap-4 relative z-10">
          <button
            onClick={() => onSelect('skip')}
            className="px-6 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition"
          >
            Skip & Explore Freely
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default WelcomeOverlay;
