import React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface CompleteChipProps {
  id: string;
  name: string;
  quantity: number;
  isPurchased: boolean;
  onPurchaseItem: (listItemId: string) => void;
}

const CompleteItem = ({
  id,
  name,
  quantity,
  isPurchased,
  onPurchaseItem,
}: CompleteChipProps) => {
  return (
    <div className={cn("flex items-center justify-between space-x-2")}>
      <div className={"flex space-x-1"}>
        <Checkbox
          checked={isPurchased}
          onCheckedChange={() => onPurchaseItem(id)}
        />
        <p
          className={cn(
            "text-sm font-semibold",
            isPurchased ? "line-through" : "",
          )}
        >
          {name}
        </p>
      </div>
      <CompleteChip quantity={quantity} />
    </div>
  );
};

export default CompleteItem;

const CompleteChip = ({ quantity }: { quantity: number }) => {
  return (
    <div
      className={cn(
        "rounded-3xl border-2 border-primary-orange px-4 py-1 text-xs font-semibold text-primary-orange",
      )}
    >
      {quantity} pcs
    </div>
  );
};
