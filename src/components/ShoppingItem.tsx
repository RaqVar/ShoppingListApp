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
    <div className={`flex items-center justify-between p-4 border rounded-lg mb-2 ${item.completed ? 'bg-gray-100 line-through' : ''}`}>
      <div className="flex items-center space-x-4 flex-grow">
        <input 
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggleComplete(item.id)}
          className="form-checkbox h-5 w-5"
        />
        <div className="flex-grow">
          <p className={`font-medium ${item.completed ? 'text-gray-500' : ''}`}>
            {item.name}
          </p>
          <p className="text-sm text-gray-500">
            {item.description}
          </p>
          <div className="flex justify-between text-sm">
            <span>Quantity: {item.quantity}</span>
            <span>Price: ${item.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => onEditView(item.id)}
          className="text-blue-500 hover:bg-blue-100 p-2 rounded"
        >
          <img src="/images/Create.png" alt="Create Icon" width={25} height={25}/>
        </button>
        <button 
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:bg-red-100 p-2 rounded"
        >
          <img src="/images/Remove.png" alt="Remove Icon" width={25} height={25}/>
        </button>
      </div>
    </div>
  );
};