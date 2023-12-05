"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useNav } from "@/hooks/useNav";
import { toast } from "react-hot-toast";
import ListChip from "@/app/dashboard/_components/list-chip";
import { Id } from "@/convex/_generated/dataModel";
import CompleteItem from "@/app/dashboard/_components/complete-item";
import { Pencil } from "lucide-react";

const ListShopping = () => {
  const shoppingList = useQuery(api.shoppingLists.active);
  const create = useMutation(api.shoppingLists.create);
  const saveList = useMutation(api.shoppingLists.save);
  const clearList = useMutation(api.shoppingLists.clear);
  const updateList = useMutation(api.shoppingLists.update);
  const cancel = useMutation(api.shoppingLists.cancel);
  const complete = useMutation(api.shoppingLists.complete);

  const remove = useMutation(api.listItems.remove);
  const increment = useMutation(api.listItems.increment);
  const decrement = useMutation(api.listItems.decrement);
  const update = useMutation(api.listItems.update);
  const purchase = useMutation(api.listItems.purchase);

  const { onSetActive } = useNav();
  const [activeItemId, setActiveItemId] = useState("0");
  const [input, setInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  if (shoppingList === undefined) return <div>Loading...</div>;

  const createList = async () => {
    try {
      await create();
    } catch (e) {
      toast.error("Failed to create");
    }
  };

  if (shoppingList === null) {
    createList();
    return <div>Loading......</div>;
  }

  const incrementItem = async (listItemId: Id<"listItems">) => {
    try {
      await increment({ id: listItemId });
    } catch (e) {
      toast.error("Failed to increment item");
    }
  };
  const decrementItem = async (listItemId: Id<"listItems">) => {
    try {
      await decrement({ id: listItemId });
    } catch (e) {
      toast.error("Failed to decrement item");
    }
  };
  const removeItem = async (listItemId: Id<"listItems">) => {
    try {
      await remove({ id: listItemId });
    } catch (e) {
      toast.error("Failed to remove item");
    }
  };
  const updateItem = async (listItemId: Id<"listItems">, quantity: number) => {
    try {
      await update({ id: listItemId, quantity });
    } catch (e) {
      toast.error("Failed to update item");
    }
  };
  const purchaseItem = async (listItemId: Id<"listItems">) => {
    try {
      await purchase({ id: listItemId });
    } catch (e) {
      toast.error("Failed to complete item");
    }
  };
  const updateListName = async (id: Id<"shoppingLists">, name: string) => {
    try {
      await updateList({ id, name });
      setIsEdit(false);
    } catch (e) {
      toast.error("Failed to update list name");
    }
  };
  const saveShopList = async (id: Id<"shoppingLists">) => {
    try {
      await saveList({ id });
    } catch (e) {
      toast.error("Failed to update save list");
    }
  };

  const clearShopList = async (id: Id<"shoppingLists">) => {
    try {
      await clearList();
    } catch (e) {
      console.log({ e });
      toast.error("Failed to clear");
    }
  };

  const cancelShopList = async (id: Id<"shoppingLists">) => {
    try {
      await cancel({ id });
    } catch (e) {
      toast.error("Failed to clear");
    }
  };

  const completeShopList = async (id: Id<"shoppingLists">) => {
    try {
      await complete({ id });
    } catch (e) {
      toast.error("Failed to clear");
    }
  };

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
      {isEdit ? (
        <div className={"my-3 flex items-center justify-between gap-x-4"}>
          <Input
            placeholder={"List name"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={
              "h-full flex-1 py-3 outline-0 ring-0 focus:border-primary-orange focus-visible:ring-0 focus-visible:ring-offset-0"
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                input !== "" && updateListName(shoppingList._id, input);
              }
            }}
          />
          <Button
            className={
              "rounded-l bg-primary-orange py-[22px] text-sm font-bold text-white"
            }
            onClick={() => updateListName(shoppingList._id, input)}
            disabled={input === "" || shoppingList.name === input}
          >
            Save
          </Button>
        </div>
      ) : (
        <div className={"my-3 flex items-center justify-between"}>
          <h3 className={"mt-3 text-xl font-bold"}>{shoppingList.name}</h3>
          <Pencil
            size={18}
            className={"cursor-pointer"}
            onClick={() => setIsEdit(true)}
          />
        </div>
      )}
      <ScrollArea className={"h-[71vh]"}>
        {shoppingList.listItems.length === 0 ? (
          <EmptyList />
        ) : (
          !shoppingList.isCompleting && (
            <div className={"mb-20 space-y-4 pr-4"}>
              {shoppingList.listItems.map((listItem) => (
                <ListChip
                  key={listItem._id}
                  id={listItem._id}
                  name={listItem.item.name}
                  quantity={listItem.quantity}
                  isActive={activeItemId === listItem._id}
                  onSetIsActive={setActiveItemId}
                  incrementItem={incrementItem}
                  decrementItem={decrementItem}
                  removeItem={removeItem}
                  updateItem={updateItem}
                />
              ))}
            </div>
          )
        )}
        {shoppingList.isCompleting && (
          <div className={"mb-20 space-y-4 pr-4"}>
            {shoppingList.listItems.map((listItem) =>
              CompleteItem({
                id: listItem._id,
                name: listItem.item.name,
                quantity: listItem.quantity,
                isPurchased: listItem.isCompleted,
                onPurchaseItem: async (listItemId) =>
                  await purchaseItem(listItemId),
              }),
            )}
          </div>
        )}
      </ScrollArea>

      <div
        className={"fixed bottom-0 right-0 flex w-[400px] gap-x-4 bg-white p-4"}
      >
        {shoppingList.isCompleting ? (
          <div className={"flex gap-x-4"}>
            <Button
              className={
                "rounded-xl bg-neutral-900 px-3 py-2 text-sm font-bold text-white"
              }
              onClick={() => cancelShopList(shoppingList._id)}
            >
              Cancel
            </Button>
            <Button
              className={
                "rounded-xl bg-primary-orange px-3 py-2 text-sm font-bold text-white"
              }
              onClick={() => completeShopList(shoppingList._id)}
            >
              Complete
            </Button>
          </div>
        ) : (
          <>
            <Button
              className={
                "rounded-xl bg-neutral-900 px-3 py-2 text-sm font-bold text-white"
              }
              onClick={() => clearShopList(shoppingList._id)}
              disabled={shoppingList.listItems.length < 1}
            >
              Clear
            </Button>
            <Button
              className={
                "rounded-xl bg-primary-orange px-3 py-2 text-sm font-bold text-white"
              }
              onClick={() => saveShopList(shoppingList._id)}
              disabled={shoppingList.listItems.length < 1}
            >
              Save list
            </Button>
          </>
        )}
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
