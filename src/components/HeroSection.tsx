import React from 'react';
import { ShoppingBag, Sparkles, Flame, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { HERO_ASSETS } from '../data/products';

interface HeroSectionProps {
  onOpenCustomizer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCustomizer }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#3d0221] via-[#54042e] to-[#6d073c]"
    >
      {/* Dynamic berry ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#930f53]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#310019]/60 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography matching reference image */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6a073a]/70 border border-[#a2125f]/40 backdrop-blur-sm text-[#fce7f3] text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-[#fbbf24] animate-pulse" />
              <span>Açaí Artesanal 100% Puro • Sem Cristais de Gelo</span>
            </div>

            {/* Giant Headline from reference: "JÁ TOMOU SEU AÇAÍ HOJE?" */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight uppercase leading-none drop-shadow-md">
                <span className="text-[#fbbf24] block mb-1">
                  JÁ TOMOU
                </span>
                <span className="text-white block font-extrabold tracking-tight">
                  SEU AÇAÍ HOJE?
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[#fce7f3]/90 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Aquele açaí cremoso de verdade, preparado com ingredientes selecionados, camadas generosas de leite Ninho, Nutella pura e frutas frescas fatiadas na hora.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                id="hero-cta-combos"
                href="#combos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#eab308] hover:from-[#facc15] hover:to-[#d97706] text-[#32011a] font-black text-base uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Fazer Pedido</span>
              </a>

              <button
                id="hero-cta-monte"
                onClick={onOpenCustomizer}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/25 backdrop-blur-sm transition-all hover:border-[#fbbf24] hover:text-[#fbbf24] cursor-pointer"
              >
                <span>Monte Seu Açaí</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-6 border-t border-[#870a4a]/40 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
              <div className="p-2 sm:p-3 rounded-2xl bg-[#4d0329]/50 border border-[#830a47]/30">
                <span className="block text-lg sm:text-xl font-black text-[#fbbf24]">4.9 / 5.0</span>
                <span className="text-[11px] sm:text-xs text-[#fce7f3]/80 leading-tight block">Mais de 3.200 avaliações</span>
              </div>
              <div className="p-2 sm:p-3 rounded-2xl bg-[#4d0329]/50 border border-[#830a47]/30">
                <span className="block text-lg sm:text-xl font-black text-white">30 - 45 min</span>
                <span className="text-[11px] sm:text-xs text-[#fce7f3]/80 leading-tight block">Entrega expressa rápida</span>
              </div>
              <div className="p-2 sm:p-3 rounded-2xl bg-[#4d0329]/50 border border-[#830a47]/30">
                <span className="block text-lg sm:text-xl font-black text-emerald-400">100% Puro</span>
                <span className="text-[11px] sm:text-xs text-[#fce7f3]/80 leading-tight block">Polpa premium Pará</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual from reference (3 layered cups with splashes and fruits) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Glow circle behind cups */}
            <div className="absolute w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full bg-gradient-to-tr from-[#8a0a4c]/50 to-[#fbbf24]/15 blur-2xl pointer-events-none"></div>

            {/* The Main Hero Cups Image */}
            <div className="relative z-10 w-full max-w-xl group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">
                <img
                  src={HERO_ASSETS.heroCups}
                  alt="Copos de Açaí Cremoso com camadas de morango, leite condensado, leite ninho e granola"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#260014]/60 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Floating feature pills around the hero image */}
              <div className="absolute -bottom-4 -left-2 sm:left-4 bg-[#39011e]/95 backdrop-blur-md border border-[#910f54]/60 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slight">
                <div className="w-9 h-9 rounded-xl bg-[#f59e0b] flex items-center justify-center text-lg shadow-sm">
                  🍓
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Frutas Fresquinhas</div>
                  <div className="text-[11px] text-[#fbbf24]">Cortadas na hora do pedido</div>
                </div>
              </div>

              <div className="hidden sm:flex absolute -top-4 -right-2 bg-[#39011e]/95 backdrop-blur-md border border-[#910f54]/60 text-white px-4 py-2.5 rounded-2xl shadow-xl items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#830948] flex items-center justify-center text-lg shadow-sm">
                  🏆
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Cremosidade Nível Máximo</div>
                  <div className="text-[11px] text-emerald-300">Receita exclusiva da casa</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Decorative Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-[#faf6f9] pointer-events-none"></div>
    </section>
  );
};
