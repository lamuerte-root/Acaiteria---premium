import heroCupsImg from '../assets/images/acai_hero_cups_1789934836744.jpg';
import barcaPromoImg from '../assets/images/acai_barca_promo_1789934847582.jpg';
import cupToppingsImg from '../assets/images/acai_cup_toppings_1789934858702.jpg';
import { ProductItem, ToppingOption } from '../types';

export const HERO_ASSETS = {
  heroCups: heroCupsImg,
  barcaPromo: barcaPromoImg,
  cupToppings: cupToppingsImg,
};

export const COMBOS_DATA: ProductItem[] = [
  {
    id: 'combo-amor',
    name: 'Combo Amor',
    subtitle: 'Combinação Perfeita',
    category: 'combo',
    price: 24.90,
    originalPrice: 28.90,
    description: 'Açaí artesanal cremoso 500ml, morangos frescos fatiados, Nutella original, leite condensado e leite Ninho.',
    image: cupToppingsImg,
    badge: 'Mais Pedido',
    ingredients: ['Morangos Frescos', 'Nutella Original', 'Leite Condensado', 'Leite Ninho'],
    popular: true
  },
  {
    id: 'combo-ninho',
    name: 'Combo Ninho',
    subtitle: 'Explosão de Sabor',
    category: 'combo',
    price: 26.90,
    originalPrice: 31.00,
    description: 'Açaí cremoso 500ml com camadas generosas de Leite Ninho em pó, morangos frescos fatiados e brigadeiro de colher.',
    image: cupToppingsImg,
    badge: 'Favorito',
    ingredients: ['Leite Ninho em Dobro', 'Morangos Selecionados', 'Brigadeiro Gourmet'],
    popular: true
  },
  {
    id: 'combo-magnifico',
    name: 'Combo Magnífico',
    subtitle: 'Energia & Crocância',
    category: 'combo',
    price: 23.90,
    originalPrice: 27.50,
    description: 'Açaí puro 500ml, rodelas de banana prata, paçoca caseira esfarelada, mel orgânico, granola crocante e chantilly.',
    image: cupToppingsImg,
    badge: 'Clássico',
    ingredients: ['Banana Prata', 'Paçoca Caseira', 'Mel Puro', 'Granola Crocante'],
    popular: false
  },
  {
    id: 'combo-tropical',
    name: 'Combo Tropical',
    subtitle: 'Refrescância Pura',
    category: 'combo',
    price: 25.90,
    originalPrice: 29.90,
    description: 'Açaí refrescante 500ml, manga fresca picada, kiwi fatiado, morangos, geleia artesanal de maracujá e sementes de chia.',
    image: cupToppingsImg,
    badge: 'Refrescante',
    ingredients: ['Kiwi Fresco', 'Manga em Cubos', 'Morangos', 'Calda de Maracujá'],
    popular: false
  }
];

export const PROMOTIONS_DATA = [
  {
    id: 'promo-sextou',
    tag: 'Sextou com Gosto de Açaí!',
    badge: 'SUPER PROMO',
    title: 'Qualquer Combo 500ml por R$ 19,90',
    description: 'Válido para pedidos realizados hoje! Escolha qualquer um dos nossos combos tradicionais com desconto especial.',
    price: 19.90,
    originalPrice: 26.90,
    image: cupToppingsImg,
    buttonText: 'Garantir Desconto'
  },
  {
    id: 'promo-barca',
    tag: 'Barca de Açaí? Chama no Delivery!',
    badge: 'CHAMA NO DELIVERY',
    title: 'Barca Completa 1 Litro + 10 Adicionais',
    description: 'A gigante que você respeita! 1 Litro de açaí artesanal super cremoso montado em barca especial com até 10 adicionais à sua escolha.',
    price: 42.00,
    originalPrice: 55.00,
    image: barcaPromoImg,
    buttonText: 'Pedir Barca'
  }
];

export const TOPPINGS_SHOWCASE: ToppingOption[] = [
  {
    id: 'leite-condensado',
    name: 'Leite Condensado',
    category: 'calda',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'leite-po',
    name: 'Leite em Pó (Ninho)',
    category: 'creme',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'nutella',
    name: 'Nutella Original',
    category: 'creme',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'mousse-morango',
    name: 'Mousse de Morango',
    category: 'creme',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'mousse-maracuja',
    name: 'Mousse de Maracujá',
    category: 'creme',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'calda-chocolate',
    name: 'Calda de Chocolate',
    category: 'calda',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'morango-fresco',
    name: 'Morango Fresco',
    category: 'fruta',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'banana-fresca',
    name: 'Banana Prata',
    category: 'fruta',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'pacoca',
    name: 'Paçoca Rolha',
    category: 'crocante',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'granola-artesanal',
    name: 'Granola Crocante',
    category: 'crocante',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'kiwi-fresco',
    name: 'Kiwi Fatiado',
    category: 'fruta',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'gotas-chocolate',
    name: 'Gotas de Chocolate',
    category: 'crocante',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&auto=format&fit=crop&q=80'
  }
];

export const SIZES_OPTIONS = [
  { id: 'size-300', name: 'Copo Pequeno', ml: '300ml', price: 16.00, maxFreeToppings: 3, desc: 'Ideal para um momento refrescante e rápido.' },
  { id: 'size-500', name: 'Copo Médio', ml: '500ml', price: 22.00, maxFreeToppings: 4, desc: 'O tamanho clássico mais pedido da casa!', popular: true },
  { id: 'size-700', name: 'Copo Grande', ml: '700ml', price: 28.00, maxFreeToppings: 5, desc: 'Para quem ama açaí de verdade sem moderação.' },
  { id: 'size-1000', name: 'Barca Especial', ml: '1 Litro', price: 42.00, maxFreeToppings: 8, desc: 'Perfeita para compartilhar a dois ou com amigos!' }
];

export const BASE_OPTIONS = [
  { id: 'base-tradicional', name: 'Açaí Tradicional Especial', desc: '100% polpa amazônica, cremoso e adoçado com xarope de guaraná leve' },
  { id: 'base-zero', name: 'Açaí Zero Adição de Açúcar', desc: 'Puro açaí natural, zero calorias extras, perfeito para fitness' },
  { id: 'base-trufado', name: 'Açaí Trufado com Chocolate', desc: 'Batido com cacau 70% para uma textura aveludada' },
  { id: 'base-cupuacu', name: 'Meio a Meio (Açaí + Cupuaçu)', desc: 'Metade açaí tradicional cremoso, metade creme de cupuaçu do norte' }
];

export const REVIEWS_DATA = [
  {
    name: 'Camila Rodrigues',
    city: 'Bairro Centro',
    rating: 5,
    date: 'Ontem',
    text: 'Simplesmente o melhor açaí da vida! Não tem aqueles cristais chatos de gelo, é super denso e as frutas chegam frescas de verdade. O combo Amor é divino!'
  },
  {
    name: 'Matheus Henrique',
    city: 'Jardins',
    rating: 5,
    date: 'Há 2 dias',
    text: 'Pedimos a barca de 1L no sábado e chegou voando, em menos de 30 minutos numa embalagem térmica perfeita. Os adicionais vieram bem separados e fartos!'
  },
  {
    name: 'Larissa Albuquerque',
    city: 'Vila Nova',
    rating: 5,
    date: 'Há 4 dias',
    text: 'Atendimento impecável e o sistema de montar o açaí pelo site é muito prático! Já virei cliente fiel de toda semana.'
  }
];
