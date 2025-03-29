import React from 'react';
import { ShoppingItem } from '@/types/ShoppingListTypes';

interface ShopItemProps {
  item: ShoppingItem;
  onToggleComplete: (id: string) => void;
  onEditView: (id: string) => void;
  onRemove: (id: string) => void;
}

export const ShopItem = ({
  item,
  onToggleComplete,
  onEditView,
  onRemove
}: ShopItemProps) => {
  return (
    <div className={`flex flex-col items-start p-4 border rounded-lg mb-2 ${item.completed ? 'line-through' : ''}`}>
      <div className="flex w-full justify-between items-center mb-3">
        <p className={`text-lg font-semibold ${item.completed ? 'text-gray-500' : ''}`}>
          {item.name}
        </p>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggleComplete(item.id)}
          className="form-checkbox h-5 w-5"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">
        {item.description}
      </p>
      <div className="flex flex-col w-full mt-2 gap-2">
        <span>Quantity: {item.quantity}</span>
        <span>Price: ${item.price.toFixed(2)}</span>
      </div>
      <div className="flex w-full justify-end gap-2 mt-3">
        <button
          onClick={() => onEditView(item.id)}
          className="text-blue-500 hover:bg-blue-100 p-2 rounded"
        >
          <img src="/images/Edit.png" alt="Create Icon" width={25} height={25} />
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:bg-red-100 p-2 rounded"
        >
          <img src="/images/Remove.png" alt="Remove Icon" width={25} height={25} />
        </button>
      </div>
    </div>
  );
};