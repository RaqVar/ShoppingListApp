import { NextRequest, NextResponse } from "next/server";
import { db } from "../../data-store";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const item = db.items.find(item => item.id === id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error GET item:', error);
    return NextResponse.json({ error: "Error fetching item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const updatedData = await request.json();

    const itemIndex = db.items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    db.items[itemIndex] = {
      ...db.items[itemIndex],
      ...updatedData,
      updatedAt: new Date()
    };

    return NextResponse.json(db.items[itemIndex]);
  } catch (error) {
    console.error('Error PUT:', error);
    return NextResponse.json({ error: "Error updating item" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const itemIndex = db.items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    db.items = db.items.filter(item => item.id !== id);

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error('Error DELETE:', error);
    return NextResponse.json({ error: "Error deleting item" }, { status: 500 });
  }
}
