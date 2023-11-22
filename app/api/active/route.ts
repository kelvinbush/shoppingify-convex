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

  const response: ShoppingList | { message: string } = await res.json();

  return NextResponse.json(response);
}
