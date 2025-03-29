'use client'

import React from 'react';
import { ShopItem } from './ShoppingItem';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useRouter } from 'next/navigation';

export const ShopList = () => {
  const { state, toggleItemComplete, removeItem } = useShoppingList();
  const router = useRouter();

  const handleCreateProduct = () => {
    router.push('/item-manager');
  };

  const handleEditItem = (id: string) => {
    router.push(`/item-manager/${id}`);
  };

  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col mx-auto px-75 py-10 bg-[#0a0214]">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center">
          <img src="/images/Create.png" alt="Shopping List Logo" width={75} height={75}/>
          <h1 className="text-2xl font-bold ml-2">Shopping List</h1>
        </div>
        <button 
          onClick={handleCreateProduct}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Product
        </button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.items.map(item => (
          <ShopItem 
            key={item.id}
            item={item}
            onToggleComplete={toggleItemComplete}
            onEditView={handleEditItem}
            onRemove={removeItem}
          />
        ))}
      </div>

      {state.items.length > 0 && (
        <div className="mt-10 p-3 rounded-lg text-right">
          <p className="text-lg font-bold">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>
      )}

      {state.items.length === 0 && (
        <p className="text-center text-gray-500 mt-30">
          Your shopping list is empty. Create a product!
        </p>
      )}
    </div>
  );
};