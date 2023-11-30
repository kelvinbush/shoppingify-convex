"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNav } from "@/hooks/useNav";
import { Input } from "@/components/ui/input";

const ListShopping = () => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { onSetActive } = useNav();
  let name = "Shopping list";
  let totalItems = 0;

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
            onClick={() => onSetActive("add-item")}
          >
            Add item
          </Button>
        </div>
      </div>
      <h3 className={"mt-3 text-xl font-bold"}>{name}</h3>
      <ScrollArea className={"h-[71vh]"}>
        {!loading && !isCompleting && totalItems === 0 && <EmptyList />}
        {!loading && !isCompleting && totalItems > 0 && (
          <div className={"mb-20 space-y-4 pr-4"}>
            {/* {items.map((item) => (
              <ListChip
                key={item.itemId}
                id={item.itemId}
                name={item.name}
                quantity={item.quantity}
                isActive={activeItemId === item.itemId}
                onSetIsActive={setActiveItem}
                incrementItem={incrementItem}
                decrementItem={decrementItem}
                removeItem={removeItem}
                updateItem={updateItem}
                isCompleting={isCompleting}
              />
            ))}*/}
          </div>
        )}
        {loading && <p className={"text-center text-sm"}>Loading...</p>}
        {!loading && isCompleting && (
          <div className={"mb-20 space-y-4 pr-4"}>
            {/*{activeData?.listItems.map((item) =>
              CompleteItem({
                id: item.id,
                name: item.item.name,
                quantity: item.quantity,
                isPurchased: item.isPurchased,
                onPurchaseItem: async (listItemId) =>
                  await asyncUpdate(listItemId),
              }),
            )}*/}
          </div>
        )}
      </ScrollArea>
      <div
        className={"fixed bottom-0 right-0 flex w-[400px] gap-x-2 bg-white p-4"}
      >
        <Input
          placeholder={"List name"}
          value={"name"}
          onChange={(e) => console.log("change")}
          className={"flex-1"}
        />
        <Button
          className={
            "rounded-xl bg-primary-orange px-3 py-2 text-sm font-bold text-white"
          }
          onClick={() => console.log("save")}
          disabled={loading}
        >
          Save list
        </Button>
      </div>
    </div>
  );
};

export default ListShopping;

const EmptyList = () => {
  return (
    <div className={"flex h-[71vh] flex-col items-center"}>
      <p className={"mb-2 mt-auto text-xl font-bold"}>No items</p>
      <Image
        src={"/images/empty.svg"}
        alt={"empty"}
        height={250}
        width={250}
        className={"mt-auto"}
      />
    </div>
  );
};
