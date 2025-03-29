'use client'

import { useReducer, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ShoppingListState, ShoppingItem } from '@/types/ShoppingListTypes'
import { shoppingListReducer, initialState } from '@/reducers/shoppingListReducer'

export function useShoppingList() {
    const [state, dispatch] = useReducer(shoppingListReducer, initialState);

    const addItem = useCallback((name: string, description: string, price: number = 0, quantity: number = 1) => {
        const newItem: ShoppingItem = {
            id: uuidv4(),
            name,
            description,
            price,
            quantity,
            completed: false,
            createdAt: new Date(),
        };

        dispatch({ type: 'ADD_ITEM', payload: newItem });
    }, []);

    const editItem = useCallback((item: Partial<ShoppingItem> & { id: string }) => {
        const updatedItem = {
            ...item,
            updatedAt: new Date()
        };
        dispatch({ type: 'EDIT_ITEM', payload: updatedItem as ShoppingItem })
    }, []);

    const removeItem = useCallback((id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    }, [])

    const toggleItemComplete = useCallback((id: string) => {
        dispatch({ type: 'TOGGLE_ITEM_COMPLETE', payload: id })
    }, [])

    const loadItems = useCallback((items: ShoppingItem[]) => {
        dispatch({ type: 'LOAD_ITEMS', payload: items });
    }, [])

    return {
        state,
        addItem,
        editItem,
        removeItem,
        toggleItemComplete,
        loadItems
    };
}
