"use client";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CalendarDays, MoveLeft } from "lucide-react";
import Link from "next/link";

const Page = ({ params }: { params: { listId: string } }) => {
  const shoppingListId = params.listId as Id<"shoppingLists">;
  const shoppingList = useQuery(api.listItems.getItems, { shoppingListId });

  if (shoppingList === undefined) return <div>Loading...</div>;

  const categories = shoppingList.listItems.map(
    (item) => item.item.categoryName,
  );
  const uniqueCategories = Array.from(new Set(categories));

  return (
    <div className={"p-4"}>
      <Link
        href={"/dashboard/history"}
        className={
          "mb-4 flex cursor-pointer items-center gap-x-2 text-sm font-semibold text-primary-orange hover:text-amber-900"
        }
      >
        <MoveLeft />
        Back
      </Link>
      <h1 className={"mb-2 text-xl font-bold"}>{shoppingList.name}</h1>
      <div className={"flex items-center gap-x-1.5"}>
        <CalendarDays color={"#C1C1C4"} size={16} />
        <span className={"text-xs font-semibold text-[#C1C1C4]"}>
          {new Date(shoppingList._creationTime).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </span>
      </div>
      <div className={"mt-4"}>
        {uniqueCategories.map((category) => (
          <>
            <h4 className={"mb-1 text-lg font-medium text-black"}>
              {category}
            </h4>
            <div
              className={
                "mb-4 grid auto-rows-auto grid-cols-2 items-start gap-4 md:grid-cols-3 lg:grid-cols-4"
              }
            >
              {shoppingList.listItems
                .filter((item) => item.item.categoryName === category)
                .map((item) => (
                  <ListItemCard
                    key={item.item._id}
                    name={item.item.name}
                    quantity={item.quantity}
                  />
                ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Page;

interface ListItemCardProps {
  name: string;
  quantity: number;
}

const ListItemCard = ({ name, quantity }: ListItemCardProps) => (
  <div
    className={
      "flex cursor-pointer items-start justify-between gap-y-2 rounded-lg bg-white p-3 font-medium text-black shadow transition-shadow hover:shadow-md"
    }
  >
    <p>{name}</p>
    <p className={"text-xs font-semibold text-primary-orange"}>{quantity}</p>
  </div>
);
