"use client";
import Image from "next/image";
import Card from "../components/ShoppingCard";

export default function Home() {
  
  const handleCreate = (data: any) => {
    console.log(" Product Created:", data);
  };

  const handleUpdate = (data: any) => {
    console.log(" Product Updated:", data);
  }

  return (
    <div className="">
      <Card onSubmit={handleCreate} />
    </div>
  );
}
