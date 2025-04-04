import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../data-store";

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const { completed } = await request.json();

    const itemIndex = db.items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    db.items[itemIndex] = {
      ...db.items[itemIndex],
      completed,
      updatedAt: new Date()
    };

    return NextResponse.json(db.items[itemIndex]);
  } catch (error) {
    console.error("Error PATCH:", error);
    return NextResponse.json({ error: "Error toggling item completion" }, { status: 400 });
  }
}
