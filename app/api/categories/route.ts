import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
  const { getToken } = auth();
  const token = await getToken();
  if (!token) throw new Error("token is required");

  const res = await fetch("http://localhost:4000/api/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("failed to fetch data");

  const response = await res.json();

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const { getToken } = auth();
  const token = await getToken();
  if (!token) throw new Error("token is required");

  const body = await request.json();
  const { name } = body;

  if (!name) {
    console.log("[CATEGORIES/ROUTE/POST] error", name);
    return new NextResponse("Name is required", { status: 400 });
  }

  const res = await fetch("http://localhost:4000/api/categories", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("failed to fetch data");

  const response = await res.json();

  return NextResponse.json(response);
}
