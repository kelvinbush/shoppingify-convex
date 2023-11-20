import { auth } from "@clerk/nextjs";

export default async function getCategories(): Promise<Category[]> {
  const { getToken } = auth();
  const token = await getToken();
  if (!token) throw new Error("token is required");

  const res = await fetch("http://localhost:4000/api/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
