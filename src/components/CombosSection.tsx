import React from 'react';
import { ShoppingBag, Star, Plus, Check } from 'lucide-react';
import { useAdminProducts } from '../admin/productStore';
import { ProductItem } from '../types';

interface CombosSectionProps {
  onAddToCart: (product: ProductItem) => void;
  onOpenCart: () => void;
}

export const CombosSection: React.FC<CombosSectionProps> = ({ onAddToCart, onOpenCart }) => {
  const combos = useAdminProducts().filter((p) => p.active !== false && p.category !== 'promo');
  return (
    <section id="combos" className="py-16 md:py-24 bg-fruit-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#a2125f] bg-[#fce7f3] px-3 py-1 rounded-full inline-block mb-3">
            Menu Especial
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4b0429] tracking-tight uppercase">
            Nossos Combos
          </h2>
          <div className="w-16 h-1.5 bg-[#f59e0b] rounded-full mx-auto my-3"></div>
          <p className="text-stone-600 text-sm sm:text-base">
            As combinações mais amadas pelos clientes, montadas em copos caprichados de 500ml com adicionais generosos.
          </p>
        </div>

        {/* 4 Cards Grid - Matches the purple rounded square cards in the reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {combos.map((combo) => (
            <div
              key={combo.id}
              id={`card-${combo.id}`}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#490226] via-[#590430] to-[#690738] p-5 text-white shadow-xl shadow-[#490226]/20 hover:shadow-2xl hover:shadow-[#490226]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between border border-[#830948]/50"
            >
              {/* Card Header */}
              <div className="text-center relative z-10">
                {/* Title styled with script / display flair */}
                <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-[#fbbf24] transition-colors">
                  {combo.name}
                </h3>
                <span className="inline-block text-[11px] font-bold text-[#fce7f3]/80 uppercase tracking-wider mt-0.5">
                  {combo.subtitle}
                </span>

                {/* Badge if popular */}
                {combo.badge && (
                  <div className="absolute -top-1 right-0">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-[#f59e0b] text-[#34001b] shadow">
                      {combo.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Visual Container (Centered cup image with glow) */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden relative shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-[#a71363]/40">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#36011c]/50 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Card Content & Ingredients */}
              <div className="space-y-3 z-10">
                <div className="min-h-[48px]">
                  <p className="text-xs text-[#fce7f3]/90 line-clamp-2 text-center leading-relaxed">
                    {combo.description}
                  </p>
                </div>

                {/* Ingredients chips */}
                {combo.ingredients && (
                  <div className="flex flex-wrap gap-1 justify-center">
                    {combo.ingredients.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-[#36011c]/60 text-[#fde047] px-2 py-0.5 rounded-md border border-[#830a47]/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price and Action Button */}
                <div className="pt-2 border-t border-[#870a4a]/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/60 block line-through">
                      R$ {combo.originalPrice?.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xl font-black text-[#fbbf24]">
                      R$ {combo.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <button
                    id={`btn-add-${combo.id}`}
                    onClick={() => onAddToCart(combo)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#fbbf24] hover:bg-[#f59e0b] active:scale-95 text-[#36011c] font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pedir</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA button matching reference: "Fazer Pedido" */}
        <div className="mt-12 text-center">
          <button
            id="combos-bottom-cta-btn"
            onClick={onOpenCart}
            className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#34001b] font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Fazer Pedido</span>
          </button>
        </div>

      </div>
    </section>
  );
};
