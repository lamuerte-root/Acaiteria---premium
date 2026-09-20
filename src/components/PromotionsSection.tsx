import React from 'react';
import { ShoppingBag, Flame, Sparkles, Clock, Truck, ShieldCheck } from 'lucide-react';
import { PROMOTIONS_DATA, HERO_ASSETS } from '../data/products';
import { ProductItem } from '../types';

interface PromotionsSectionProps {
  onAddToCart: (product: ProductItem) => void;
  onOpenCart: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ onAddToCart, onOpenCart }) => {
  return (
    <section id="promocoes" className="py-16 md:py-20 bg-white relative border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching reference */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Ofertas por Tempo Limitado</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4b0429] tracking-tight uppercase">
            Promoções
          </h2>
          <div className="w-16 h-1.5 bg-[#f59e0b] rounded-full mx-auto my-3"></div>
          <p className="text-stone-600 text-sm sm:text-base">
            Descontos exclusivos pensados para você saborear o açaí mais recheado e cremoso gastando menos.
          </p>
        </div>

        {/* 3-column composition matching reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Promo Card 1: Sextou com Gosto de Açaí */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#490226] to-[#6a0739] p-6 text-white shadow-xl border border-[#830a47]/40 relative group hover:shadow-2xl transition-all">
              
              {/* Badge */}
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#f59e0b] text-[#34001b]">
                  OFERTA DO DIA
                </span>
                <span className="text-xs text-[#fce7f3]/80 font-medium">Economize R$ 7,00</span>
              </div>

              {/* Title from reference */}
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                Sextouuuu! <br />
                <span className="text-[#fbbf24]">Com Gosto de Açaí</span>
              </h3>

              <div className="text-xs text-[#fce7f3]/90 mb-4">
                Qualquer combo 500ml do nosso cardápio por preço promocional hoje!
              </div>

              {/* Image */}
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-black/20">
                <img
                  src={HERO_ASSETS.cupToppings}
                  alt="Copo de açaí promoção"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-[#320019]/90 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] text-white/70 block">QUALQUER COMBO 500ML</span>
                  <span className="text-base font-black text-[#fbbf24]">POR R$ 19,90</span>
                </div>
              </div>

              {/* Action */}
              <button
                id="btn-promo-sextou"
                onClick={() =>
                  onAddToCart({
                    id: 'promo-sextou',
                    name: 'Promoção Sextou (500ml)',
                    category: 'promo',
                    price: 19.90,
                    originalPrice: 26.90,
                    description: 'Qualquer combo de açaí 500ml em valor promocional do dia.',
                    image: HERO_ASSETS.cupToppings,
                  })
                }
                className="w-full py-3 rounded-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#34001b] font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Garantir Desconto</span>
              </button>
            </div>
          </div>

          {/* Promo Card 2: Barca de Açaí Chama no Delivery */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#490226] to-[#6a0739] p-6 text-white shadow-xl border border-[#830a47]/40 relative group hover:shadow-2xl transition-all">
              
              {/* Badge */}
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-400 text-[#0f2e1a]">
                  PARA COMPARTILHAR
                </span>
                <span className="text-xs text-[#fce7f3]/80 font-medium">1 Litro de Açaí</span>
              </div>

              {/* Title from reference */}
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                Barca de Açaí? <br />
                <span className="text-[#fbbf24]">Chama no Delivery!</span>
              </h3>

              <div className="text-xs text-[#fce7f3]/90 mb-4">
                Barca gigante com 10 adicionais fartos para reunir a família ou amigos.
              </div>

              {/* Image */}
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-black/20">
                <img
                  src={HERO_ASSETS.barcaPromo}
                  alt="Barca de Açaí completa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-[#320019]/90 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] text-white/70 block">BARCA COMPLETA 1L + 10 ADICIONAIS</span>
                  <span className="text-base font-black text-[#fbbf24]">POR R$ 42,00</span>
                </div>
              </div>

              {/* Action */}
              <button
                id="btn-promo-barca"
                onClick={() =>
                  onAddToCart({
                    id: 'promo-barca-1l',
                    name: 'Barca Especial 1L (10 Adicionais)',
                    category: 'promo',
                    price: 42.00,
                    originalPrice: 55.00,
                    description: 'Barca completa de 1 litro de açaí com 10 adicionais fartos.',
                    image: HERO_ASSETS.barcaPromo,
                  })
                }
                className="w-full py-3 rounded-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#34001b] font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pedir Barca Completa</span>
              </button>
            </div>
          </div>

          {/* Right Callout: Matches "HMMM... NESSE CALOR O QUE MAIS COMBINA?" from reference */}
          <div className="lg:col-span-4 bg-[#faf2f7] p-8 rounded-3xl border border-purple-200/70 text-center lg:text-left space-y-5">
            <span className="text-4xl block">🍧</span>

            <h3 className="text-2xl sm:text-3xl font-black text-[#4b0429] uppercase tracking-tight leading-tight">
              HMMM... NESSE CALOR <br />
              <span className="text-[#a2125f]">O QUE MAIS COMBINA?</span>
            </h3>

            <p className="text-stone-600 text-sm leading-relaxed">
              Nada refresca mais do que o açaí da <strong>Açaiteria Premium</strong>. Nossas embalagens térmicas garantem que seu pedido chegue com a consistência cremosa intacta, sem virar líquido!
            </p>

            <ul className="space-y-2.5 text-xs text-stone-700 font-medium pt-1">
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8b0c4f] shrink-0" />
                <span>Entrega grátis para compras acima de R$ 50,00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8b0c4f] shrink-0" />
                <span>Tempo médio de entrega: 30 a 45 minutos</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8b0c4f] shrink-0" />
                <span>Embalagem lacrada com selo térmico de segurança</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                id="btn-promo-callout-fazer-pedido"
                onClick={onOpenCart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#34001b] font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Fazer Pedido</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
