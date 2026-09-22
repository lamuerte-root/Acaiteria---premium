import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, Bike, Store, Check, Copy } from 'lucide-react';
import { CartItem, ActiveOrderTracking } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderPlaced?: (order: ActiveOrderTracking) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'delivery' | 'retirada'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [changeFor, setChangeFor] = useState('');
  const [copied, setCopied] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 50 ? 0 : 7.00) : 0;
  const total = subtotal + deliveryFee;

  const formatWhatsAppMessage = (orderId: string) => {
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    let msg = `*🍧 NOVO PEDIDO - AÇAITERIA PREMIUM 🍧*\n`;
    msg += `*CÓDIGO DE RASTREIO:* #${orderId}\n`;
    msg += `*Data/Hora:* ${formattedDate}\n\n`;
    msg += `*Cliente:* ${customerName.trim() || 'Não informado'}\n`;
    msg += `*Telefone:* ${customerPhone.trim() || 'Não informado'}\n`;
    msg += `*Tipo de Entrega:* ${orderType === 'delivery' ? '🛵 Entrega Delivery' : '🏪 Retirada no Balcão'}\n`;

    if (orderType === 'delivery') {
      msg += `*Endereço:* ${address.trim() || 'A combinar'}${neighborhood ? `, Bairro: ${neighborhood.trim()}` : ''}\n`;
    }

    msg += `\n*ITENS DO PEDIDO:*\n`;
    cart.forEach((item, index) => {
      msg += `\n${index + 1}. *${item.title}* (x${item.quantity})\n`;
      msg += `   Valor: R$ ${(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}\n`;
      if (item.details && item.details.length > 0) {
        item.details.forEach((d) => {
          msg += `   • ${d}\n`;
        });
      }
    });

    msg += `\n--------------------------\n`;
    msg += `*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (orderType === 'delivery') {
      msg += `*Taxa de Entrega:* ${deliveryFee === 0 ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}\n`;
    }
    msg += `*TOTAL A PAGAR:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
    msg += `*Forma de Pagamento:* ${
      paymentMethod === 'pix' ? 'Pix (Chave Rápida)' : paymentMethod === 'cartao' ? 'Cartão na Entrega' : `Dinheiro ${changeFor ? `(Troco p/ R$ ${changeFor})` : ''}`
    }\n`;

    return msg;
  };

  const handleSendWhatsApp = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderId = `AC-${randomCode}`;
    const now = Date.now();
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    const paymentLabel =
      paymentMethod === 'pix'
        ? 'Pix'
        : paymentMethod === 'cartao'
        ? 'Cartão'
        : `Dinheiro ${changeFor ? `(Troco p/ ${changeFor})` : ''}`;

    const newOrder: ActiveOrderTracking = {
      id: orderId,
      customerName: customerName.trim() || 'Cliente',
      customerPhone: customerPhone.trim(),
      deliveryType: orderType,
      deliveryAddress: orderType === 'delivery' ? `${address.trim()}${neighborhood ? ` - ${neighborhood.trim()}` : ''}` : undefined,
      neighborhood: neighborhood.trim(),
      paymentMethod: paymentLabel,
      itemsSummary: cart.map((i) => `${i.quantity}x ${i.title}`),
      total,
      createdAtMs: now,
      createdAtFormatted: `Hoje às ${formattedDate}`,
    };

    // Save to real orders in localStorage
    try {
      const existing = localStorage.getItem('acaiteria_orders_history');
      const list: ActiveOrderTracking[] = existing ? JSON.parse(existing) : [];
      list.unshift(newOrder);
      localStorage.setItem('acaiteria_orders_history', JSON.stringify(list.slice(0, 10)));
    } catch {
      // storage ignore
    }

    const text = formatWhatsAppMessage(orderId);
    const phone = '5511999998888';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
  };

  const handleCopySummary = () => {
    const text = formatWhatsAppMessage('NOVO');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div
        id="cart-drawer-container"
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-purple-100"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#440224] to-[#6d073c] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#fbbf24] text-[#34001b]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-[#fbbf24]">
                Sua Sacola
              </h3>
              <p className="text-xs text-[#fce7f3]/80">
                {cart.length === 0 ? 'Sacola vazia' : `${cart.length} item(ns) adicionado(s)`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                title="Limpar sacola"
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-3xl">
                🍧
              </div>
              <h4 className="text-base font-bold text-stone-800">Sua sacola está vazia</h4>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                Adicione um de nossos combos especiais ou monte seu açaí personalizado para pedir pelo WhatsApp!
              </p>
            </div>
          ) : (
            <>
              {/* List of Cart Items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col gap-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                          />
                        )}
                        <div>
                          <h4 className="text-sm font-extrabold text-[#4b0429] leading-snug">
                            {item.title}
                          </h4>
                          <span className="text-xs font-black text-[#8b0c4f]">
                            R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Additional details */}
                    {item.details && item.details.length > 0 && (
                      <div className="text-[11px] text-stone-500 bg-white p-2 rounded-xl border border-stone-100 space-y-0.5">
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#8b0c4f]"></span>
                            <span className="line-clamp-1">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 rounded text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1.5 min-w-[20px] text-center text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 rounded text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[10px] text-stone-400 hover:text-red-600 flex items-center gap-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery vs Pickup Toggle */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <label className="block text-xs font-black uppercase text-stone-700">
                  Como deseja receber?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'border-[#8b0c4f] bg-[#fdf2f8] text-[#8b0c4f] ring-1 ring-[#8b0c4f]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Entrega Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('retirada')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      orderType === 'retirada'
                        ? 'border-[#8b0c4f] bg-[#fdf2f8] text-[#8b0c4f] ring-1 ring-[#8b0c4f]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Retirar no Balcão</span>
                  </button>
                </div>
              </div>

              {/* Customer and Address Information */}
              <div className="space-y-3 pt-3 border-t border-stone-200">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Seu Nome:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Lucas Silva"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#8b0c4f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      WhatsApp:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: (11) 99999-9999"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#8b0c4f]"
                    />
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                        Endereço Completo & Número:
                      </label>
                      <input
                        type="text"
                        placeholder="Rua, Número, Complemento"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#8b0c4f]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                        Bairro:
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Centro / Jardim Paulista"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#8b0c4f]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-3 border-t border-stone-200">
                <label className="block text-xs font-black uppercase text-stone-700">
                  Forma de Pagamento:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'pix', label: 'Pix (Rápido)', icon: '⚡' },
                    { id: 'cartao', label: 'Cartão', icon: '💳' },
                    { id: 'dinheiro', label: 'Dinheiro', icon: '💵' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer ${
                        paymentMethod === p.id
                          ? 'border-[#8b0c4f] bg-[#fdf2f8] text-[#8b0c4f] ring-1 ring-[#8b0c4f]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="block text-sm mb-0.5">{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'dinheiro' && (
                  <div className="pt-2">
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Precisa de troco para quanto?
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: R$ 50 ou Sem troco"
                      value={changeFor}
                      onChange={(e) => setChangeFor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#8b0c4f]"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal dos Itens:</span>
                <span className="font-semibold text-stone-800">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between items-center">
                  <span>Taxa de Entrega:</span>
                  <span className="font-semibold text-stone-800">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-black">GRÁTIS (Acima de R$50)</span>
                    ) : (
                      `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`
                    )}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center text-base font-black text-[#4b0429] pt-2 border-t border-stone-200">
                <span>TOTAL A PAGAR:</span>
                <span className="text-xl text-[#8b0c4f]">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                id="btn-checkout-whatsapp"
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Finalizar Pedido no WhatsApp</span>
              </button>

              <button
                id="btn-copy-order"
                type="button"
                onClick={handleCopySummary}
                className="w-full py-2 rounded-full border border-stone-300 hover:bg-white text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Resumo Copiado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copiar Resumo do Pedido</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
