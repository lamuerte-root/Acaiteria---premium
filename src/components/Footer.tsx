import React from 'react';
import { MapPin, Phone, Clock, Instagram, Send, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenCustomizer: () => void;
  onOpenCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCustomizer, onOpenCart }) => {
  return (
    <footer id="contato" className="bg-[#2a0115] text-[#fce7f3] pt-16 pb-12 border-t border-[#6d073c]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#5a0530]">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] p-0.5 flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-[#3b011f] rounded-full flex items-center justify-center text-xl font-black text-[#fbbf24]">
                  🍇
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                Açaiteria<span className="text-[#fbbf24]">Premium</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#fce7f3]/80 leading-relaxed">
              O autêntico açaí paraense, com textura super aveludada, sem cristais de gelo e montado com os melhores adicionais do mercado. Peça no conforto da sua casa!
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Açaiteria"
                className="w-9 h-9 rounded-full bg-[#490226] hover:bg-[#fbbf24] hover:text-[#32011a] text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5511999998888"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp da Açaiteria"
                className="w-9 h-9 rounded-full bg-[#490226] hover:bg-emerald-500 hover:text-white text-white flex items-center justify-center transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#fce7f3]/80">
              <li>
                <a href="#hero-section" className="hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#combos" className="hover:text-white transition-colors">Nossos Combos</a>
              </li>
              <li>
                <a href="#promocoes" className="hover:text-white transition-colors">Promoções do Dia</a>
              </li>
              <li>
                <button onClick={onOpenCustomizer} className="hover:text-[#fbbf24] transition-colors cursor-pointer text-left">
                  Monte seu Açaí
                </button>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">Nossa História</a>
              </li>
            </ul>
          </div>

          {/* Store Hours & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
              Horário & Atendimento
            </h4>
            <div className="space-y-2.5 text-xs text-[#fce7f3]/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Segunda a Domingo</span>
                  <span>13:00 às 23:30 (Sem intervalo)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Loja & Balcão</span>
                  <span>Av. Principal dos Sabores, nº 1050 • Centro</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Disk Açaí / Delivery</span>
                  <span>(11) 99999-8888</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payments & Security */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
              Formas de Pagamento
            </h4>
            <p className="text-xs text-[#fce7f3]/70">
              Pague com segurança no momento da entrega ou por Pix instantâneo:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Pix', 'Crédito', 'Débito', 'Alelo', 'Sodexo', 'Dinheiro'].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-lg bg-[#440224] text-[11px] font-semibold text-white border border-[#71073d]/50"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Ambiente 100% Seguro</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#fce7f3]/60">
          <p>© {new Date().getFullYear()} Açaiteria Premium. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para os apaixonados por Açaí
          </p>
        </div>

      </div>

      {/* Floating WhatsApp Action Button */}
      <a
        id="floating-whatsapp-btn"
        href="https://wa.me/5511999998888?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20na%20A%C3%A7aiteria%20Premium!"
        target="_blank"
        rel="noreferrer"
        aria-label="Pedir pelo WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transform hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="text-2xl leading-none">📱</span>
        <span className="hidden sm:inline-block font-black text-xs uppercase tracking-wider">
          Pedir no WhatsApp
        </span>
      </a>
    </footer>
  );
};
