"use client";
import React from "react";
import { useNav } from "@/hooks/useNav";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "react-hot-toast";
import SecondaryBtn from "../../_components/SecondaryBtn";
import PrimaryButton from "../../_components/PrimaryButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoveLeft } from "lucide-react";

const ViewItem = () => {
  const { itemId, onSetActive } = useNav();

  if (!itemId)
    return (
      <div>
        <button onClick={() => onSetActive("list")}>Back</button>
        <div>Item not found</div>
      </div>
    );

  return <ViewItemContent itemId={itemId} />;
};

export default ViewItem;

const ViewItemContent = ({ itemId }: { itemId: Id<"items"> }) => {
  const item = useQuery(api.items.get, { id: itemId });
  const archiveItem = useMutation(api.items.archive);
  const addToList = useMutation(api.listItems.addItem);
  const { onSetActive } = useNav();

  if (item === undefined) return <div>Loading...</div>;

  const onAddToList = async () => {
    try {
      await addToList({ id: itemId });
      onSetActive("list");
    } catch (e) {
      toast.error("Failed to add item to list");
    }
  };

  const onArchive = async () => {
    try {
      await archiveItem({ id: itemId });
      onSetActive("list");
      toast.success("Item archived");
    } catch (e) {
      toast.error("Failed to archive item");
      console.log(e);
    }
  };

  return (
    <div className={"flex h-full flex-col gap-y-5 bg-white p-2 px-6"}>
      <div
        onClick={() => onSetActive("list")}
        className={
          "flex cursor-pointer items-center gap-x-2 text-sm font-semibold text-primary-orange hover:text-amber-900"
        }
      >
        <MoveLeft />
        Back
      </div>
      <img
        src={item.imageUrl ?? "/images/no-image.svg"}
        alt={item.name}
        className={"h-[250px] w-full rounded-2xl"}
        loading={"lazy"}
      />
      <div>
        <p className={"text-sm font-semibold text-[#C1C1C4]"}>name</p>
        <p className={"font-semibold"}>{item.name}</p>
      </div>
      <div>
        <p className={"text-sm font-semibold text-[#C1C1C4]"}>category</p>
        <p className={"font-semibold"}>{item.category.name}</p>
      </div>
      <div>
        <p className={"text-sm font-semibold text-[#C1C1C4]"}>note</p>
        <ScrollArea className={"h-[51vh]"}>
          <p className={"font-semibold"}>{item.note}</p>
        </ScrollArea>
      </div>
      <div
        className={"fixed bottom-0 right-0 flex w-[400px] gap-x-4 bg-white p-4"}
      >
        <SecondaryBtn
          onClick={onArchive}
          disabled={false}
          loading={false}
          title={"Delete"}
        />
        <PrimaryButton
          onClick={onAddToList}
          loading={false}
          disabled={false}
          title={"Add to List"}
        />
      </div>
    </div>
  );
};
