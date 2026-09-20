import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TOPPINGS_SHOWCASE } from '../data/products';

interface MonteSeuAcaiSectionProps {
  onOpenCustomizer: () => void;
}

export const MonteSeuAcaiSection: React.FC<MonteSeuAcaiSectionProps> = ({ onOpenCustomizer }) => {
  return (
    <section id="monte-seu-acai" className="py-16 md:py-24 bg-[#faf5f8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Structure matching bottom of reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Block: Deep Wine Container matching reference */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#450224] via-[#5c0532] to-[#71073d] p-8 sm:p-10 rounded-3xl text-white shadow-2xl border border-[#910f54]/50 relative overflow-hidden">
            
            {/* Ambient decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f59e0b]/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/10 text-[#fce7f3] border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
                Personalize 100%
              </span>

              {/* Title from reference */}
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#fbbf24] uppercase tracking-tight leading-tight">
                  MONTE SEU AÇAÍ
                </h2>
                <h3 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-wider mt-1">
                  QUEM MANDA É VOCÊ, MONTE O SEU
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#fce7f3]/90 leading-relaxed">
                Confira a variedade de adicionais que temos para montar um Açaí do seu jeito. Você escolhe o tamanho do copo ou barca, a base desejada e combina quantas frutas, caldas e crocantes quiser!
              </p>

              <div className="space-y-2 text-xs text-[#fce7f3]/80 pt-2 border-t border-[#870a4a]/40">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#fbbf24] shrink-0" />
                  <span>Copos de 300ml, 500ml, 700ml ou Barca de 1 Litro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#fbbf24] shrink-0" />
                  <span>Opções Tradicional, Zero Açúcar e Trufado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#fbbf24] shrink-0" />
                  <span>Mais de 25 acompanhamentos e coberturas</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  id="btn-open-monte-acai"
                  onClick={onOpenCustomizer}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#facc15] hover:to-[#eab308] text-[#34001b] font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Montar Meu Açaí Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Block: Circular Toppings Grid matching reference */}
          <div className="lg:col-span-7">
            <div className="text-center lg:text-left mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8b0c4f] block mb-1">
                Ingredientes Selecionados
              </span>
              <h4 className="text-2xl font-black text-[#4b0429] tracking-tight">
                Adicionais e Acompanhamentos Mais Pedidos
              </h4>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6">
              {TOPPINGS_SHOWCASE.map((topping) => (
                <div
                  key={topping.id}
                  id={`topping-${topping.id}`}
                  onClick={onOpenCustomizer}
                  className="group flex flex-col items-center text-center cursor-pointer p-2.5 rounded-2xl hover:bg-white hover:shadow-md transition-all"
                >
                  {/* Circular Image Container */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md border-2 border-purple-200 group-hover:border-[#f59e0b] group-hover:scale-105 transition-all p-0.5 bg-white mb-2">
                    <img
                      src={topping.image}
                      alt={topping.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Topping Label */}
                  <span className="text-xs font-bold text-stone-800 group-hover:text-[#8b0c4f] transition-colors leading-tight">
                    {topping.name}
                  </span>
                  <span className="text-[10px] text-stone-500 mt-0.5">
                    + R$ {topping.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick banner below toppings */}
            <div className="mt-8 p-4 rounded-2xl bg-[#fdf2f8] border border-[#fbcfe8] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍯</span>
                <div>
                  <div className="text-xs font-bold text-[#831843]">Gostaria de combinar vários adicionais?</div>
                  <div className="text-[11px] text-stone-600">No nosso montador interativo você vê o valor em tempo real.</div>
                </div>
              </div>

              <button
                onClick={onOpenCustomizer}
                className="px-4 py-1.5 rounded-full bg-[#831843] hover:bg-[#701a3c] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                Abrir Montador
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
