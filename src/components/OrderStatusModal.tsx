import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Bike,
  Phone,
  ChefHat,
  PackageCheck,
  MapPin,
  RefreshCw,
  Search,
  AlertCircle,
  ExternalLink,
  Store,
} from 'lucide-react';
import { ActiveOrderTracking, OrderTrackingStage } from '../types';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMenu: () => void;
}

interface StageDetail {
  id: OrderTrackingStage;
  label: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  minMinutes: number;
}

const STAGES: StageDetail[] = [
  {
    id: 'confirmado',
    label: 'Confirmado',
    title: 'Pedido Confirmado na Cozinha',
    description: 'A loja recebeu seu pedido, validou os detalhes e já começou a separar os ingredientes frescos.',
    icon: PackageCheck,
    minMinutes: 0,
  },
  {
    id: 'preparando',
    label: 'Preparando',
    title: 'Montando seu Açaí Artesanal',
    description: 'O açaí está sendo batido na cremosidade ideal com as camadas de frutas, recheios e adicionais selecionados.',
    icon: ChefHat,
    minMinutes: 5,
  },
  {
    id: 'saiu_entrega',
    label: 'Saiu p/ Entrega',
    title: 'A Caminho do Endereço',
    description: 'O pedido foi lacrado na embalagem térmica especial e está a caminho com o entregador.',
    icon: Bike,
    minMinutes: 20,
  },
  {
    id: 'entregue',
    label: 'Entregue',
    title: 'Pedido Entregue',
    description: 'Seu açaí super geladinho e cremoso chegou! Tenha uma excelente experiência.',
    icon: CheckCircle2,
    minMinutes: 38,
  },
];

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
  onNavigateToMenu,
}) => {
  const [activeOrder, setActiveOrder] = useState<ActiveOrderTracking | null>(null);
  const [allOrders, setAllOrders] = useState<ActiveOrderTracking[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Load real orders from localStorage when modal opens
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('acaiteria_orders_history');
      if (stored) {
        const parsed: ActiveOrderTracking[] = JSON.parse(stored);
        setAllOrders(parsed);
        if (parsed.length > 0) {
          // Select most recent order by default
          const sorted = [...parsed].sort((a, b) => b.createdAtMs - a.createdAtMs);
          setActiveOrder(sorted[0]);
        } else {
          setActiveOrder(null);
        }
      } else {
        setActiveOrder(null);
        setAllOrders([]);
      }
    } catch {
      setActiveOrder(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadOrders();
      setCurrentTime(Date.now());
      setSearchError(null);
      setSearchInput('');
    }
  }, [isOpen]);

  // Update elapsed time every 30 seconds while open
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setCurrentTime(Date.now());
    loadOrders();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    const query = searchInput.trim().toUpperCase().replace('#', '');
    if (!query) return;

    const found = allOrders.find(
      (o) => o.id.toUpperCase().replace('#', '') === query
    );

    if (found) {
      setActiveOrder(found);
      setSearchInput('');
    } else {
      setSearchError(`Nenhum pedido encontrado com o código #${query}. Verifique se o código está correto.`);
    }
  };

  // Compute current stage from real elapsed time
  let currentStage: OrderTrackingStage = 'confirmado';
  let elapsedMinutes = 0;
  let stageIndex = 0;
  let estimatedRemaining = '30-45 min';

  if (activeOrder) {
    const elapsedMs = Math.max(0, currentTime - activeOrder.createdAtMs);
    elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));

    if (elapsedMinutes >= 38) {
      currentStage = 'entregue';
      stageIndex = 3;
      estimatedRemaining = 'Entregue';
    } else if (elapsedMinutes >= 20) {
      currentStage = 'saiu_entrega';
      stageIndex = 2;
      const rem = Math.max(5, 38 - elapsedMinutes);
      estimatedRemaining = `Aprox. ${rem} min`;
    } else if (elapsedMinutes >= 5) {
      currentStage = 'preparando';
      stageIndex = 1;
      const rem = Math.max(15, 38 - elapsedMinutes);
      estimatedRemaining = `Aprox. ${rem} min`;
    } else {
      currentStage = 'confirmado';
      stageIndex = 0;
      estimatedRemaining = 'Aprox. 30-40 min';
    }
  }

  const activeStageInfo = STAGES[stageIndex] || STAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        id="modal-order-tracking"
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden my-auto border border-purple-100 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#440224] via-[#5c0532] to-[#71073d] p-5 sm:p-6 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#fbbf24] text-[#34001b] font-black flex items-center justify-center shadow-md text-xl">
              🛵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#fbbf24]">
                  Rastreamento de Pedido
                </h3>
                {activeOrder && (
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                    #{activeOrder.id}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#fce7f3]/85 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
                {activeOrder ? (
                  <span>
                    Previsão: <strong className="text-white font-bold">{estimatedRemaining}</strong>
                    {elapsedMinutes > 0 && ` (Pedido há ${elapsedMinutes} min)`}
                  </span>
                ) : (
                  <span>Acompanhe o status do seu pedido em tempo real</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeOrder && (
              <button
                onClick={handleRefresh}
                title="Atualizar status do pedido"
                className={`p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Fechar rastreamento"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* If No Order Found on this device */}
          {!activeOrder ? (
            <div className="text-center py-8 px-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-3xl">
                📦
              </div>
              
              <div className="max-w-md mx-auto space-y-2">
                <h4 className="text-lg font-black text-[#4b0429]">
                  Nenhum pedido ativo no momento
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Você ainda não finalizou nenhum pedido neste aparelho. Assim que você fechar um pedido na sacola, o rastreamento em tempo real ficará disponível aqui.
                </p>
              </div>

              {/* Order lookup form */}
              <form onSubmit={handleSearchOrder} className="max-w-md mx-auto pt-2">
                <label className="block text-left text-xs font-bold text-stone-700 uppercase mb-1.5">
                  Já tem um código de pedido?
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ex: AC-8492"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs uppercase font-bold focus:outline-none focus:border-[#8b0c4f]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#440224] hover:bg-[#5b0431] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Buscar
                  </button>
                </div>
                {searchError && (
                  <p className="text-xs text-red-600 text-left mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{searchError}</span>
                  </p>
                )}
              </form>

              <div className="pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToMenu();
                  }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#34001b] font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Ver Cardápio & Fazer Pedido
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Active Highlight Card */}
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                currentStage === 'entregue'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-gradient-to-br from-[#faf0f6] to-[#f6e5ef] border-[#e8bed6]'
              }`}>
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    currentStage === 'entregue'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#6b073b] text-[#fbbf24]'
                  }`}>
                    <activeStageInfo.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#8b0c4f] bg-[#fbcfe8]/60 px-2.5 py-0.5 rounded-full">
                        Status Atual: {activeStageInfo.label}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">
                        {activeOrder.createdAtFormatted}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-[#4b0429] mt-1">
                      {activeStageInfo.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                      {activeStageInfo.description}
                    </p>
                  </div>
                </div>

                {/* Visual dynamic progress bar */}
                <div className="mt-4 pt-3 border-t border-black/5">
                  <div className="w-full bg-stone-200/80 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#fbbf24] via-[#eab308] to-[#6b073b] h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${Math.min(100, Math.max(15, ((stageIndex + 1) / STAGES.length) * 100))}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div>
                <h5 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-3">
                  Etapas do Pedido
                </h5>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {STAGES.map((stage, idx) => {
                    const isCompleted = idx < stageIndex;
                    const isCurrent = idx === stageIndex;
                    const StageIcon = stage.icon;

                    return (
                      <div
                        key={stage.id}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between ${
                          isCurrent
                            ? 'bg-[#fdf2f8] border-[#8b0c4f] ring-2 ring-[#8b0c4f]/20 shadow-xs'
                            : isCompleted
                            ? 'bg-emerald-50/70 border-emerald-200 text-stone-700'
                            : 'bg-stone-50/80 border-stone-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                              isCompleted
                                ? 'bg-emerald-500 text-white'
                                : isCurrent
                                ? 'bg-[#6b073b] text-[#fbbf24]'
                                : 'bg-stone-200 text-stone-500'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <StageIcon className="w-3.5 h-3.5" />
                            )}
                          </div>

                          <span className="text-[10px] font-bold text-stone-400">
                            0{idx + 1}
                          </span>
                        </div>

                        <div>
                          <span className={`block text-xs font-extrabold leading-snug ${
                            isCurrent ? 'text-[#4b0429]' : isCompleted ? 'text-emerald-900' : 'text-stone-600'
                          }`}>
                            {stage.label}
                          </span>
                          <span className="block text-[10px] text-stone-500 mt-0.5">
                            {isCompleted ? 'Concluído' : isCurrent ? 'Em andamento' : 'Aguardando'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6b073b]">
                    {activeOrder.deliveryType === 'delivery' ? <Bike className="w-4 h-4" /> : <Store className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-stone-500 block">
                      Tipo de Recebimento
                    </span>
                    <span className="text-xs font-black text-[#4b0429] block truncate">
                      {activeOrder.deliveryType === 'delivery' ? 'Entrega em Domicílio' : 'Retirada no Balcão'}
                    </span>
                    <span className="text-[10px] text-stone-600 block truncate">
                      {activeOrder.deliveryAddress || (activeOrder.deliveryType === 'delivery' ? 'Endereço informado no WhatsApp' : 'Retirar na loja')}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-stone-500 block">
                      Cliente
                    </span>
                    <span className="text-xs font-black text-[#4b0429] block truncate">
                      {activeOrder.customerName}
                    </span>
                    <span className="text-[10px] text-stone-600 block truncate">
                      Pagamento: {activeOrder.paymentMethod || 'A combinar'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items in this Order */}
              {activeOrder.itemsSummary && activeOrder.itemsSummary.length > 0 && (
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-black text-[#4b0429]">
                    <span>Itens do Pedido (#{activeOrder.id})</span>
                    <span className="text-[#8b0c4f]">Total: R$ {activeOrder.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <ul className="text-xs text-stone-600 space-y-1 pt-1">
                    {activeOrder.itemsSummary.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8b0c4f] shrink-0"></span>
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact Support */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-emerald-950 block">
                      Precisa de suporte com seu pedido?
                    </span>
                    <span className="text-[10px] text-emerald-700 block">
                      Nossa equipe atende rapidamente pelo WhatsApp
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/5511999998888?text=${encodeURIComponent(
                    `Olá! Gostaria de falar sobre o meu pedido #${activeOrder.id} (${activeOrder.customerName}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Chamar</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            Açaiteria Premium • Atendimento em tempo real
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#440224] hover:bg-[#5a0430] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
