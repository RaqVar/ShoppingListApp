'use client'

import { useReducer, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ShoppingListState, ShoppingItem } from '@/types/ShoppingListTypes'
import { shoppingListReducer, initialState } from '@/reducers/shoppingListReducer'

const API_URL = '/api/items';

export function useShoppingList() {
    const [state, dispatch] = useReducer(shoppingListReducer, initialState);

    useEffect(() => {
        const fetchItems = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                dispatch({ type: 'LOAD_ITEMS', payload: data });
            } catch (error) {
                if (error instanceof Error) {
                    dispatch({ type: 'SET_ERROR', payload: error.message });
                } else {
                    dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
                }
            }
        };
        
        fetchItems();
    }, []);

    const addItem = useCallback(async (name: string, description: string, price: number = 0, quantity: number = 1) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const newItem = {
                id: uuidv4(),
                name,
                description,
                price,
                quantity,
                completed: false,
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            const createdItem = await response.json();
            dispatch({ type: 'ADD_ITEM', payload: createdItem });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
            }
        }
    }, []);

    const editItem = useCallback(async (item: Partial<ShoppingItem> & { id: string }) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch(`${API_URL}/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            const updatedItem = await response.json();
            dispatch({ type: 'EDIT_ITEM', payload: updatedItem });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
            }
        }
    }, []);

    const removeItem = useCallback(async (id: string) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            dispatch({ type: 'REMOVE_ITEM', payload: id });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
            }
        }
    }, []);

    const toggleItemComplete = useCallback(async (id: string) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const item = state.items.find(i => i.id === id);
            if (!item) return;

            const response = await fetch(`${API_URL}/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !item.completed }),
            });

            const updatedItem = await response.json();
            dispatch({ type: 'EDIT_ITEM', payload: updatedItem });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
            }
        }
    }, [state.items]);

    return {
        state,
        addItem,
        editItem,
        removeItem,
        toggleItemComplete,
    };
}