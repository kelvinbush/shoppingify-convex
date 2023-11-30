"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ItemChip from "@/app/dashboard/_components/item-chip";

const Page = () => {
  const items = useQuery(api.items.list);

  if (items === undefined) return <div>Loading...</div>;

  const categoriesSet = new Set(items.map((item) => item.category.name) ?? []);
  const categories = Array.from(categoriesSet);
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
                    <ItemChip id={item._id} name={item.name} key={item._id} />
                  ))}
              </div>
            </>
          ),
      )}
    </div>
  );
};

export default Page;
