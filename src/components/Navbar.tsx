import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, Menu, X, Phone, Flame, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onOpenCart, onOpenCustomizer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#3b011f]/95 backdrop-blur-md shadow-xl py-3 border-b border-[#70073e]/40'
          : 'bg-[#430224] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            id="nav-logo-link"
            href="#"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] p-0.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#410223] rounded-full flex items-center justify-center text-xl font-black text-[#fbbf24]">
                🍇
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                Açaiteria<span className="text-[#fbbf24] font-extrabold text-sm sm:text-base px-2 py-0.5 bg-[#640738] rounded-full uppercase tracking-wider">Premium</span>
              </span>
              <span className="text-[10px] text-[#fce7f3] tracking-widest uppercase font-medium">O Verdadeiro Sabor</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-navigation" className="hidden md:flex items-center gap-7">
            <a
              id="nav-link-inicio"
              href="#"
              className="text-sm font-semibold text-white/90 hover:text-[#fbbf24] transition-colors"
            >
              Início
            </a>
            <a
              id="nav-link-combos"
              href="#combos"
              className="text-sm font-semibold text-white/90 hover:text-[#fbbf24] transition-colors"
            >
              Combos
            </a>
            <a
              id="nav-link-promocoes"
              href="#promocoes"
              className="text-sm font-semibold text-white/90 hover:text-[#fbbf24] transition-colors flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5 text-[#fbbf24]" />
              Promoções
            </a>
            <button
              id="nav-link-monte-acai"
              onClick={onOpenCustomizer}
              className="text-sm font-semibold text-[#fbbf24] hover:text-white transition-colors cursor-pointer"
            >
              Monte seu Açaí
            </button>
            <a
              id="nav-link-sobre"
              href="#sobre"
              className="text-sm font-semibold text-white/90 hover:text-[#fbbf24] transition-colors"
            >
              Sobre
            </a>
            <a
              id="nav-link-contato"
              href="#contato"
              className="text-sm font-semibold text-white/90 hover:text-[#fbbf24] transition-colors"
            >
              Contato
            </a>
          </nav>

          {/* Actions: Status + Cart + CTA */}
          <div className="flex items-center gap-3">
            
            {/* Status pill (desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#590430] border border-[#830a47]/50 text-[11px] text-[#fce7f3] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Aberto • 30-45min</span>
            </div>

            {/* Cart Trigger */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              aria-label="Ver sacola de pedidos"
              className="relative p-2.5 rounded-full bg-[#5a0531] hover:bg-[#6e073d] text-white transition-all cursor-pointer border border-[#870a4a]/40"
            >
              <ShoppingBag className="w-5 h-5 text-[#fbbf24]" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#f59e0b] text-[#36011c] font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                  {totalItems}
                </span>
              )}
            </button>

            {/* CTA Fazer Pedido (Matches reference image rounded yellow button) */}
            <a
              id="nav-fazer-pedido-btn"
              href="#combos"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#facc15] hover:to-[#eab308] text-[#34001b] font-extrabold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Fazer Pedido
            </a>

            {/* Mobile menu toggle */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#fbbf24] transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="md:hidden bg-[#3b011f] border-b border-[#70073e] px-4 pt-3 pb-6 mt-3 space-y-3 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-[#fce7f3]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Loja Aberta Agora
            </span>
            <span className="flex items-center gap-1 text-white/80">
              <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
              13:00 às 23:30
            </span>
          </div>

          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-white hover:text-[#fbbf24]"
          >
            Início
          </a>
          <a
            href="#combos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-white hover:text-[#fbbf24]"
          >
            Nossos Combos
          </a>
          <a
            href="#promocoes"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-white hover:text-[#fbbf24]"
          >
            Promoções
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCustomizer();
            }}
            className="w-full text-left py-2 text-base font-bold text-[#fbbf24] flex items-center justify-between"
          >
            <span>Monte seu Açaí</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <a
            href="#sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-white hover:text-[#fbbf24]"
          >
            Sobre Nós
          </a>
          <a
            href="#contato"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-white hover:text-[#fbbf24]"
          >
            Contato & Endereço
          </a>

          <div className="pt-2">
            <a
              href="#combos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3 rounded-full bg-[#fbbf24] text-[#34001b] font-black text-sm uppercase tracking-wider shadow-lg"
            >
              Fazer Pedido Agora
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
