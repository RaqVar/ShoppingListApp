'use client'
import { useEffect, useReducer, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  isReady: boolean;
}

interface ProductProps {
  product?: Product;
  onSubmit: (product: Product) => void;
}

const Card = ({ product, onSubmit }: ProductProps) => {

  const [productData, setProductData] = useState<Product>({
    id: product?.id || undefined,
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    isReady: product?.isReady || false,
  });

  useEffect(() => {
    if (product) {
      setProductData({
        id: product.id || undefined,
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        isReady: product.isReady || false,
        quantity: product.quantity || 0,
      });
    }
  }, [product]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(productData);
  }

  return (
    <div className="max-w-md mx-auto p-6 pr-15 pl-15 bg-[#0a0214] text-white rounded-2xl shadow-lg border border-gray-500">
      <div className="flex justify-center">
        <Image
          src={product? "/Edit.png": "/Create.png"}
          alt="Edit Product"
          width={100}
          height={100}
        />
      </div>

      <h1 className="text-xl font-bold text-center uppercase tracking-wide mt-2">
        {product ? "Edit Product" : "Create Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            value={productData.name}
            onChange={(event) =>
              setProductData({ ...productData, name: event.target.value })
            }
            placeholder="Enter product name"
            className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            value={productData.description}
            onChange={(event) =>
              setProductData({ ...productData, description: event.target.value })
            }
            placeholder="Enter description"
            className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Price</label>
          <input
            type="number"
            step="0.01"
            value={productData.price}
            onChange={(event) =>
              setProductData({ ...productData, price: Number(event.target.value) })
            }
            placeholder="Enter price"
            min={0}
            className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Quantity</label>
          <input
            type="number"
            value={productData.quantity}
            onChange={(event) => setProductData({ ...productData, quantity: Number(event.target.value) })}
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
