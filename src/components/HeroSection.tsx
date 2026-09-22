import React from 'react';
import { ShoppingBag, Sparkles, ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';
import { HERO_ASSETS } from '../data/products';

interface HeroSectionProps {
  onOpenCustomizer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCustomizer }) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] md:min-h-[680px] flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#2a0117]"
    >
      {/* Full-Bleed Hero Background Image covering 100% of the Hero */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img
          src={HERO_ASSETS.heroCups}
          alt="Açaí Cremoso com Morangos, Leite Ninho e Nutella"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center md:object-right scale-105 transform filter brightness-90 contrast-105"
        />
        {/* Layered cinematic gradients for flawless contrast on text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a0117] via-[#2a0117]/70 to-[#2a0117]/40 md:bg-gradient-to-r md:from-[#2a0117] md:via-[#2a0117]/85 md:to-transparent"></div>
        <div className="absolute inset-0 bg-[#38011e]/40 mix-blend-multiply"></div>
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl text-center md:text-left space-y-6">
          
          {/* Tag badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5a0632]/85 border border-[#fbbf24]/30 backdrop-blur-md text-[#fce7f3] text-xs sm:text-sm font-semibold shadow-lg">
            <Sparkles className="w-4 h-4 text-[#fbbf24] animate-pulse" />
            <span>Açaí Artesanal 100% Puro • Cremosidade Incomparável</span>
          </div>

          {/* Giant Headline: "JÁ TOMOU SEU AÇAÍ HOJE?" */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight uppercase leading-[0.95] drop-shadow-lg">
              <span className="text-[#fbbf24] block mb-1">
                JÁ TOMOU
              </span>
              <span className="text-white block font-extrabold tracking-tight">
                SEU AÇAÍ HOJE?
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-[#fce7f3] text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed font-normal drop-shadow">
            Aquele açaí cremoso de verdade, preparado com ingredientes selecionados, camadas generosas de leite Ninho, Nutella pura e frutas frescas fatiadas na hora.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <a
              id="hero-cta-combos"
              href="#combos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#eab308] hover:from-[#facc15] hover:to-[#d97706] text-[#32011a] font-black text-base uppercase tracking-wider shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Fazer Pedido</span>
            </a>

            <button
              id="hero-cta-monte"
              onClick={onOpenCustomizer}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black/40 hover:bg-black/60 text-white font-bold text-base border border-white/30 backdrop-blur-md transition-all hover:border-[#fbbf24] hover:text-[#fbbf24] cursor-pointer"
            >
              <span>Monte Seu Açaí</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Micro proof badges */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-4 text-center md:text-left">
            <div className="p-3 rounded-2xl bg-[#2a0117]/80 backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex items-center justify-center md:justify-start gap-1 mb-0.5">
                <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                <span className="text-base sm:text-lg font-black text-[#fbbf24]">4.9 / 5</span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#fce7f3]/80 leading-tight block">+3.200 avaliações</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#2a0117]/80 backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex items-center justify-center md:justify-start gap-1 mb-0.5">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-base sm:text-lg font-black text-white">30-45m</span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#fce7f3]/80 leading-tight block">Entrega expressa</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#2a0117]/80 backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex items-center justify-center md:justify-start gap-1 mb-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-base sm:text-lg font-black text-emerald-400">100% Puro</span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#fce7f3]/80 leading-tight block">Sem gelo / xarope</span>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Wave Divider transitioning to the menu section */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-[#faf6f9] pointer-events-none"></div>
    </section>
  );
};
