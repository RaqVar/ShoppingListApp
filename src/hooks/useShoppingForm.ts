import { useRef, useEffect } from "react";
import { useShoppingList } from "../hooks/useShoppingList";
import { ShoppingItem } from "@/types/ShoppingListTypes";

export function useShoppingForm({ product }: { product?: ShoppingItem }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { addItem, editItem } = useShoppingList();

  useEffect(() => {
    if (product?.id && formRef.current) {
      const form = formRef.current;
      (form.elements.namedItem("name") as HTMLInputElement)!.value = product.name;
      (form.elements.namedItem("description") as HTMLInputElement)!.value = product.description;
      (form.elements.namedItem("price") as HTMLInputElement)!.value = String(product.price);
      (form.elements.namedItem("quantity") as HTMLInputElement)!.value = String(product.quantity);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
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

    formRef.current.reset();
  };

  return { formRef, handleSubmit };
}
