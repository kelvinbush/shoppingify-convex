"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useNav } from "@/hooks/useNav";

const ItemChip = ({ name, id }: { name: string; id: string }) => {
  const { onSetActive, active } = useNav();
  const addItem = (id: string, name: string) => {
    console.log("add item", id, name);
  };
  return (
    <div
      onClick={() => onSetActive("view-item", id)}
      className={
        "flex cursor-pointer items-start justify-between gap-y-2 rounded-lg bg-white p-3 text-sm font-medium text-black shadow transition-shadow hover:shadow-md"
      }
    >
      <p>{name}</p>
      <Plus
        color={"#C1C1C4"}
        size={24}
        className={"basis-[24px] cursor-pointer self-start"}
        onClick={(e) => {
          addItem(id, name);
          active !== "list" && onSetActive("list");
          e.stopPropagation();
        }}
      />
    </div>
  );
};

export default ItemChip;
