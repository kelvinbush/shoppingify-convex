"use client";
import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import ShopCard from "@/app/dashboard/_components/shop-card";

function Page() {
  const shoppingLists = useQuery(api.shoppingLists.get);

  if (shoppingLists === undefined) return <div>Loading...</div>;

  const formattedShoppingLists = groupByMonthYear(shoppingLists);

  return (
    <div className={"p-4"}>
      <h1 className={"mb-4 text-xl font-bold"}>Shopping History</h1>
      {Object.keys(formattedShoppingLists).map((monthYear) => (
        <div key={monthYear} className={"mb-10 space-y-4"}>
          <p className={"text-sm font-semibold"}>{monthYear}</p>
          {formattedShoppingLists[monthYear].map(({ date, object }) => (
            <ShopCard
              key={object._id}
              date={date}
              id={object._id}
              listName={object.name}
              state={object.completed ? "completed" : "cancelled"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Page;

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  // @ts-ignore
  return date.toLocaleDateString("en-GB", options);
};

const groupByMonthYear = (
  shoppingLists: ShoppingList[],
): Record<string, { date: string; object: ShoppingList }[]> => {
  const grouped: Record<string, { date: string; object: ShoppingList }[]> = {};
  shoppingLists.forEach((obj) => {
    const date = new Date(obj._creationTime);
    const monthYear = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
    const formattedDate = formatDate(obj._creationTime);

    if (!grouped[monthYear]) {
      grouped[monthYear] = [{ date: formattedDate, object: obj }];
    } else {
      grouped[monthYear].push({ date: formattedDate, object: obj });
    }
  });
  return grouped;
};

interface ShoppingList {
  _id: Id<"shoppingLists">;
  _creationTime: number;
  name: string;
  userId: string;
  isActive: boolean;
  cancelled: boolean;
  completed: boolean;
  isCompleting: boolean;
}
