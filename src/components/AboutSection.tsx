import React from 'react';
import { Award, Leaf, Heart, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { HERO_ASSETS } from '../data/products';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#faf5f8]">
              <img
                src={HERO_ASSETS.heroCups}
                alt="Açaí artesanal da Açaiteria Premium"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2e0117]/70 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-[#450225]/85 backdrop-blur-md border border-white/20">
                <span className="text-xs uppercase font-black tracking-wider text-[#fbbf24] block">
                  Nossa Missão
                </span>
                <p className="text-sm font-medium mt-1">
                  Levar a experiência autêntica, cremosa e nutritiva do verdadeiro açaí brasileiro para o seu dia a dia.
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -left-4 bg-[#fbbf24] text-[#34001b] font-black px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border-2 border-white text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Desde 2019 com Paixão</span>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#a2125f] bg-[#fce7f3] px-3 py-1 rounded-full inline-block mb-3">
                Conheça a Açaiteria Premium
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4b0429] tracking-tight uppercase leading-tight">
                O Segredo da Nossa <br />
                <span className="text-[#8b0c4f]">Cremosidade Inigualável</span>
              </h2>
              <div className="w-16 h-1.5 bg-[#f59e0b] rounded-full my-3"></div>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Diferente dos açaís convencionais que contêm alto teor de água e formam raspas duras de gelo, nosso açaí é produzido a partir de polpa pura colhida no Pará, batida lentamente em processo artesanal para atingir a textura perfeita e aveludada.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#faf5f8] border border-purple-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8b0c4f] text-white flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#4b0429]">Polpa 100% Pura</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Sem adição de corantes artificiais ou aromatizantes químicos.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf5f8] border border-purple-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8b0c4f] text-white flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#4b0429]">Frutas Fresquinhas</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Morangos, bananas e kiwis selecionados e picados na hora.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf5f8] border border-purple-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8b0c4f] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#4b0429]">Higiene Rigorosa</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Padrões sanitários estritos e embalagens 100% lacradas.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf5f8] border border-purple-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8b0c4f] text-white flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#4b0429]">Embalagem Térmica</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Chega na sua mesa geladinho, sem derreter no caminho.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
