import { NextRequest, NextResponse } from "next/server";
import { db } from "../../data-store";

export async function GET(req: NextRequest) {
  const id = req.url.split("/").pop(); 
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const item = db.items.find((item) => item.id === id);
  if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(req: NextRequest) {
  const id = req.url.split("/").pop();
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const updatedData = await req.json();
  const itemIndex = db.items.findIndex((item) => item.id === id);

  if (itemIndex === -1)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  db.items[itemIndex] = {
    ...db.items[itemIndex],
    ...updatedData,
    updatedAt: new Date()
  };

  return NextResponse.json(db.items[itemIndex]);
}

export async function DELETE(req: NextRequest) {
  const id = req.url.split("/").pop();
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const itemIndex = db.items.findIndex((item) => item.id === id);
  if (itemIndex === -1)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  db.items = db.items.filter((item) => item.id !== id);

  return NextResponse.json({ message: "Item deleted successfully" });
}
