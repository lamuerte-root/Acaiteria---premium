import React, { useState } from 'react';
import { X, Check, Sparkles, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { SIZES_OPTIONS, BASE_OPTIONS, TOPPINGS_SHOWCASE } from '../data/products';
import { CartItem } from '../types';

interface AcaiCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const AcaiCustomizerModal: React.FC<AcaiCustomizerModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [selectedSize, setSelectedSize] = useState(SIZES_OPTIONS[1]); // 500ml default
  const [selectedBase, setSelectedBase] = useState(BASE_OPTIONS[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['leite-condensado', 'leite-po', 'morango-fresco']);
  const [observation, setObservation] = useState('');
  const [quantity, setQuantity] = useState(1);

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  // Price Calculation:
  // Base size includes 'maxFreeToppings'. Additional toppings cost their respective price.
  const freeToppingsCount = selectedSize.maxFreeToppings || 3;
  const chosenToppingsObjects = selectedToppings.map((id) =>
    TOPPINGS_SHOWCASE.find((t) => t.id === id)
  ).filter(Boolean);

  // Extra toppings calculation: If user picks more toppings than included in the size, the cheapest or standard extras are added
  let extraToppingsPrice = 0;
  if (chosenToppingsObjects.length > freeToppingsCount) {
    const sortedByPrice = [...chosenToppingsObjects].sort((a, b) => (b?.price || 0) - (a?.price || 0));
    const chargeable = sortedByPrice.slice(freeToppingsCount);
    extraToppingsPrice = chargeable.reduce((acc, curr) => acc + (curr?.price || 0), 0);
  }

  const unitTotal = selectedSize.price + extraToppingsPrice;
  const grandTotal = unitTotal * quantity;

  const handleFinishCustomAcai = () => {
    const toppingNames = chosenToppingsObjects.map((t) => t?.name || '');
    
    const details = [
      `Tamanho: ${selectedSize.name} (${selectedSize.ml})`,
      `Base: ${selectedBase.name}`,
      `Adicionais (${selectedToppings.length}): ${toppingNames.join(', ') || 'Nenhum'}`,
      ...(observation.trim() ? [`Obs: ${observation.trim()}`] : [])
    ];

    onAddToCart({
      id: `custom-acai-${Date.now()}`,
      type: 'custom',
      title: `Açaí Personalizado ${selectedSize.ml}`,
      details,
      unitPrice: unitTotal,
      quantity,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        id="modal-customizer-container"
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden my-auto border border-purple-100 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#440224] via-[#5c0532] to-[#71073d] p-5 sm:p-6 text-white flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#fbbf24] text-[#34001b] font-black text-lg">
              🍧
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#fbbf24]">
                Monte Seu Açaí
              </h3>
              <p className="text-xs text-[#fce7f3]/80">
                Personalize do jeitinho que você ama
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar montador"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 divide-y divide-stone-100">
          
          {/* Step 1: Tamanho */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-[#4b0429] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4b0429] text-white text-xs flex items-center justify-center">1</span>
                <span>Escolha o Tamanho</span>
              </h4>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Obrigatório
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SIZES_OPTIONS.map((size) => {
                const isSelected = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#8b0c4f] bg-[#fdf2f8] shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    {size.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase bg-[#f59e0b] text-[#34001b] px-2 py-0.5 rounded-full shadow-xs">
                        Mais Pedido
                      </span>
                    )}
                    <div>
                      <span className="block text-xs font-bold text-stone-600 uppercase">
                        {size.name}
                      </span>
                      <span className="block text-lg font-black text-[#4b0429] mt-0.5">
                        {size.ml}
                      </span>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-stone-100">
                      <span className="text-xs font-black text-[#8b0c4f]">
                        R$ {size.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="block text-[10px] text-stone-600">
                        {size.maxFreeToppings} adicionais grátis
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Base do Açaí */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-[#4b0429] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4b0429] text-white text-xs flex items-center justify-center">2</span>
                <span>Escolha a Base</span>
              </h4>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                1 opção
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BASE_OPTIONS.map((base) => {
                const isSelected = selectedBase.id === base.id;
                return (
                  <button
                    key={base.id}
                    type="button"
                    onClick={() => setSelectedBase(base)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#8b0c4f] bg-[#fdf2f8] ring-2 ring-[#8b0c4f]/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-stone-800">
                        {base.name}
                      </span>
                      <span className="text-[11px] text-stone-500 line-clamp-1">
                        {base.desc}
                      </span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                      isSelected ? 'border-[#8b0c4f] bg-[#8b0c4f] text-white' : 'border-stone-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Adicionais (Até X grátis de acordo com o tamanho) */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-base font-black text-[#4b0429] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4b0429] text-white text-xs flex items-center justify-center">3</span>
                <span>Adicionais e Acompanhamentos</span>
              </h4>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#fdf2f8] text-[#8b0c4f] border border-[#fbcfe8]">
                {selectedToppings.length} selecionado(s) • {Math.max(0, freeToppingsCount - selectedToppings.length)} grátis restantes
              </span>
            </div>

            <p className="text-xs text-stone-500">
              O tamanho {selectedSize.ml} inclui <strong>{freeToppingsCount} adicionais grátis</strong>. A partir do {freeToppingsCount + 1}º, é cobrado o valor avulso.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TOPPINGS_SHOWCASE.map((topping) => {
                const isSelected = selectedToppings.includes(topping.id);
                return (
                  <button
                    key={topping.id}
                    type="button"
                    onClick={() => toggleTopping(topping.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-[#8b0c4f] bg-[#fdf2f8] ring-1 ring-[#8b0c4f]'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-stone-200">
                      <img
                        src={topping.image}
                        alt={topping.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-xs font-bold text-stone-800 truncate">
                        {topping.name}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        + R$ {topping.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#8b0c4f] border-[#8b0c4f] text-white' : 'border-stone-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Observações do Pedido */}
          <div className="pt-6 space-y-2">
            <label htmlFor="custom-obs" className="block text-xs font-bold text-stone-700">
              Observações Especiais (Opcional):
            </label>
            <input
              id="custom-obs"
              type="text"
              placeholder="Ex: pouco leite condensado, caprichar no morango, sem talher..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#8b0c4f] focus:ring-1 focus:ring-[#8b0c4f]"
            />
          </div>

        </div>

        {/* Modal Footer (Sticky Bottom with Quantity & Total) */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-600">Qtd:</span>
            <div className="flex items-center border border-stone-300 rounded-full bg-white px-2 py-1 shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Diminuir quantidade"
                className="p-1 text-stone-600 hover:text-[#8b0c4f] cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-7 text-center text-sm font-black text-stone-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Aumentar quantidade"
                className="p-1 text-stone-600 hover:text-[#8b0c4f] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Price and Add Button */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Total do Item
              </span>
              <span className="text-2xl font-black text-[#4b0429]">
                R$ {grandTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              id="btn-add-custom-to-cart"
              type="button"
              onClick={handleFinishCustomAcai}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#facc15] hover:to-[#eab308] text-[#34001b] font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar à Sacola</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
