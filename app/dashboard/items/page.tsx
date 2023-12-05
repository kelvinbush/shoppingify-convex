"use client";
import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ItemChip from "@/app/dashboard/_components/item-chip";
import { toast } from "react-hot-toast";

const Page = () => {
  const items = useQuery(api.items.list);
  const shoppingList = useQuery(api.shoppingLists.active);
  const create = useMutation(api.shoppingLists.create);

  if (items === undefined) return <div>Loading...</div>;
  if (shoppingList === undefined) return <div>Loading...</div>;

  const createList = async () => {
    try {
      await create();
    } catch (e) {
      toast.error("Failed to create");
    }
  };

  const categoriesSet = new Set(items.map((item) => item.category.name) ?? []);
  const categories = Array.from(categoriesSet);

  if (shoppingList === null) {
    createList();
    return <div>Loading......</div>;
  }

  return (
    <div className={"p-2"}>
      {categories.map(
        (category) =>
          category && (
            <>
              <h4 className={"text-lg font-medium text-black"}>{category}</h4>
              <div
                className={
                  "mt-4 grid auto-rows-auto grid-cols-2 items-start gap-4 md:grid-cols-3 lg:grid-cols-4"
                }
              >
                {items
                  .filter((item) => item.category?.name === category)
                  .map((item) => (
                    <ItemChip
                      id={item._id}
                      name={item.name}
                      key={item._id}
                      listId={shoppingList._id}
                    />
                  ))}
              </div>
            </>
          ),
      )}
    </div>
  );
};

export default Page;
