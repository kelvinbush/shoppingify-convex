import React from "react";
import { auth } from "@clerk/nextjs";

async function Page() {
  const { userId, getToken } = auth();

  const token = await getToken();
  return (
    <div>
      <h1>Dashboard: {token}</h1>
    </div>
  );
}

export default Page;
