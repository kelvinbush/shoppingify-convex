"use client";

import React from "react";
import { Plus } from "lucide-react";

function ItemChip({ name, id }: { name: string; id: string }) {
  return (
    <div
      onClick={() => console.log("clicked:", name, "with id:", id)}
      className={
        "flex cursor-pointer items-start justify-between gap-y-2 rounded-lg bg-white p-3 text-sm font-medium text-black shadow transition-shadow hover:shadow-md"
      }
    >
      <p>{name}</p>
      <Plus color={"#C1C1C4"} size={24} className={"basis-[24px] self-start"} />
    </div>
  );
}

export default ItemChip;
