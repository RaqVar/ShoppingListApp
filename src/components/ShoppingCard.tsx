'use client'
import { useState } from "react";

interface Product {
    id?: number;
    name: string;
    price: number;
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
        price: product?.price || 0,
        isReady: product?.isReady || false,
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(productData);
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl font-bold text-center">
              {product ? "Modify Product" : "Create Product"}
            </h1>
      
            <div>
              <label className="block text-sm font-medium text-gray-300">Product Name</label>
              <input
                type="text"
                value={productData.name}
                onChange={(event) => setProductData({ ...productData, name: event.target.value })}
                placeholder="Enter product name"
                className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            <div>
              <label className="block text-sm font-medium text-gray-300">Price</label>
              <input
                type="number"
                value={productData.price}
                onChange={(event) => setProductData({ ...productData, price: Number(event.target.value) })}
                placeholder="Enter price"
                min={0}
                className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                checked={productData.isReady}
                onChange={(event) => setProductData({ ...productData, isReady: event.target.checked })}
                className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-300">Ready</label>
            </div>
      
            <div className="flex justify-between">
              <a href="/" className="text-red-400 hover:text-red-300 transition">Cancel</a>
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                {product ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      );
      
};

export default Card;
