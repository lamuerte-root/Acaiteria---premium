import React from 'react';
import { Star, CheckCircle2, MessageCircle } from 'lucide-react';
import { REVIEWS_DATA } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#faf5f8] border-t border-purple-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Avaliações Verificadas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#4b0429] tracking-tight uppercase">
            Quem Provou, Amou!
          </h2>
          <div className="w-16 h-1.5 bg-[#f59e0b] rounded-full mx-auto my-3"></div>
          <p className="text-stone-600 text-sm">
            Mais de 3.000 clientes satisfeitos em nossa região com nota média de 4.9 estrelas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl shadow-lg shadow-purple-900/5 border border-purple-100 flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-stone-500">
                    {review.date}
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-[#4b0429]">
                    {review.name}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {review.city}
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Compra Verificada</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
