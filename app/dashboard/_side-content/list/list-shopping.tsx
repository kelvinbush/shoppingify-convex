"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ListChip from "@/app/dashboard/_components/list-chip";
import { ScrollArea } from "@/components/ui/scroll-area";

const sampleItems = [
  {
    id: "1",
    name: "Milk",
    quantity: 1,
  },
  {
    id: "2",
    name: "Bread",
    quantity: 1,
  },
  {
    id: "3",
    name: "Eggs",
    quantity: 1,
  }, // generate 20 more items
  ...Array.from({ length: 20 }, (_, index) => ({
    id: `${index + 4}`,
    name: `Item ${index + 4}`,
    quantity: 1,
  })),
];

const ListShopping = () => {
  const [isEditing, setIsEditing] = useState("0");

  return (
    <div className={"h-full bg-[#FFF0DE] px-4 py-6"}>
      <div
        className={"relative mb-2 space-x-6 rounded-3xl bg-[#80485B] px-2 py-4"}
      >
        <Image
          height={150}
          width={48}
          alt={"source"}
          src={"/images/source.svg"}
          className={
            "absolute left-[8px] top-[-24px] h-[145px] w-[auto] rotate-[-5deg]"
          }
        />
        <div className={"relative space-y-3 pl-[85px]"}>
          <p className={"font-bold text-white"}>
            Didn&apos;t find what you <br /> need?
          </p>
          <Button
            className={
              "rounded-xl bg-white px-8 text-sm font-bold text-[#34333A] hover:bg-[#F2F2F2]"
            }
          >
            Add item
          </Button>
        </div>
      </div>
      <div className={"mt-3 flex items-center justify-between"}>
        <h3 className={"text-xl font-bold"}>Shopping list</h3>
        <Pencil size={"20px"} className={"shrink-0 cursor-pointer"} />
      </div>
      <ScrollArea className={"h-[71vh]"}>
        <div className={"mb-20 space-y-4 pr-4"}>
          {sampleItems.map((item) => (
            <ListChip
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              isEditing={item.id === isEditing}
              onSetIsEditing={setIsEditing}
            />
          ))}
        </div>
      </ScrollArea>
      <div className={"fixed bottom-0 right-0 w-[400px] bg-white p-4"}>
        <Button
          className={
            "rounded-xl bg-[#F9A10A] px-8 text-sm font-bold text-white"
          }
        >
          Send to shopper
        </Button>
      </div>
    </div>
  );
};

export default ListShopping;
