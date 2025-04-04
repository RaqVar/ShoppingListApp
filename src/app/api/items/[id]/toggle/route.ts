import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../data-store";

export async function PATCH(req: NextRequest) {
  const id = req.url.split("/").slice(-2)[0]; 
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const { completed } = await req.json();

  const itemIndex = db.items.findIndex((item) => item.id === id);
  if (itemIndex === -1)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  db.items[itemIndex] = {
    ...db.items[itemIndex],
    completed,
    updatedAt: new Date()
  };

  return NextResponse.json(db.items[itemIndex]);
}
