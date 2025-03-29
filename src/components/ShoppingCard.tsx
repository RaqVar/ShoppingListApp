'use client'
import { useReducer } from "react";
import { ShoppingItem } from "@/types/ShoppingListTypes";
import { useShoppingForm } from "@/hooks/useShoppingForm";
import { shoppingListReducer } from "@/reducers/shoppingListReducer";
import { ShoppingListState } from "@/types/ShoppingListTypes";
import Link from "next/link";
import Image from "next/image";

const initialState = { items: [] };

const Card = ({ product }: { product?: ShoppingItem }) => {

  const { formRef, handleSubmit } = useShoppingForm({ product });
  console.log("RENDER!!")
  return (
    <div className="max-w-md mx-auto p-6 pr-15 pl-15 bg-[#0a0214] text-white rounded-2xl shadow-lg border border-gray-500">
      <div className="flex justify-center">
        <Image
          src={product ? "/images/Edit.png" : "/images/Create.png"}
          alt="Edit Product"
          width={100}
          height={100}
        />
      </div>

      <h1 className="text-xl font-bold text-center uppercase tracking-wide mt-2">
        {product ? "Edit Product" : "Create Product"}
      </h1>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input
            name="name"
            type="text"
            defaultValue={product?.name}
            placeholder="Enter product name"
            className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            name="description"
            defaultValue={product?.description}
            placeholder="Enter description"
            className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={product?.price}
            placeholder="Enter price"
            min={0}
            className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Quantity</label>
          <input
            name="quantity"
            type="number"
            defaultValue={product?.quantity}
            placeholder="Enter quantity"
            min={0}
            className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex justify-between mt-4">
          <Link
            href="/"
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition ml-10"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition mr-10"
          >
            {product ? "Apply" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Card;
