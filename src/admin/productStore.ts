import React from'react';import{ProductItem}from'../types';import{COMBOS_DATA,PROMOTIONS_DATA}from'../data/products';
export type AdminProduct=ProductItem&{stock?:number;active?:boolean};
export const ADMIN_PRODUCTS_KEY='acaiteria_admin_products';
export const DEFAULT_ADMIN_PRODUCTS:AdminProduct[]=[];
export function getAdminProducts():AdminProduct[]{try{const raw=localStorage.getItem(ADMIN_PRODUCTS_KEY);if(raw)return JSON.parse(raw)}catch{}return DEFAULT_ADMIN_PRODUCTS}
export function saveAdminProducts(items:AdminProduct[]){localStorage.setItem(ADMIN_PRODUCTS_KEY,JSON.stringify(items));window.dispatchEvent(new Event('admin-products-changed'))}
export function useAdminProducts(){const[items,setItems]=React.useState<AdminProduct[]>(getAdminProducts);React.useEffect(()=>{const sync=()=>setItems(getAdminProducts());window.addEventListener('storage',sync);window.addEventListener('admin-products-changed',sync);return()=>{window.removeEventListener('storage',sync);window.removeEventListener('admin-products-changed',sync)}},[]);return items}