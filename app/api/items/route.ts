import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(request: NextRequest) {
  const { getToken } = auth();
  const token = await getToken();
  if (!token) throw new Error("token is required");

  const body = await request.json();

  const { name, note, category: categoryId, imageUrl } = body;

  const res = await fetch("http://localhost:4000/api/items", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, note, categoryId, imageUrl }),
  });

  if (!res.ok) throw new Error("failed to fetch data");

  const response = await res.json();

  return NextResponse.json(response);
}
