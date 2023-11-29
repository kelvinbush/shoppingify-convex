import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
  const { getToken } = auth();
  const token = await getToken();
  if (!token) throw new Error("token is required");

  const res = await fetch("http://localhost:4000/api/shopping-lists/active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return undefined;

  const response: {
    result: ShoppingList | null;
  } = await res.json();

  return NextResponse.json(response);
}
export async function POST(request: NextRequest) {
  const { getToken } = auth();
  const token = await getToken();
  if (!token) throw new Error("token is required");

  const body = await request.json();

  const res = await fetch("http://localhost:4000/api/shopping-lists", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) return undefined;

  const response: { message: string; id: string } = await res.json();

  return NextResponse.json(response);
}
export async function PATCH(request: NextRequest) {
  const { getToken } = auth();
  const token = await getToken();
  if (!token) throw new Error("token is required");

  const body = await request.json();
  const { listItemId } = body;

  const res = await fetch(
    `http://localhost:4000/api/list-items/purchase/${listItemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
    },
  );

  if (!res.ok) {
    const errorResponse = { error: "Failed to update item" };
    return NextResponse.json(errorResponse, { status: res.status });
  }

  const response = await res.json();

  return NextResponse.json(response);
}
