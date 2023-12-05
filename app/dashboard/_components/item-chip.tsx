"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useNav } from "@/hooks/useNav";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "react-hot-toast";

const ItemChip = ({
  name,
  id,
  listId,
}: {
  name: string;
  id: Id<"items">;
  listId: Id<"shoppingLists">;
}) => {
  const create = useMutation(api.listItems.create);
  const { onSetActive, active } = useNav();
  const addToList = async () => {
    try {
      await create({ shoppingListId: listId, itemId: id, quantity: 1 });
    } catch (e) {
      toast.error("Failed to increment item");
    }
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
        className={
          "basis-[24px] cursor-pointer self-start rounded-full hover:bg-primary-orange hover:fill-white"
        }
        onClick={(e) => {
          e.stopPropagation();
          addToList();
          active !== "list" && onSetActive("list");
        }}
      />
    </div>
  );
};

export default ItemChip;
