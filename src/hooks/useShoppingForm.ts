import { useRef, useEffect } from "react";
import { useShoppingList } from "../hooks/useShoppingList";
import { ShoppingItem } from "@/types/ShoppingListTypes";

export function useShoppingForm({ product }: { product?: ShoppingItem }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { addItem, editItem } = useShoppingList();

  useEffect(() => {
    if (product?.id && formRef.current) {
      const nameInput = formRef.current.elements.namedItem('name') as HTMLInputElement;
      const descriptionInput = formRef.current.elements.namedItem('description') as HTMLTextAreaElement;
      const priceInput = formRef.current.elements.namedItem('price') as HTMLInputElement;
      const quantityInput = formRef.current.elements.namedItem('quantity') as HTMLInputElement;

      if (nameInput && descriptionInput && priceInput && quantityInput) {
        nameInput.value = product.name;
        descriptionInput.value = product.description;
        priceInput.value = String(product.price);
        quantityInput.value = String(product.quantity);
      }
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string);

    if (!name.trim()) return;

    if (product?.id) {
      editItem({ id: product.id, name, description, price, quantity });
      console.log("Product updated:", { id: product.id, name, description, price, quantity });
    } else {
      addItem(name, description, price, quantity);
      console.log("Item added:", { name, description, price, quantity });
    }

    formRef.current?.reset();
  };

  return { formRef, handleSubmit };
}
